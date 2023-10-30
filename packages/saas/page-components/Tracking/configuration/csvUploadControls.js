const { IcMAppDocumentUpload } = require('@cogoport/icons-react');

const csvUploadControls = ({ trackingType = 'ocean', operatorData = {}, t }) => {
	const { shippingLineData = [], airLineData = [] } = operatorData || {};

	const OPERATOR = {
		ocean : t('airOceanTracking:tracking_csv_upload_controls_label_text_5'),
		air   : t('airOceanTracking:tracking_csv_upload_controls_label_text_6'),
	};

	const OPTION_MAPPING = {
		ocean : shippingLineData,
		air   : airLineData,
	};

	return (
		[
			{
				name       : 'fileValue',
				type       : 'file',
				uploadDesc : t('airOceanTracking:tracking_csv_upload_controls_label_1'),
				uploadIcon : <IcMAppDocumentUpload width={50} height={50} />,
				accept     : '.csv',
				width      : '100%',
			},
			{
				name  : 'operatorLine',
				label : `${OPERATOR[trackingType]}
				 ${t('airOceanTracking:tracking_csv_upload_controls_label_text_1')}`,
				type        : 'select',
				options     : OPTION_MAPPING[trackingType],
				placeholder : `${t('airOceanTracking:tracking_csv_upload_controls_label_text_2')}
				 ${OPERATOR[trackingType]} ${t('airOceanTracking:tracking_csv_upload_controls_label_text_3')}`,
				rules: {
					required: `${t('airOceanTracking:tracking_csv_upload_controls_label_text_4')} 
				${OPERATOR[trackingType]} ${t('airOceanTracking:tracking_csv_upload_controls_label_text_1')}`,
				},
				width: '50%',

			},
		]
	);
};

export default csvUploadControls;
