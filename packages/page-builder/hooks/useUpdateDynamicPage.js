import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';

const message_mapping = {
	active   : 'Published',
	inactive : 'Deleted',
};
function useUpdateDynamicPage() {
	const router = useRouter();

	const { query = {} } = router;

	const [{ loading }, trigger] = useRequest({

		url    : '/update_page_builder_dynamic_page',
		method : 'POST',

	}, { manual: true });

	const onSubmit = async (status, refetch, item) => {
		try {
			const payload = {
				status,
				id: item.id,
			};
			await trigger({
				data: payload,

			});

			Toast.success(`Page ${message_mapping[status]} Successfully`);
			refetch();
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	const handleSave = async (pageConfiguration, type) => {
		try {
			const payload = {
				meta_data : JSON.stringify(pageConfiguration),
				id        : query.id,
			};
			await trigger({
				data: payload,

			});

			Toast.success('Page Saved Successfully');

			if (type === 'close') {
				router.push('/page-builder');
			}
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		loading,
		onSubmit,
		handleSave,
	};
}

export default useUpdateDynamicPage;
