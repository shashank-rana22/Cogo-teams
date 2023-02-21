import { useRequest } from '@cogoport/request';

const useGetForm = ({ department = '', designation = '', month = '', year = '', user_id = '', action = '' }) => {
	const url = action === 'show' ? 'get-form-responses' : 'get-form';
	const params = action === 'show' ? { Month: month, Year: year, UserID: user_id }
		: { Department: department, Designation: designation };

	const [{ data: formData = {}, loading = false }] = useRequest({
		url,
		method: 'get',
		params,
	}, { manual: false });

	return { formData, loading };
};

export default useGetForm;
