import { useRequest } from '@cogoport/request';

const useUserSession = ({ ctx }) => {
	const [
		{ data: putData, loading: putLoading, error: putError },
		executePut,
	] = useRequest(
		{
			url    : '/get_user_session',
			method : 'get',
		},
		{ manual: true },
	);

	return {};
};

export default useUserSession;
