import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequestBf } from '@cogoport/request';

const useAdvanceDocument = ({ refetchAdvanceDocument = () => {} }) => {
	const [{ loading }, trigger] = useRequestBf({
		url     : '/purchase/advance-document',
		method  : 'POST',
		authKey : 'post_purchase_advance_document',
	}, { manual: true });

	const apiTrigger = async (val) => {
		try {
			await trigger({ data: { ...val } });
			Toast.success('Success');
			refetchAdvanceDocument();
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		loading,
		apiTrigger,
	};
};

export default useAdvanceDocument;
