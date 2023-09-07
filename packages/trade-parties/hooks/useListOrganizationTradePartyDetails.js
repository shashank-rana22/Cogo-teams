import { useRequest } from '@cogoport/request';
import { useCallback, useState, useEffect } from 'react';

const useListOrganizationTradePartyDetails = ({ filterParams, searchParams }) => {
	const { page, ...restFilters } = filterParams;
	const [data, setData] = useState({});
	const [{ loading }, trigger] = useRequest(
		{
			url    : '/list_organization_trade_party_details',
			params : {
				page,
				organization_trade_parties_data_required : true,
				filters                                  : {
					trade_party_type: ['self', 'paying_party', 'collection_party'],
					...searchParams,
					...restFilters,
					// ...filters,
				},
			},
		},
		{ manual: true },
	);
	const apiTrigger = useCallback(async () => {
		try {
			const res = await trigger({});
			setData(res.data);
		} catch (err) {
			// console.log("error occured");
			/// /console.log(err);
		}
	}, [trigger]);
	useEffect(() => {
		apiTrigger();
	}, [apiTrigger]);

	return { data, loading };
};
export default useListOrganizationTradePartyDetails;
