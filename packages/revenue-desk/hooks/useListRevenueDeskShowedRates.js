import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useListRevenueDeskShowedRates = ({ singleServiceData, shipmentData } = {}) => {
	const [{ data, loading }, trigger] = useRequest({
		method : 'GET',
		url    : '/list_revenue_desk_showed_rates',
	}, { manual: true });

	const getList = async () => {
		try {
			await trigger({
				params: {
					filters: { service_id: singleServiceData?.id, shipment_id: shipmentData?.id },
				},
			});
		} catch (err) {
			// console.log(err);
		}
	};
	useEffect(() => {
		getList();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(singleServiceData)]);
	return {
		data: data?.list,
		loading,
	};
};
export default useListRevenueDeskShowedRates;
