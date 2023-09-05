import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useCreateRDAutomationParameters = ({ setData = () => {} }) => {
	const [{ loading, data: list }, trigger] = useRequest({
		url    : '/create_revenue_desk_automation_parameters',
		method : 'POST',
	}, { manual: true });

	const apiTrigger = async (data) => {
		try {
			// const {
			// 	service_type, inco_terms,
			// 	container_size, commodity_type, commodity_item, inco_term,
			// } = filter;

			const { container_size = '', container_type = '', ...rest } = data;
			console.log({
				data: {
					...rest,
					is_weightage_required : true,
					shipment_parameters   : {
						container_size,
						container_type,
					} || undefined,
				},
			});

			const res = await trigger({
				data: {
					...rest,
					is_weightage_required : true,
					shipment_parameters   : {
						container_size,
						container_type,
					} || undefined,
				},
			});
			if (!res.hasError) {
				Toast.success('Saved Successfully');
			}
		} catch (err) {
			toastApiError(err);
		}
	};

	useEffect(() => {
		setData(list);
	}, [list, setData]);

	return {
		apiTrigger,
		loading,
		list,
	};
};

export default useCreateRDAutomationParameters;
