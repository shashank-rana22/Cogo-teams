import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useCreateForm = () => {
	const [{ loading:createFormLoading = false }, trigger] = useRequest({
		url    : 'create_form',
		method : 'post',
	}, { manual: true });

	const onCreateForm = async ({
		form_questions, department, bulkDesignations = [],
		proceedForm = () => {},
		setRefetchedLists = () => {},
	}) => {
		try {
			await trigger({ data: { form_questions, department, designations: bulkDesignations } });
			proceedForm('publish');
			setRefetchedLists(true);
		} catch (e) {
			Toast.error(getApiErrorString(e.data));
		}
	};

	return { onCreateForm, createFormLoading };
};

export default useCreateForm;
