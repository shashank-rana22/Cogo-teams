import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useListInternalStakeholders = ({ shipmentId } = {}) => {
	const [{ data, loading }, trigger] = useRequest({
		method : 'GET',
		url    : '/list_shipment_stakeholders',
	}, { manual: true });

	const getList = async () => {
		try {
			await trigger({
				params: {
					filters                             : { shipment_id: shipmentId },
					format_by_stakeholder_type_required : true,
				},
			});
		} catch (err) {
			// console.log(err);
		}
	};
	useEffect(() => {
		getList();
	}, []);
	return {
		data,
		loading,
	};
};
export default useListInternalStakeholders;
