import { useRequest } from '@cogoport/request';

const useCreateBulkCogooneShift = () => {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_bulk_cogoone_shift',
		method : 'post',
	}, { manual: true });

	const createCogooneShift = ({ payload }) => {
		try {
			trigger({ data: payload });
		} catch (e) {
			console.error(e);
		}
	};

	return {
		createCogooneShift,
		loading,
	};
};
export default useCreateBulkCogooneShift;
