import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRouter } from '@cogoport/next';
import { useRequestBf } from '@cogoport/request';
import { useEffect, useState } from 'react';

const API_ARRAY_VARIABLE_ONE = 1;

const useGetBankList = () => {
	const { query } = useRouter();
	const [bankDetails, setBankDetails] = useState([]);

	const getBankList = useRequestBf(
		{
			url     : '/purchase/payable/bank/list',
			method  : 'get',
			authKey : 'get_purchase_payable_bank_list',
		},
		{ manual: false },
	);

	const { entity } = query;

	const getBankDetails = async () => {
		const resp = await getBankList[API_ARRAY_VARIABLE_ONE]({
			params: {
				entityCode: entity,
			},
		});

		setBankDetails(() => (resp.data[GLOBAL_CONSTANTS.zeroth_index].bank_details || []).map((item) => ({
			label : `${item?.beneficiary_name}, ${item?.branch_code}`,
			value : item?.account_number,
			id    : item?.id,
		})));
	};

	useEffect(() => {
		getBankDetails();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		bankDetails,
	};
};

export default useGetBankList;
