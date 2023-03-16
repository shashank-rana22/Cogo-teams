import { useRequest } from '@cogoport/request';

function useCreateTest() {
	const [{ loading = false }, trigger] = useRequest({
		url    : 'create_test',
		method : 'POST',
	}, { manual: true });
	const createTest = async ({ formValues, idArray }) => {
		try {
			console.log(formValues, idArray);
			const res = await trigger({
				data: {
					...formValues,
					set_wise_distribution : [],
					test_duration         : '1hr',
				},
			});
			console.log('done:: ', res);
		} catch (error) {
			console.log({
				...formValues,
				set_wise_distribution: idArray.map((id) => ({ test_question_set_id: id })),
			});
			console.log(error);
		}
	};
	return {
		loading,
		createTest,
	};
}

export default useCreateTest;
