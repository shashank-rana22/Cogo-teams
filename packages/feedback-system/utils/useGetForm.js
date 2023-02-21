import { useRequest } from '@cogoport/request';

const useGetForm = ({ department, designation }) => {
	const [{ data: formData = {}, loading = false }] = useRequest({
		url    : 'get-form',
		method : 'get',
		params : { Department: department, Designation: designation },
	}, { manual: false });

	return { formData, loading };
};

export default useGetForm;
