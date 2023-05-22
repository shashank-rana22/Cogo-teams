import { useHarbourRequest } from '@cogoport/request';

const useProfileDetails = () => {
	const id = 'ebaac56c-5cbd-4269-8546-5396363cad4c';

	const [{ loading, data }] = useHarbourRequest({
		method : 'GET',
		url    : '/get_employee_details',
		params : {
			id,
			document_data_required: true,
		},
	}, { manual: false });

	return { data, loading };
};

export default useProfileDetails;
