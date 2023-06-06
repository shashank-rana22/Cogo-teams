import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useCreateCustomerInvoice = ({ shipment_data = {} }) => {
	const { loading, data, trigger } = useRequest({
		url    : '/create_shipment_document',
		method : 'POST',
	}, { manual: true });

	const createCustomerInvoice = async ({
		uploadProof,
		file_name,
		service_id,
		document_type,
	}) => {
		const payload = {
			shipment_id        : shipment_data?.id,
			document_type,
			service_type       : 'ftl_freight_service',
			service_id,
			uploaded_by_org_id : shipment_data?.importer_exporter_id,
			documents          : [
				{
					file_name,
					document_url: uploadProof,
				},
			],
		};
		try {
			await trigger({
				data: payload,
			});
			Toast.success('Document uploaded to shipment data successfully');
		} catch (error) {
			Toast.error(getApiErrorString(error?.data) || 'Something went wrong !!');
		}
	};

	return {
		loading,
		data,
		createCustomerInvoice,
	};
};

export default useCreateCustomerInvoice;
