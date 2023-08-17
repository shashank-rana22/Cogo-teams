/* eslint-disable react-hooks/exhaustive-deps */
import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useCreateRDAutomationParameters = ({ setData = () => {} }) => {
	const [{ loading, data: list }, trigger] = useRequest({
		url    : '/create_revenue_desk_automation_parameters',
		method : 'POST',
	}, { manual: true });

	const apiTrigger = async ({ filter = {}, refetched = false }) => {
		try {
			const {
				trade_type, service_type, customer_segment = '',
				container_size, commodity_type, commodity_item, inco_term,
			} = filter;
			const res = await trigger({
				data: {
					service_type,
					trade_type,
					customer_segment,
					is_weightage_required : true,
					shipment_attributes   : {
						container_size,
						container_type : commodity_type,
						commodity      : commodity_item,
						inco_term,
					} || undefined,
				},
			});
			if (!res.hasError) {
				if (!refetched) { Toast.success('Saved Successfully'); }
			}
		} catch (err) {
			toastApiError(err);
		}
	};

	useEffect(() => {
		setData(list);
	}, [list]);

	return {
		apiTrigger,
		loading,
		list,
	};
};

export default useCreateRDAutomationParameters;
