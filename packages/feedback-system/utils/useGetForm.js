import { useRequest } from '@cogoport/request';

const useGetForm = ({ department, designation }) => {
	const [{ data: formData = {}, loading }] = useRequest({
		url    : 'get-form',
		method : 'get',
		params : { department, designation },
	}, { manual: false });

	return { formData, loading };
};

export default useGetForm;
