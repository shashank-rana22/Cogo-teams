import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useCallback } from 'react';

const useVender = ({ setVenderDataValue, tpId, accountMode }) => {
	const [{ loading:venderLoading }, venderApiTrigger] = useRequest(
		{
			url    : 'list_organization_trade_parties',
			method : 'get',
		},
		{ manual: true },
	);
	const vender = useCallback(async () => {
		const partyType = {
			AP : ['self', 'collection_party'],
			AR : ['self', 'paying_party'],
		};
		try {
			const resp = await venderApiTrigger({
				params: {
					filters: {
						organization_trade_party_detail_id : tpId,
						trade_party_type                   : partyType[accountMode],
					},
				},
			});

			if (isEmpty(resp.data.list[0])) {
				Toast.warn('No TradeParty Exists for the Selected Organization');
			}
			setVenderDataValue(resp.data.list[0]);
		} catch (error) {
			Toast.error(error?.response?.data?.message || 'Something went wrong');
		}
	}, [accountMode, setVenderDataValue, tpId, venderApiTrigger]);
	return { vender, venderLoading };
};

export default useVender;
