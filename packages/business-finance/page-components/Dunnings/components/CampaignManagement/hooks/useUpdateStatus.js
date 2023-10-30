import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

function useUpdateStatus({ getDunningList }) {
	const {
		profile,
	} = useSelector((state) => state);

	const [
		{ data, loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/payments/dunning/status',
			method  : 'put',
			authKey : 'put_payments_dunning_status',
		},
		{ manual: true },
	);

	const changeStatus = async ({ id, status }) => {
		try {
			await trigger({
				data: {
					id,
					updatedBy            : profile?.user?.id,
					isDunningCycleActive : status,
				},
			});
			getDunningList();
		} catch (e) {
			Toast.error(e?.response?.data?.message || 'Something went wrong');
		}
	};

	return {
		changeStatus,
		loading,
		data,
	};
}

export default useUpdateStatus;
