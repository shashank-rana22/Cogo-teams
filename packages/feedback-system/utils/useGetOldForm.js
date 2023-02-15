import { useRequest } from '@cogoport/request';

const useGetOldForm = ({ formId = '' }) => {
	const [{ data: formData = {}, loading }, trigger] = useRequest({
		url    : 'get_form_questions',
		method : 'get',
		params : { form_id: formId },
	}, { manual: false });

	return { formData, loading };
};

export default useGetOldForm;
