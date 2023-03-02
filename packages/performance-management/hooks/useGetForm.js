import { useRequest } from '@cogoport/request';
import { startCase } from '@cogoport/utils';

import monthOptions from '../constants/month-options';

const useGetForm = ({
	item = {}, action = '', showForm = false, feedback_id = '',
	feedbackMonth = '', feedbackYear = '',
}) => {
	const { month = '', year = '', department = '', designation = '', user_id = '' } = item;

	const url = action === 'show' || !!feedback_id ? 'get_form_responses' : 'get_form';
	const newDepartment = showForm === 'employed' ? department : startCase(showForm);
	const newDesignation = showForm === 'employed' ? designation : startCase(showForm);

	const params = action === 'show' || !!feedback_id ? {
		Month       : month || monthOptions[feedbackMonth].value,
		Year        : year || feedbackYear,
		Department  : newDepartment,
		Designation : newDesignation,
		UserID      : user_id,
	}
		: { Department: newDepartment, Designation: newDesignation };

	const [{ data: formData = {}, loading = false }] = useRequest({
		url,
		method: 'get',
		params,
	}, { manual: false });

	return { formData, loading };
};

export default useGetForm;
