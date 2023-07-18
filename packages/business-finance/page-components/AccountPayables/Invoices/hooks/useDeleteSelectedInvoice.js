import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import toastApiError from '../../../commons/toastApiError.ts';

const useDeleteSelectedInvoice = ({ refetch = () => {}, itemData }) => {
	const { user_data: UserData } = useSelector(({ profile }) => ({
		user_data: profile || {},
	}));
	const { user, session_type: sessionType } = UserData;
	const { id: userId = '', name } = user || {};
	const [
		{ loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/purchase/payrun-bill',
			method  : 'delete',
			authKey : 'get_purchase_bills_bill',
		},
		{ manual: true },
	);

	const onDelete = async () => {
		try {
			const payload = {
				id              : itemData?.id,
				performedBy     : userId,
				performedByType : sessionType,
				performedByName : name,
			};
			await trigger({ data: payload });
			Toast.error('Deleted Successfully');
			refetch();
		} catch (err) {
			toastApiError(err);
		}
	};
	return ({
		loading,
		onDelete,
	});
};

export default useDeleteSelectedInvoice;
