import { useHarbourRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useListEmployeeSignedDocuments = () => {
	const { query } = useSelector((state) => state.general);
	const { profile_id } = query || {};

	const [{ data, loading }] = useHarbourRequest({
		method : 'get',
		url    : '/list_employee_signed_documents',
		params : {
			filters: {
				employee_detail_id : profile_id,
				status             : ['accepted', 'active'],
			},
		},
	}, { manual: false });

	return {
		list: data?.list,
		loading,
	};
};

export default useListEmployeeSignedDocuments;
