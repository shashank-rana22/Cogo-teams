import { Toast } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';

function useCreateTest({ setTestId, setActiveStepper }) {
	const router = useRouter();
	const [{ loading = false }, trigger] = useRequest({
		url    : 'create_test',
		method : 'POST',
	}, { manual: true });
	const createTest = async ({ data, idArray, next }) => {
		try {
			const res = await trigger({
				data: {
					name                  : data?.name,
					cogo_entity_id    		  : data?.cogo_entity_id,
					set_wise_distribution : [
						...idArray.map((id) => ({ test_question_set_id: id, question_type: 'case_study' })),
						...idArray.map((id) => ({ test_question_set_id: id, question_type: 'stand_alone' }))],
				},
			});
			setTestId(res?.data?.id);
			if (next === 'draft') {
				router.push('/learning/test-module/create');
				Toast.success('Draft Saved Successfully');
			} else {
				const as = `/learning/test-module/create-test?id=${res?.data?.id}`;
				const href = `/learning/test-module/create-test?id=${res?.data?.id}`;
				router.push(href, as);
				setActiveStepper('review_and_criteria');
				Toast.success('Created Successfully');
			}
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
