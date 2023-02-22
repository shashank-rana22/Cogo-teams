import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useCreateForm = () => {
	const [{ loading:createFormLoading = false }, trigger] = useRequest({
		url    : 'create-form',
		method : 'post',
	}, { manual: true });

	const onCreateForm = async ({
		form_questions, department, designation,
		proceedForm = () => {},
		setRefetchedLists = () => {},
	}) => {
		try {
			await trigger({ data: { form_questions, department, designation } });
			proceedForm('publish');
			setRefetchedLists(true);
		} catch (e) {
			Toast.error(e.toString());
		}
	};

	return { onCreateForm, createFormLoading };
};

export default useCreateForm;
