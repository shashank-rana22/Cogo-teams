import { Toast } from '@cogoport/components';
import { useIrisRequest } from '@cogoport/request';

const useCreateForm = () => {
	const [{ loading:createFormLoading = false }, trigger] = useIrisRequest({
		url    : 'post_iris_create_form',
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
			Toast.error(e.response?.data.error?.toString());
		}
	};

	return { onCreateForm, createFormLoading };
};

export default useCreateForm;
