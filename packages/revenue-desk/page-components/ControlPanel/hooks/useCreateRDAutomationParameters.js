import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

const useCreateRDAutomationParameters = ({ refetch }) => {
	const [{ loading, data: list }, trigger] = useRequest({
		url    : '/create_revenue_desk_automation_parameter',
		method : 'POST',
	}, { manual: true });

	const apiTrigger = async ({
		deskValue, weightageList:weightages, setOpenForm,
		openForm, shipmentParameters,
	}) => {
		try {
			const {
				overall_weightage,
				_2_day,
				_7_day,
				_30_day,
				...rest
			} = weightages;

			const res = await trigger({
				data: {
					service_type : deskValue?.service_type || shipmentParameters?.service_type || undefined,
					weightages   : {
						fulfillment_ratio: {
							overall_weightage,
							_2_day,
							_7_day,
							_30_day,
						},
						...rest,
					},
					shipment_parameters: {
						inco_term      : deskValue?.inco_term || shipmentParameters?.inco_term || undefined,
						container_type : deskValue?.container_type || shipmentParameters?.container_type || undefined,
					},
				},
			});
			if (!res.hasError) {
				Toast.success('Saved Successfully');
				setOpenForm(!openForm);
				refetch();
			}
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		apiTrigger,
		loading,
		list,
	};
};

export default useCreateRDAutomationParameters;
