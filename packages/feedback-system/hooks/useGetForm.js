import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useGetForm = ({ item = {}, action = '', addFeedback = false }) => {
	const { month = '', year = '', department = '', designation = '', user_id = '' } = item;

	const url = action === 'show' ? 'get_form_responses' : 'get_form';
	const params = action === 'show' ? { Month: month, Year: year, UserID: user_id }
		: { Department: department, Designation: designation };

	const [{ data: formData = {}, loading = false }, trigger] = useRequest({
		url,
		method: 'get',
	}, { manual: true });

	const getForm = async () => {
		trigger({ params });
	};

	useEffect(() => {
		if (addFeedback) {
			getForm();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [addFeedback]);

	return { formData, loading };
};

export default useGetForm;
