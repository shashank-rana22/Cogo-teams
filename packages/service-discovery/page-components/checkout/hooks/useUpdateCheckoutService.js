import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useUpdateCheckoutService = ({
	detail,
	checkout_id,
	refetch = () => {},
	setNoRatesPresent = () => {},
}) => {
	const [{ loading }, trigger] = useRequest(
		{
			method : 'post',
			url    : '/update_checkout_service',
		},
		{ manual: true },
	);

	const handleDeleteRate = async ({ serviceType = '', id = '' }) => {
		let service_to_be_deleted = serviceType;

		if (
			detail?.primary_service === 'fcl_freight'
			&& service_to_be_deleted === 'trailer_freight'
			&& checkout_id
		) {
			service_to_be_deleted = 'haulage_freight';
		}

		const isSubsidiary = serviceType === 'subsidiary';

		const service_type = isSubsidiary
			? 'subsidiary_services_attributes'
			: `${service_to_be_deleted}_services_attributes`;

		try {
			const payload = {
				id             : checkout_id,
				service        : service_to_be_deleted,
				[service_type] : [
					{
						id,
						status: 'inactive',
					},
				],
			};

			await trigger({ data: payload });

			setNoRatesPresent(false);
			Toast.success('Service deleted successfully!');
			refetch();
		} catch (err) {
			Toast.error('Could not delete Service!');
		}
	};

	const updateCheckoutService = async ({ values }) => {
		try {
			await trigger({ data: values });

			Toast.success('Updated successfully!');
			refetch();
		} catch (err) {
			Toast.error('Something went wrong!');
		}
	};

	return {
		handleDeleteRate,
		deleteRateLoading: loading,
		updateCheckoutService,
	};
};

export default useUpdateCheckoutService;
