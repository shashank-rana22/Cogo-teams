import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

const useListOrganizationDocuments = ({ tradePartyMappingId = '', serviceProviderId = '' }) => {
	const [bankDetails, setBankDetails] = useState([]);

	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_organization_documents',
		method : 'get',
	}, { manual: true });
	const getBankListData = useCallback(async () => {
		try {
			await trigger({
				params: {
					page       : 1,
					page_limit : 20,
					filters    : {
						organization_trade_party_id : tradePartyMappingId,
						organization_id             : serviceProviderId,
						status                      : 'active',
						verification_status         : 'verified',
						document_type               : 'bank_account_details',
					},
				},
			});
		} catch (error) {
			Toast.error(error);
		}
	}, [serviceProviderId, tradePartyMappingId, trigger]);

	useEffect(() => {
		setBankDetails(() => (data?.list || []).map((item) => ({
			key      : item?.data?.bank_account_number,
			imageUrl : item?.image_url,
			bankId   : item?.organization_trade_party_id,
			label    : `${item?.data?.bank_name || ''},
			 ${item.data?.branch_name || ''} - IFSC: ${item?.data?.ifsc_number || ''}`,
			value: item?.data?.bank_account_number,
			...(item?.data || {}),
		})));
	}, [data]);
	useEffect(() => {
		getBankListData();
	}, [getBankListData]);

	return {
		bankDetails,
		bankDetailsLoading: loading,
		data,
	};
};

export default useListOrganizationDocuments;
