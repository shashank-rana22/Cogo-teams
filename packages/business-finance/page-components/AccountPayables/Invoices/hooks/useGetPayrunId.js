import { useRouter } from '@cogoport/next';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import toastApiError from '../../../commons/toastApiError.ts';

const useGetPayrunId = ({ activeEntity, currency, setShowPayrunModal }) => {
	const { push } = useRouter();
	const {
		user_data: userData,
	} = useSelector(({ profile }) => ({
		user_data: profile || {},
	}));
	const { user, session_type: sessionType } = userData;
	const { id: userId = '', name } = user || {};
	const [
		{ data, loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/purchase/payrun',
			method  : 'post',
			authKey : 'post_purchase_payrun',
		},
		{ manual: true },
	);

	const getPayrunId = async () => {
		try {
			const resp = await trigger({
				data: {
					type            : 'NORMAL',
					currency,
					list            : [],
					entityCode      : activeEntity,
					performedBy     : userId,
					performedByName : name,
					performedByType : sessionType,
				},
			});
			push(`/business-finance/account-payables/invoices/create-pay-run?payrun=${resp?.data?.id}
			&currency=${currency}&entity=${activeEntity}`);
			setShowPayrunModal(false);
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		data,
		loading,
		getPayrunId,
	};
};
export default useGetPayrunId;
