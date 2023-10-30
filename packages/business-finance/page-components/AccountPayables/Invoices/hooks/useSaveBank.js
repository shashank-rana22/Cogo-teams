import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import toastApiError from '../../../commons/toastApiError';

const useSaveBank = () => {
	const {
		query = {},
		performedBy = '',
		performedByType = '',
		performedByName = '',
	} = useSelector(({ general, profile }) => ({
		query           : general?.query,
		performedBy     : profile?.user?.id,
		performedByType : profile?.session_type,
		performedByName : profile?.user.name,
	}));

	const { payrun = '', entity = '' } = query || {};

	const [{ loading }, trigger] = useRequestBf(
		{
			url     : '/purchase/payrun-bill/allot-bank',
			method  : 'post',
			authKey : 'post_purchase_payrun_bill_allot_bank',
		},
		{ manual: true },
	);

	const selectBank = async (id = '', callback = () => {}) => {
		try {
			await trigger({
				data: {
					bankId   : id,
					payrunId : payrun,
					entity,
					performedByName,
					performedBy,
					performedByType,
					billIds  : [],
				},
			});
			callback();
			Toast.success('Bank Save Successfully');
		} catch (e) {
			toastApiError('Please Select bank');
		}
	};

	return {
		selectBank,
		loadingSaveBank: loading,
	};
};

export default useSaveBank;
