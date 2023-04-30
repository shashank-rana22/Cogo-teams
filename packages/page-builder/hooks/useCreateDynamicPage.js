import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

import controls from '../utils/get-page-controls';

function useCreateDynamicPage(props) {
	const { refetch, setShowCreatePage } = props;

	const formProps = useForm();

	const { control, handleSubmit, formState: { errors } } = formProps;

	const [{ loading }, trigger] = useRequest({

		url    : '/create_page_builder_dynamic_page',
		method : 'POST',

	}, { manual: true });

	const onSubmit = async (values = {}) => {
		try {
			const payload = {
				...values,
				status    : 'draft',
				meta_data : '',
			};
			await trigger({
				data: payload,

			});

			Toast.success('Page Created Successfully');
			setShowCreatePage(false);
			refetch();
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		control,
		errors,
		loading,
		controls,
		formProps,
		onSubmit,
		handleSubmit,
	};
}

export default useCreateDynamicPage;
