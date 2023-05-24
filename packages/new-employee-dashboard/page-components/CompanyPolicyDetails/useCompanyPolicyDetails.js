// import { useRouter } from '@cogoport/next';
// import { useHarbourRequest } from '@cogoport/request';

import getColumns from './getColumns';

const useCompanyPolicyDetails = () => {
	// const router = useRouter();

	// const [{ loading, data }, trigger] = useHarbourRequest({
	// 	method : 'get',
	// 	url    : '/list_employee_details',
	// }, { manual: true });

	// const fetch = useCallback(
	// 	async () => {
	// 		try {
	// 			await trigger({
	// 				params: {},
	// 			});
	// 		} catch (error) {
	// 			console.log('error :: ', error);
	// 		}
	// 	},
	// 	[search, trigger],
	// );

	// useEffect(() => {
	// 	fetch();
	// }, [fetch, search]);

	const onClickViewDocument = (id) => {
		window.open('www.google.com', false);
	};

	const columns = getColumns({ onClickViewDocument });

	const list = [
		{ doc_type: 'policy 1' },
		{ doc_type: 'policy 2' },
		{ doc_type: 'policy 3' },
		{ doc_type: 'policy 4' },
		{ doc_type: 'policy 5' },
		{ doc_type: 'policy 6' },
		{ doc_type: 'policy 7' },
		{ doc_type: 'policy 8' },
		{ doc_type: 'policy 9' },
		{ doc_type: 'policy 10' },
	];

	return {
		columns,
		// loading,
		list,
	};
};

export default useCompanyPolicyDetails;
