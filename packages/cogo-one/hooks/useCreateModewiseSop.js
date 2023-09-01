import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const getOceanParams = ({ formValues = {}, procedure_id = '', shipment_id = '', organization_id = '' }) => (
	{
		instruction      : 'additional_preference',
		sop_instructions : formValues?.additional || [],
		procedure_id,
		shipment_id,
		organization_id,
	});

const MODE_WISE_PAYLOAD_MAPPING = {
	ocean: {
		endpoint   : '/create_shipment_operating_instruction',
		getPayload : getOceanParams,
	},
};

const useCreateModewiseSop = ({
	procedureId = '',
	mode = '',
	shipmentData = {},
	getModeSopData = () => {},
	setShowForm = () => {},
}) => {
	const {
		endpoint = '',
		getPayload = () => {},
	} = MODE_WISE_PAYLOAD_MAPPING[mode] || MODE_WISE_PAYLOAD_MAPPING.ocean;

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
