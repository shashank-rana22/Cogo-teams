import { Toast } from '@cogoport/components';
import { usePublicRequest } from '@cogoport/request';
import { saveAs } from 'file-saver';
import { useTranslation } from 'next-i18next';

const GENERATE_FROM_HTML_URL = 'https://vmoiuzda31.execute-api.ap-south-1.amazonaws.com/production/generate_from_html';

const useDownloadManifest = (stylesTHC, handleSave, documentNumber) => {
	const { t } = useTranslation(['printingDesk']);
	const [{ loading }, trigger] = usePublicRequest({
		url    : GENERATE_FROM_HTML_URL,
		method : 'POST',
	});

	const handleView = async () => {
		const html = `<html><head><style>${stylesTHC}</style></head><body>${
			document.getElementById('manifest').innerHTML
		}</body></html>`;
		try {
			await trigger({
				data: {
					html,
					configs: {
						landscape : false,
						format    : 'A4',
						scale     : 1,
					},
				},
			}).then((res) => {
				const url = res?.data?.pdf_url;
				saveAs(url, documentNumber);
				handleSave(url);
			});
		} catch (err) {
			Toast.error(err?.message || t('printingDesk:common_error_failed_to_download_message'));
		}
	};

	return {
		handleView,
		loading,
	};
};
export default useDownloadManifest;
