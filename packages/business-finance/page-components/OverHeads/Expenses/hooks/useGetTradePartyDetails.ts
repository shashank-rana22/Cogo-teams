import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useGetTradePartyDetails = (vendorID:string | number) => {
	const [{ data }, trigger] = useRequest(
		{
			url    : '/list_organization_trade_parties',
			method : 'get',
		},
		{ manual: true },
	);

	useEffect(() => {
		const api = async () => {
			try {
				await trigger({
					params: {
						filters: {
							object_type     : 'vendor',
							organization_id : vendorID,

						},
					},
				});
			} catch (err) {
				console.log('error-', err);
			}
		};
		api();
	}, [trigger, vendorID]);

	return {
		tradePartyData: data?.list,
	};
};

export default useGetTradePartyDetails;
