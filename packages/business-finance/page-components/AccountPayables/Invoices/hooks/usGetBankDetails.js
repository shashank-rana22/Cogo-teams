import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

const useGetBankDetails = ({ tradePartyMappingId, serviceProviderId }) => {
	const [bankDetails, setBankDetails] = useState([]);

	const [{ data, loading }] = useRequest(
		{
			url    : '/list_organization_documents',
			method : 'get',
			params : {
				page                        : 1,
				page_limit                  : 20,
				organization_trade_party_id : tradePartyMappingId,
				organization_id             : serviceProviderId,
				status                      : 'active',
				verification_status         : 'verified',
				document_type               : 'bank_account_details',
			},
		},
		{ manual: false },
	);

	useEffect(() => {
		setBankDetails(() => (data?.list || []).map((item) => ({
			key      : item?.data?.bank_account_number,
			imageUrl : item?.image_url,
			bankId   : item?.organization_trade_party_id,
			label    : `${item?.data?.bank_name}, ${item.data?.branch_name} - IFSC: ${item?.data?.ifsc_number}`,
			value    : item?.data?.bank_account_number,
			...(item?.data || {}),
		})));
	}, [data]);

	return {
		bankDetails,
		bankDetailsLoading: loading,
		data,
	};
};

export default useGetBankDetails;
