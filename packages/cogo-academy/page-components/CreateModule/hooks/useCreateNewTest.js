import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';

function useCreateNewTest() {
	const router = useRouter();

	const [{ loading }, trigger] = useRequest({
		url    : '/create_test',
		method : 'POST',
	}, { manual: true });

	const createNewTest = async ({ data }) => {
		try {
			const res = await trigger({
				data: {
					name                  : data?.name,
					cogo_entity_id        : data?.cogo_entity_id,
					eligible_users        : data?.select_users,
					audience_ids          : data?.select_user_group,
					set_wise_distribution : [],
				},
			});

			const { id: test_id = '', test_sheet_id = '' } = res?.data || {};

			let href = `/learning/test-module/create-test/?id=${test_id}`;
			let as = `/learning/test-module/create-test/?id=${test_id}`;

			if (test_sheet_id) {
				href += `&test_sheet_id=${test_sheet_id}`;
				as += `&test_sheet_id=${test_sheet_id}`;
			}

			router.push(href, as);

			Toast.success('Created Successfully');
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Something went wrong');
		}
	};
	return {
		loading,
		createNewTest,
	};
}

export default useCreateNewTest;
