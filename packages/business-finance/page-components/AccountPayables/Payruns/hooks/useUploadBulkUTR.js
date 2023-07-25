import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useUploadBulkUtr = ({
	setFileValue,
	activeEntity,
	advancePayment,
	refetch,
	setShowUploadUTR = () => {},
}) => {
	const { profile = {} } = useSelector((state) => state);
	const { user = {}, session_type = '' } = profile;
	const { id: user_id, name = '' } = user;

	const [{ data, loading }, trigger] = useRequestBf({
		url     : '/purchase/payrun/upload',
		method  : 'post',
		authKey : 'post_purchase_payrun_upload',
	}, { manual: true, autoCancel: false });

	const getUTRuploadPayload = (fileValue) => ({
		url             : fileValue,
		performedBy     : user_id,
		performedByType : session_type,
		performedByName : name,
		type            : advancePayment ? 'ADVANCE_PAYMENT' : undefined,
		entityCode      : activeEntity,
	});

	const upload = async (fileValue) => {
		const getPayload = getUTRuploadPayload(fileValue);
		try {
			await trigger({
				data: getPayload,
			});
			setFileValue(null);
			Toast.success('File successfully uploaded');
			setShowUploadUTR(false);
			refetch();
		} catch (e) {
			Toast.error(e?.response?.data?.message || 'Failed to upload');
		}
	};

	return {
		upload,
		loading,
		data,
	};
};

export default useUploadBulkUtr;
