import { useHarbourRequest } from '@cogoport/request';

const useGetManagerLevel = () => {
	const [{ data, loading }] = useHarbourRequest({
		url    : '/get_manager_level',
		method : 'GET',
	}, { manual: false });

	const { level } = data || {};

	return {
		loading,
		level,
	};
};

export default useGetManagerLevel;
