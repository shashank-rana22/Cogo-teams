import { useHarbourRequest } from '@cogoport/request';

const useProfileDetails = () => {
	const id = 'ebaac56c-5cbd-4269-8546-5396363cad4c';

	const [{ loading, data }] = useHarbourRequest({
		method : 'GET',
		url    : '/list_employee_details',
		params : {
			filters: {
				id,
			},
			document_data_required: true,
		},
	}, { manual: false });

	const { list } = data || {};

	return { data: list, loading };
};

export default useProfileDetails;
