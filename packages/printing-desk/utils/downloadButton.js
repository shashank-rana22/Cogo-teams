export function downloadButton({ t = () => {}, documentState = '' }) {
	const DOWNLOAD_BUTTON = {
		document_accepted            : t('printingDesk:awb_document_download_document_container_download_button'),
		document_uploaded            : t('printingDesk:awb_document_download_document_container_download_other_button'),
		document_amendment_requested : t('printingDesk:awb_document_download_document_container_download_other_button'),
	};
	return DOWNLOAD_BUTTON[documentState];
}
