import { useIrisRequest } from '@cogoport/request';
import { startCase } from '@cogoport/utils';

import monthOptions from '../constants/month-options';

const useGetForm = ({
	item = {}, action = '', showForm = false, feedback_id = '',
	feedbackMonth = '', feedbackYear = '',
}) => {
	const { month = '', year = '', department = '', designation = '', user_id = '' } = item;

	const url = action === 'show' || !!feedback_id ? 'get_iris_get_form_responses' : 'get_iris_get_form';

	const formType = showForm === true ? undefined : startCase(showForm);

	const newDepartment = showForm === 'employed' ? department : formType;
	const newDesignation = showForm === 'employed' ? designation : formType;

	const params = action === 'show' || !!feedback_id ? {
		Month       : month || monthOptions[feedbackMonth].value,
		Year        : year || feedbackYear,
		Department  : newDepartment,
		Designation : newDesignation,
		UserID      : user_id,
	}
		: { Department: newDepartment, Designation: newDesignation };

	const [{ data: formData = {}, loading = false }] = useIrisRequest({
		url,
		method: 'get',
		params,
	}, { manual: false });

	return { formData, loading };
};

export default useGetForm;
