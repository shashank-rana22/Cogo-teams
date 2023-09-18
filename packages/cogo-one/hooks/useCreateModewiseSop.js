import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

import {
	MODE_WISE_PAYLOAD_MAPPING,
	createProcedurePayload,
} from '../helpers/sopWisePayloadHelper';

import useCreateOpsProcedure from './useCreateOpsProcedure';

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

	const { createOpsProcedure, procedureLoading = false } = useCreateOpsProcedure();

	const { id: shipmentId, importer_exporter_id: organizationId = '' } = shipmentData || {};

	const createModewiseSop = async (formValues = {}) => {
		try {
			if (controlType === 'list_api' && !procedureId) {
				await createOpsProcedure({
					data: createProcedurePayload({
						formValues, shipment_id: shipmentId, organization_id: organizationId,
					}),
				});
				getModeSopData();
				setShowForm(false);
				return;
			}

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
		loading: procedureLoading || loading,
	};
};

export default useCreateModewiseSop;
