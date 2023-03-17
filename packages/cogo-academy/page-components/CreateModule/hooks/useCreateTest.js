import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

function useCreateTest({ setTestId, setActiveStepper }) {
	const [{ loading = false }, trigger] = useRequest({
		url    : 'create_test',
		method : 'POST',
	}, { manual: true });
	const createTest = async ({ formValues, idArray }) => {
		try {
			console.log(formValues, idArray);
			const res = await trigger({
				data: {
					name                  : formValues.name,
					set_wise_distribution : [
						...idArray.map((id) => ({ test_question_set_id: id, question_type: 'case_study' })),
						...idArray.map((id) => ({ test_question_set_id: id, question_type: 'stand_alone' }))],
					test_duration: '1hr',
				},
			});
			setTestId(res?.data?.id);
			setActiveStepper('review_and_criteria');
			Toast.success('Created Successfully');
			console.log('done:: ', res);
		} catch (err) {
			Toast.error(err?.message || 'Something went wrong');
		}
	};
	return {
		loading,
		createTest,
	};
}

export default useCreateTest;
