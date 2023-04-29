import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

import controls from '../utils/get-page-controls';

const message_mapping = {
	active   : 'Published',
	inactive : 'Deleted',
};
function useUpdateDndPage(props) {
	const { refetch, item } = props;

	const [{ loading }, trigger] = useRequest({

		url    : '/update_page_builder_dynamic_page',
		method : 'POST',

	}, { manual: true });

	const onSubmit = async (status) => {
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

	return {
		loading,
		onSubmit,
	};
}

export default useUpdateDndPage;
