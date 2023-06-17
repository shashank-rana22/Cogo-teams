import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

function useUpdateStatus() {
	const {
		profile,
	} = useSelector((state:any) => state);

	const [
		{ data, loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/payments/dunning/update-status',
			method  : 'put',
			authKey : 'put_payments_dunning_update_status',
		},
		{ manual: true },
	);

	const changeStatus = async ({ id, status }) => {
		try {
			 await trigger({
				data: {
					id,
					updatedBy: profile?.user?.id,
					isDunningCycleActive: status,
				},
			 });
		} catch (e) {
			Toast.error(e?.response?.data?.message || 'Something went wrong');

		}
	};

	return {
		changeStatus,
		loading,
	};
}

export default useUpdateStatus;
