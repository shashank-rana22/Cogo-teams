import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const useGetDocumentSigningUrl = ({ id }) => {
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

			window.open(res?.data?.signing_url, '_blank');
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Something went wrong');
		}
	};
	return {
		onClickSignDocument,
		loading,
		data,
	};
};

export default useGetDocumentSigningUrl;
