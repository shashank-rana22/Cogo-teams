import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';

import useGetTest from './useGetTest';

function useCreateTest({ setActiveStepper = '' }) {
	const router = useRouter();
	const test_id = router.query?.id;

	const { getTest } = useGetTest({ test_id });

	const [{ loading = false }, trigger] = useRequest({
		url    : 'update_test',
		method : 'POST',
	}, { manual: true });

	const createTest = async ({ values = {}, idArray = [], next, uploadDocument = {} }) => {
		try {
			const res = await trigger({
				data: {
					id                    : test_id,
					name                  : values.name,
					cogo_entity_id        : values.cogo_entity_id,
					audience_ids          : values.select_user_group,
					eligible_users        : values.select_users,
					file_url              : next ? uploadDocument?.finalUrl || uploadDocument : undefined,
					generate_sheet        : next ? false : values.select_users === 'excel',
					set_wise_distribution : [
						...idArray.map((id) => ({ test_question_set_id: id, question_type: 'case_study' })),
						...idArray.map((id) => ({ test_question_set_id: id, question_type: 'stand_alone' })),
						...idArray.map((id) => ({ test_question_set_id: id, question_type: 'subjective' }))],
				},
			});

			getTest({ test_id });

			if (next === 'draft') {
				router.push('/learning/test-module?activeTab=test_module');
				Toast.success('Draft Saved Successfully');
			} else {
				const as = `/learning/test-module/create-test?mode=edit&id=${res?.data?.id}`;
				const href = `/learning/test-module/create-test?mode=edit&id=${res?.data?.id}`;
				router.push(href, as);
				setActiveStepper('review_and_criteria');
				Toast.success('Created Successfully');
			}
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Something went wrong');
		}
	};
	return {
		loading,
		createTest,
	};
}

export default useCreateTest;
