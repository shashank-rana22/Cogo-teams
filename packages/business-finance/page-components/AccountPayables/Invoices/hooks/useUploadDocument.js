import { Toast } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useRequestBf } from '@cogoport/request';

const useUploadDocuments = ({ fileUploader = {} }) => {
	const { query:{ payrun = '' } } = useRouter();
	const { singleFileUpload = '', fileBank = '', multiFileUpload = '' } = fileUploader || {};

	const [{ loading }, trigger] = useRequestBf(

		{
			url     : '/purchase/payrun/upload-documents',
			method  : 'post',
			authKey : 'post_purchase_payrun_upload_documents',
		},
		{ manual: true },
	);

	const onUpload = async (setActive = () => {}) => {
		const formattedUrls = multiFileUpload?.map((item) => item);

		try {
			await trigger({
				data: {
					payrunId              : payrun,
					taxDeclarationFormUrl : singleFileUpload || undefined,
					bankFormUrl           : fileBank || undefined,
					otherDocumentsUrl     : formattedUrls || undefined,
				},
			});
			Toast.success('File successfully uploaded');
			setActive('final_confirmation');
		} catch (e) {
			Toast.error(e?.error?.message || 'Failed to upload');
		}
	};

	return {
		onUpload,
		loading,
	};
};

export default useUploadDocuments;
