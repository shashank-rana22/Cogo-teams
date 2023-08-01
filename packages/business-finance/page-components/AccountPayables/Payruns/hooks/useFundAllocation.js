import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useFundAllocationRequest = ({ itemData = {}, setShowRequestModal = () => {} }) => {
	const { bankId, bankAccountNo, entityCode, currency } = itemData;
	const { profile = {} } = useSelector((state) => state);
	const { user = {} } = profile;
	const { id: user_id, name } = user;
	const [{ data, loading }, trigger] = useRequestBf({
		url     : '/purchase/treasury/req-fund-allocation',
		method  : 'post',
		authKey : 'post_purchase_treasury_req_fund_allocation',
	}, { manual: true, autoCancel: false });

	const onRequest = async (values) => {
		try {
			const payload = {
				amount          : values.amount,
				bankId,
				bankAccountNo,
				entityCode,
				currency,
				remark          : values.remark,
				performedBy     : user_id,
				performedByName : name,
			};
			await trigger({ data: payload });
			Toast.success('Your Request has been submitted!!');
			setShowRequestModal(false);
		} catch (e) {
			Toast.error(e?.data?.message || 'Oops! something went wrong');
		}
	};
	return {
		onRequest,
		loading,
		data,
	};
};
export default useFundAllocationRequest;
