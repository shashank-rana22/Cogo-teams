import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRouter } from '@cogoport/next';
import { useRequestBf } from '@cogoport/request';
import { useEffect, useState, useCallback } from 'react';

const useGetBankList = () => {
	const { query = '' } = useRouter();
	const [bankDetails, setBankDetails] = useState([]);

	const [{ loading }, trigger] = useRequestBf(
		{
			url     : '/purchase/payable/bank/list',
			method  : 'get',
			authKey : 'get_purchase_payable_bank_list',
		},
		{ manual: false },
	);

	const { entity = '' } = query;

	const getBankDetails = useCallback(async () => {
		const resp = await trigger({
			params: {
				entityCode: entity,
			},
		});

		setBankDetails(() => (resp.data[GLOBAL_CONSTANTS.zeroth_index].bank_details || [])?.map((item) => ({
			label : `${item?.beneficiary_name}, ${item?.branch_code} , ${item?.account_number} `,
			value : item?.account_number,
			id    : item?.id,
		})));
	}, [entity, trigger]);

	useEffect(() => {
		getBankDetails();
	}, [getBankDetails]);

	return {
		bankDetails,
		loading,
	};
};

export default useGetBankList;
