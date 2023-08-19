import { useHarbourRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useUpdateDetail = (refetch) => {
	const { query:{ id } } = useSelector(({ general }) => ({
		query: general?.query || {},
	}));
	const [{ loading }, trigger] = useHarbourRequest({
		url    : 'update_employee_device_detail',
		method : 'POST',
		params : {},

	}, { manual: true });

	const updateDetail = async (data) => {
		try {
			await trigger({
				data,
			});
			refetch();
		} catch (error) {
			console.log('err', error);
		}
	};

	return { updateDetail, loading };
};

export default useUpdateDetail;
