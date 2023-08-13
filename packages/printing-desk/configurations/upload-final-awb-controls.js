import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMUpload } from '@cogoport/icons-react';

const controls = [
	{
		name        : 'remark',
		label       : 'Document Description (optional)',
		type        : 'textarea',
		span        : 12,
		maxLength   : 150,
		placeholder : 'Remarks',
		rows        : 3,
		style       : { maxHeight: '120px', border: '1px solid #BDBDBD', borderRadius: 4 },

	},
	{
		name        : 'hawbCount',
		label       : 'Numbers of HAWBs Included in Shipment',
		type        : 'number',
		span        : 12,
		maxLength   : 150,
		placeholder : 'Number Of HAWB Included',
		rows        : 3,
		style       : { maxHeight: '120px', border: '1px solid #BDBDBD', borderRadius: 4 },
		rules       : { required: true },

	},
	{
		name       : 'document',
		label      : 'Document',
		type       : 'file',
		drag       : true,
		span       : 8,
		maxSize    : GLOBAL_CONSTANTS.options.upload_file_size['1MB'],
		uploadType : 'aws',
		height     : '88',
		uploadIcon : <IcMUpload height={40} width={40} />,
		style      : { boxShadow: '0px 0px 8px rgba(98, 127, 172, 0.2)', borderRadius: 4 },
		accept     : '.png,.pdf,.jpg,.jpeg,.doc,.docx',
		rules      : { required: true },
	},
];
export default controls;
