import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useSelfAllocateFund = ({ itemData, refetch }) => {
	const { user_data: UserData } = useSelector(({ profile }) => ({
		user_data: profile || {},
	}));
	const { user } = UserData;
	const { id: userId = '', name } = user || {};

	const {
		bankId = '',
		bankname = '',
		bankAccountNo = '',
		entityCode = '',
		currency = '',
	} = itemData || {};

	const [{ data, loading },
		allocateFundApi,
	] = useRequestBf(
		{
			url     : 'purchase/treasury/allocate-fund',
			method  : 'post',
			authKey : 'post_purchase_treasury_allocate_fund',
		},
		{ manual: true },
	);

	const onSubmit = async (values) => {
		try {
			const payload = {
				bankId,
				bankName        : bankname,
				bankAccountNo,
				entityCode,
				currency,
				allocatedAmount : values.allotAmount,
				performedBy     : userId,
				performedByName : name,
			};
			await allocateFundApi({ data: payload });
			Toast.success('Amount alloted sucessfully!!');
			refetch();
		} catch (e) {
			Toast.error(e?.response?.data?.message);
		}
	};
	return {
		onSubmit,
		loading,
		data,
	};
};
export default useSelfAllocateFund;
