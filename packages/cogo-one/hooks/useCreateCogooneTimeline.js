import { useRequest } from '@cogoport/request';

const useCreateCogooneTimeline = () => {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_cogoone_timeline',
		method : 'post',
	}, { manual: true, autoCancel: false });

	const createCogooneTimeline = ({ payload }) => {
		try {
			trigger({ data: payload });
		} catch (e) {
			console.error(e);
		}
	};

	return {
		createCogooneTimeline,
		loading,
	};
};
export default useCreateCogooneTimeline;
