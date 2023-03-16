import { useRequest } from '@cogoport/request';

function useCreateTest() {
	const [{ loading = false }, trigger] = useRequest({
		url    : 'create_test',
		method : 'POST',
	}, { manual: true });
	const createTest = async () => {
		try {
			const res = await trigger({
				data: {

				},
			});
			console.log('done:: ', res);
		} catch (error) {
			console.log(error);
		}
	};

	return {
		loading,
		createTest,
	};
}

export default useCreateTest;
