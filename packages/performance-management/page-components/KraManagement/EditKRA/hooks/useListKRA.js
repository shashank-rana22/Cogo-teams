import { Toast } from '@cogoport/components';
import { useHarbourRequest } from '@cogoport/request';

const PARAMS = {
	filters: {
		status: 'active',
	},
};

const useKRAList = () => {
	const [{ data, loading }, trigger] = useHarbourRequest(
		{
			method : 'get',
			url    : '/list_kra',
			params : PARAMS,
		},
		{ manual: false },
	);

	const fetchListKRA = () => {
		try {
			trigger({
				params: PARAMS,
			});
		} catch (err) {
			Toast.error(err?.message);
		}
	};

	return {
		data,
		loading,
		fetchListKRA,
	};
};

export default useKRAList;
