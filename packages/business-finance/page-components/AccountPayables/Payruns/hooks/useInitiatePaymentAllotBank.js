import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useInitiatePaymentAllotBank = ({
	setShowAllotBank = () => {},
	setCheckedRows = () => {},
	refetch = () => {},
	overseasData = '',
	selectedIds = [],
	setSelectedIds = () => {},
}) => {
	const { profile = {} } = useSelector((state) => state);
	const { user = {}, session_type = '' } = profile;
	const { id: user_id, name } = user;

	const [{ data, loading }, trigger] = useRequestBf({
		url     : '/purchase/payrun-bill/allot-bank',
		authKey : 'post_purchase_payrun_bill_allot_bank',
		method  : 'post',
	}, { manual: true, autoCancel: false });

	const getInitiatePaymentPayload = (id, payrunId, entityCode) => ({
		bankId          : id,
		payrunId,
		entity          : entityCode,
		performedByName : name,
		performedBy     : user_id,
		performedByType : session_type,
		billIds         : selectedIds,
		payrunType:
					overseasData === 'ADVANCE_PAYMENT' ? 'ADVANCE_PAYMENT' : undefined,
	});

	const selectBank = async (id, selectedPayrun = undefined, checkedRow = undefined) => {
		const { id: payrunId = '', entityCode = '' } = selectedPayrun || checkedRow || {};
		const getPayload = getInitiatePaymentPayload(id, payrunId, entityCode);
		try {
			await trigger({
				data: getPayload,
			});
			setCheckedRows({});
			setSelectedIds([]);
			setShowAllotBank(false);
			refetch();
			Toast.success('Bank Alloted Successfully');
		} catch (e) {
			Toast.error('Oops, Something Went Wrong');
		}
	};

	return {
		loading,
		selectBank,
		data,
	};
};

export default useInitiatePaymentAllotBank;
