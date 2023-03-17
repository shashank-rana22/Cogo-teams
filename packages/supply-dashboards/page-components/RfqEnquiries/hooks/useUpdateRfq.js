import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useUpdateRfq = ({ item, reason, setShow, refetch }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_rfq',
		method : 'POST',
	}, { manual: true });

	const updateRfq = async () => {
		try {
			await trigger({
				data: {
					status : 'closed',
					id     : item?.id,
					reason,
				},
			});
			setShow(false);
			refetch();
			Toast.success('rfq closed successfully');
		} catch (err) {
			// console.log(err);
		}
	};
	return {
		updateRfq,
		loading,
	};
};
export default useUpdateRfq;
