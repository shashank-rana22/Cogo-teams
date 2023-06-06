import { useHarbourRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useGetEmployeeSignedDocuments = () => {
	const { query } = useSelector((state) => state.general);
	const { profile_id } = query || {};

	const [{ data, loading }] = useHarbourRequest({
		method : 'get',
		url    : '/get_employee_signing_documents',
		params : {
			employee_detail_id: profile_id,
		},
	}, { manual: false });

	return {
		data,
		loading,
	};
};

export default useGetEmployeeSignedDocuments;
