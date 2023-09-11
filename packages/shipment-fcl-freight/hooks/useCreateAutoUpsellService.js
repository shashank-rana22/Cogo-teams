import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

function useCreateAutoUpsellService({ task = {}, refetch = () => {} }) {
	const [trigger, { loading = false }] = useRequest({
		url    : '',
		method : 'POST',
	}, { manual: true });

	const createAutoUpsellService = async ({ payload }) => {
		try {
			await trigger({
				data: { payload },
			});

			Toast.success('Successful');

			refetch();
		} catch (error) {
			toastApiError(error);
		}
	};

	const onSubmit = (values) => {
		const {
			name,
			business_name,
			pincode,
			tax_number,
			address,
			tax_number_document_url,
			mobile_number,
			email,
		} = values;

		const { shipment_id, service_type, task_field_id } = task;

		const payload = {
			shipment_id,
			service_type,
			name,
			address,
			pincode,
			tax_number,
			tax_number_document_url,
			business_name,
			email,
			mobile_number,
			trade_partner_id : task_field_id,
			country_id       : values?.country_id,
		};

		createAutoUpsellService(payload);
	};

	return {
		loading,
		createAutoUpsellService,
		onSubmit,
	};
}

export default useCreateAutoUpsellService;
