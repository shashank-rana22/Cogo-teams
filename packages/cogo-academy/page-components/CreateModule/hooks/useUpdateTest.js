import { Toast } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';

function useUpdateTest() {
	const router = useRouter();
	const [{ loading = false }, trigger] = useRequest({
		url    : 'update_test',
		method : 'POST',
	}, { manual: true });

	const updateTest = async ({ test_id, values }) => {
		try {
			const { test_duration_min, cut_off_marks, maximum_attempts, name, test_validity } = values;
			const toRemove = ['test_duration_min', 'cut_off_marks', 'maximum_attempts', 'name', 'test_validity'];
			toRemove.forEach((item) => {
				// eslint-disable-next-line no-param-reassign
				delete values[item];
			});
			const testDetailsObj = {
				test_duration  : test_duration_min,
				cut_off_marks,
				maximum_attempts,
				name,
				validity_start : test_validity.startDate,
				validity_end   : test_validity.endDate,
			};
			const set_wise_distribution = [];
			Object.entries(values).forEach(([key, value]) => {
				const question_type = key.slice(-1) === 'q' ? 'stand_alone' : 'case_study';
				// eslint-disable-next-line radix
				const distribution_count = parseInt(value);
				const test_question_set_id = key.substring(0, key.length - 1);
				set_wise_distribution.push({
					distribution_count,
					test_question_set_id,
					question_type,
				});
			});
			const res = await trigger({
				data: {
					id     : test_id,
					...testDetailsObj,
					set_wise_distribution,
					status : 'active',

				},
			});
			router.push('/learning/faq/create/test-module');
			Toast.success('Updated Successfully');
		} catch (err) {
			Toast.error(err?.message || 'Something went wrong');
		}
	};
	return {
		loading,
		updateTest,
	};
}

export default useUpdateTest;
