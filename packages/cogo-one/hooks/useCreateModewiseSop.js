import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const sopFormatter = ({ sopInstructions = [] }) => sopInstructions?.map(
	(eachInstruction) => (
		{
			category : eachInstruction?.category,
			remarks  : eachInstruction?.remarks,
			document : typeof eachInstruction?.document === 'string' ? eachInstruction?.document : undefined,
		}) || [],
);
const getOceanPayload = ({ formValues = {}, procedure_id = '', shipment_id = '', organization_id = '' }) => (
	{
		instruction            : 'additional_preference',
		sop_instructions       : sopFormatter({ sopInstructions: formValues?.additional }) || [],
		operating_procedure_id : procedure_id,
		shipment_id,
		organization_id,
	});

const urlFormatter = (
	{ urls },
) => urls?.map((eachUrl) => (typeof eachUrl === 'object' ? eachUrl?.finalUrl : eachUrl || undefined));

const getAirPayload = ({ formValues = {}, procedure_id = '', shipment_id = '', organization_id = '' }) => (
	{
		instruction            : formValues?.instruction,
		url_links              : urlFormatter({ urls: [formValues?.url_links].flat() }),
		operating_procedure_id : procedure_id,
		shipment_id,
		organization_id,
	}
);

const MODE_WISE_PAYLOAD_MAPPING = {
	get_api: {
		endpoint   : '/create_shipment_operating_instruction',
		getPayload : getOceanPayload,
	},
	list_api: {
		endpoint   : '/create_shipment_operating_instruction',
		getPayload : getAirPayload,
	},
};

const useCreateModewiseSop = ({
	procedureId = '',
	controlType = '',
	shipmentData = {},
	getModeSopData = () => {},
	setShowForm = () => {},
}) => {
	const {
		endpoint = '',
		getPayload = () => {},
	} = MODE_WISE_PAYLOAD_MAPPING[controlType] || MODE_WISE_PAYLOAD_MAPPING.get_api;

	const [{ loading }, trigger] = useRequest({
		url    : endpoint,
		method : 'POST',
	}, { manual: true });

	const { id: shipmentId, importer_exporter_id: organizationId = '' } = shipmentData || {};

	const createModewiseSop = async (formValues = {}) => {
		try {
			await trigger({
				data: getPayload({
					formValues,
					procedure_id    : procedureId,
					shipment_id     : shipmentId,
					organization_id : organizationId,
				}),
			});

			getModeSopData();
			setShowForm(false);
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data) || 'something went wrong');
		}
	};

	return {
		createModewiseSop,
		loading,
	};
};

export default useCreateModewiseSop;
