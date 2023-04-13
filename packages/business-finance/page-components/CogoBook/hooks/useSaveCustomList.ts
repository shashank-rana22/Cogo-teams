import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback } from 'react';

const useSaveCustomList = ({ setCustomModal }) => {
	const { profile } = useSelector((state) => state || {});

	const [
		{ data, loading },
		saveTrigger,
	] = useRequestBf(
		{
			url     : '/pnl/statement/list-customizations',
			method  : 'get',
			authKey : 'get_pnl_statement_list_customizations',
		},
		{ manual: true },
	);

	const [
		{ loading:LoadingDelete },
		deleteTrigger,
	] = useRequestBf(
		{
			url     : '/pnl/statement/customizations',
			method  : 'delete',
			authKey : 'delete_pnl_statement_customizations',
		},
		{ manual: true },
	);

	const refetch = useCallback(async () => {
		try {
			const res = await saveTrigger({
				params: {
					createdBy: profile.partner?.id,
				},
			});
			if (res.data) {
				setCustomModal(true);
			}
		} catch (error) {
			Toast.error(error?.response?.data?.message);
		}
	}, [profile.partner?.id, saveTrigger, setCustomModal]);

	const refetchDelete = useCallback(async (item) => {
		try {
			const res = await deleteTrigger({
				data: {
					id: item?.id,
				},
			});
			if (res.data) {
				refetch();
				Toast.success('Delete  SuccessFully');
			}
		} catch (error) {
			Toast.error(error?.response?.data?.message);
		}
	}, [deleteTrigger, refetch]);

	return {
		refetch,
		refetchDelete,
		saveData: data?.list,
		loading,
		LoadingDelete,
	};
};
export default useSaveCustomList;
