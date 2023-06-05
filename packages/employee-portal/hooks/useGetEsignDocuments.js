import { useHarbourRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useGetEsignDocuments = () => {
	const { query } = useSelector((state) => state.general);
	const { profile_id } = query || {};

	const params = {

		employee_detail_id : profile_id,
		document_type      : 'signed_document',

	};

	const [{ data, loading }, trigger] = useHarbourRequest(
		{
			method : 'get',
			url    : '/get_esign_documents',
			params,
		},
		{ manual: false },
	);

	const companyDoc = data?.list || [];

	return {
		companyDoc,
		loading,
		signDocumentsRefetch: trigger,
	};
};

export default useGetEsignDocuments;
