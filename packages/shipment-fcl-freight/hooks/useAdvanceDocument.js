import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

const useAdvanceDocument = (setShowRequestModal) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/purchase/advance-document',
		method : 'POST',
	}, { manual: true });

	const apiTrigger = async (val) => {
		try {
			await trigger({ data: { ...val } });
			Toast.success('Success');
			setShowRequestModal(false);
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
