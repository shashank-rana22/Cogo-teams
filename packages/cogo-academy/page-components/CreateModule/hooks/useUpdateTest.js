import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';

const QUESTION_TYPE_MAPPING = {
	q : 'stand_alone',
	c : 'case_study',
	s : 'subjective',
};

function useUpdateTest() {
	const router = useRouter();

	const [{ loading = false }, trigger] = useRequest({
		url    : '/update_test',
		method : 'POST',
	}, { manual: true });

	const updateTest = async ({ test_id, values = {}, fetchList, type = 'edit', status = '' }) => {
		try {
			if (type === 'edit') {
				const { test_duration, cut_off_percentage, maximum_attempts, name, test_validity, guidelines } = values;

				const testDetailsObj = {
					test_duration,
					cut_off_percentage,
					maximum_attempts,
					name,
					validity_start : test_validity.startDate,
					validity_end   : test_validity.endDate,
					guidelines     : guidelines?.map((obj) => obj.instruction),
				};

				const set_wise_distribution = Object.entries(values)
					.filter(
						([key]) => ![
							'test_duration',
							'cut_off_percentage',
							'maximum_attempts',
							'name',
							'test_validity',
							'guidelines',
						].includes(key),
					)
					.map(([key, value]) => {
						const question_type = QUESTION_TYPE_MAPPING[key.slice(key.length - 1)];

						const distribution_count = Number(value);

						const test_question_set_id = key.substring(0, key.length - 1);

						return {
							distribution_count,
							test_question_set_id,
							question_type,
						};
					});

				await trigger({
					data: {
						id     : test_id,
						...testDetailsObj,
						set_wise_distribution,
						status : (status === 'active') ? 'active' : 'draft',

					},
				});

				router.push('/learning?activeTab=test_module');

				Toast.success('Updated Successfully');
			} else {
				await trigger({
					data: {
						id                    : test_id,
						status                : 'inactive',
						set_wise_distribution : [],

					},
				});

				fetchList();

				Toast.success('Test Deleted Successfully');
			}
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Something went wrong');
		}
	};

	return {
		loading,
		updateTest,
	};
}

export default useUpdateTest;
