import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useCallback } from 'react';

const PARTY_TYPE = {
	AP : ['self', 'collection_party'],
	AR : ['self', 'paying_party'],
};
const useVender = ({ setVenderDataValue, tpId, accountMode }) => {
	const [{ loading:venderLoading }, venderApiTrigger] = useRequest(
		{
			url    : 'list_organization_trade_parties',
			method : 'get',
		},
		{ manual: true },
	);
	const vender = useCallback(async () => {
		try {
			const response = await venderApiTrigger({
				params: {
					filters: {
						organization_trade_party_detail_id : tpId,
						trade_party_type                   : PARTY_TYPE[accountMode],
						object_type                        : ['vendor', 'organization'],
					},
				},
			});

			if (isEmpty(response?.data?.list?.[GLOBAL_CONSTANTS.zeroth_index])) {
				Toast.warn('No TradeParty Exists for the Selected Organization');
			}
			setVenderDataValue(response?.data?.list?.[GLOBAL_CONSTANTS.zeroth_index]);
		} catch (error) {
			Toast.error(error?.response?.data?.message || 'Something went wrong');
		}
	}, [accountMode, setVenderDataValue, tpId, venderApiTrigger]);
	return { vender, venderLoading };
};

export default useVender;
