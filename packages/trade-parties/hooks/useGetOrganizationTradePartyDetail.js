import { useRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

const useGetOrganizationTradePartyDetail = ({ id }) => {
	const [data, setData] = useState([]);
	console.log('get organiszation', id);
	const [{ loading }, trigger] = useRequest(
		{
			url    : '/get_organization_trade_party_detail',
			params : {
				id,
			},
		},
		{ manual: true },
	);
	const apiTrigger = useCallback(async () => {
		try {
			const res = await trigger({});
			setData(res?.data?.data);
			// console.log(res.data);
		} catch (err) {
			console.log('error occured');
			console.log(err);
		}
	}, [trigger]);
	useEffect(() => {
		apiTrigger();
	}, [apiTrigger]);
	return { data, loading };
};
export default useGetOrganizationTradePartyDetail;
