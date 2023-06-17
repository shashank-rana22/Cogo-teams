import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

function useDeleteDunningCycle({ id, getDunningList, setActionModal }) {
	const {
		profile,
	} = useSelector((state:any) => state);

	const [
		{ data, loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/payments/dunning/delete-dunning-cycle',
			method  : 'delete',
			authKey : 'delete_payments_dunning_delete_dunning_cycle',
		},
		{ manual: true },
	);

	const deleteCycle = async () => {
		try {
			 await trigger({
				params: {
					id,
					updatedBy: profile?.user?.id,
				},
			 });
			 Toast.success('Cycle Deleted Successfully');
			 getDunningList();
			 setActionModal((p) => ({
				visible : false,
				action  : '',
				id      : null,
			 }));
		} catch (err) {
			console.log(err?.response?.data?.message || 'Something went wrong !');
		}
	};

	return {
		deleteCycle,
		loading,
	};
}

export default useDeleteDunningCycle;
