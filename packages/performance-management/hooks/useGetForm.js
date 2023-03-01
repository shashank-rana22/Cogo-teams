import { useRequest } from '@cogoport/request';
import { startCase } from '@cogoport/utils';

const useGetForm = ({ item = {}, action = '', showForm = false }) => {
	const { month = '', year = '', department = '', designation = '', user_id = '' } = item;

	const url = action === 'show' ? 'get_form_responses' : 'get_form';
	const newDepartment = showForm === 'employed' ? department : startCase(showForm);
	const newDesignation = showForm === 'employed' ? designation : startCase(showForm);

	const params = action === 'show' ? { Month: month, Year: year, UserID: user_id }
		: { Department: newDepartment, Designation: newDesignation };

	const [{ data: formData = {}, loading = false }] = useRequest({
		url,
		method: 'get',
		params,
	}, { manual: false });

	return { formData, loading };
};

export default useGetForm;
