import { useHarbourRequest } from '@cogoport/request';

const useGetCompanyDocument = ({ detail = {} }) => {
	const params = {
		employee_detail_id: detail?.id,
	};

	const [{ data, loading }, trigger] = useHarbourRequest(
		{
			method : 'get',
			url    : '/get_employee_signing_documents',
			params,
		},
		{ manual: false },
	);

	return {
		companyDoc    : data?.signed_documents,
		loading,
		getDocRefetch : trigger,
	};
};

export default useGetCompanyDocument;
