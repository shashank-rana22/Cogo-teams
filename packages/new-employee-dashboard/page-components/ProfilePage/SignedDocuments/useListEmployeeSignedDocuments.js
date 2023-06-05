import { useHarbourRequest } from '@cogoport/request';

const ListEmployeeSignedDocuments = () => {
	const [{ data, loading }, trigger] = useHarbourRequest({
		method : 'get',
		url    : '/list_employee_signed_documents',
	}, { manual: false });

	return {
		list: data?.list,
	};
};

export default ListEmployeeSignedDocuments;
