export const MAPPING_FILE_STATUS_COLOR = {
	READY              : '#CFEAED',
	UPLOADED           : '#C4DC91',
	UPLOAD_IN_PROGRESS : '#FEF199',
	PROCESSING         : '#FEF199',
	ERROR              : '#F8AEA8',
	ERROR_IN_EXPORT    : '#F8AEA8',
};
export const mappingFileStatus = (t) => ({
	READY              : t('compliance:ready_to_upload'),
	UPLOADED           : t('compliance:uploaded'),
	UPLOAD_IN_PROGRESS : t('compliance:upload_in_progress'),
	PROCESSING         : t('compliance:export_in_progress'),
	ERROR              : t('compliance:error'),
	ERROR_IN_EXPORT    : t('compliance:error_in_export'),
});

export const MAPPING_ENABLE_STATUS = {
	ENABLE  : '#C4DC91',
	DISABLE : '#E0E0E0',
};

export const MAPPING_IRN_STATUS_COLOR = {
	IRN_GENERATED : 'green',
	POSTED        : 'green',
	FAILED        : 'green',
	IRN_FAILED    : '#f37166',
};
export const mappingIrnStatus = (t) => ({
	IRN_GENERATED : t('compliance:irn_status_success'),
	POSTED        : t('compliance:irn_status_success'),
	FAILED        : t('compliance:irn_status_success'),
	IRN_FAILED    : t('compliance:irn_status_fail'),
});
export const MAPPING_TOOLTIP_DATA_STATUS = {
	ERROR              : 'Please reach out to tech support',
	PROCESSING         : 'It might take some time',
	UPLOAD_IN_PROGRESS : 'Upload might take some time',
};
