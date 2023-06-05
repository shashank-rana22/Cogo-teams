import { Toast } from '@cogoport/components';
import { useHarbourRequest } from '@cogoport/request';

const useGetDocumentSigningUrl = ({ id, getEmployeeDetails }) => {
	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'get',
		url    : '/get_document_signing_url',
	}, { manual: true });

	const onClickSignDocument = async () => {
		try {
			const res = await trigger({
				params: {
					document_id   : id,
					document_type : 'offer_letter',

				},
			});

			if (res?.data?.status === 'not_signed') {
				window.open(res?.data?.signing_url, '_blank');
			} else getEmployeeDetails();
		} catch (err) {
			Toast.error((err?.response?.data?.message) || 'Something went wrong');
		}
	};

	return {
		onClickSignDocument,
		loading,
		data,
	};
};

export default useGetDocumentSigningUrl;
