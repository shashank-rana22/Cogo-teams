import { useRequest } from '@cogoport/request';

const useUpdateRfq = ({ item, reason, setShow }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_rfq',
		method : 'POST',
	}, { manual: true });

	const updateRfq = async () => {
		try {
			await trigger({
				data: {
					status : 'inactive',
					id     : item?.id,
					reason,
				},
			});
			setShow(false);
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
