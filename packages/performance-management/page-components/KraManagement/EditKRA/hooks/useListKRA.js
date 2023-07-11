import { useHarbourRequest } from '@cogoport/request';

const useKRAList = () => {
	const [{ data, loading }] = useHarbourRequest(
		{
			method : 'get',
			url    : '/list_kra',
			params : {
				filters: {
					status: 'active',
				},
			},
		},
		{ manual: false },
	);

	return {
		data,
		loading,
	};
};

export default useKRAList;
