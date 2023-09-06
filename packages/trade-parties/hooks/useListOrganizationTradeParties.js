import { useRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

const useListOrganizationTradeParties = ({ trade_party_id }) => {
	const [data, setData] = useState([]);
	const [{ loading }, trigger] = useRequest(
		{
			url    : '/list_organization_trade_parties',
			params : {
				organization_data_required : true,
				filters                    : {
					organization_trade_party_detail_id : trade_party_id,
					status                             : 'active',
				},
			},
		},
		{ manual: true },
	);
	const apiTrigger = useCallback(async () => {
		try {
			const res = await trigger({});
			// console.log("res", res.data);
			setData(res?.data?.list);
		} catch (err) {
			console.log('error occured');
			console.log(err);
		}
	}, [trigger]);
	useEffect(() => {
		apiTrigger();
	}, [apiTrigger, trade_party_id]);
	return { data, loading };
};
export default useListOrganizationTradeParties;
