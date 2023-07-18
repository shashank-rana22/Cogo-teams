import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

interface Props {
	id?: string;
	getDunningList?: Function;
	setActionModal?: Function;
}

interface StateInterface {
	profile?: {
		user?: {
			id?: string | number;
		};
	};
}

function useDeleteDunningCycle({ id, getDunningList, setActionModal }:Props) {
	const {
		profile,
	} = useSelector((state: StateInterface) => state);

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
			setActionModal({});
		} catch (err) {
			Toast.error(err?.response?.data?.message || 'Something went wrong !');
		}
	};

	return {
		deleteCycle,
		loading,
		data,
	};
}

export default useDeleteDunningCycle;
