import { useHarbourRequest } from '@cogoport/request';

const useProfileDetails = () => {
	const id = '85cdcf6b-bd52-4fea-b136-12e377c48ecc';

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
