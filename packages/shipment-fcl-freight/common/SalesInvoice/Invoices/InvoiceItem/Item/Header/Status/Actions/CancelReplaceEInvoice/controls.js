import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';

const controls = ({ type = '' }) => [
	{
		label       : `${startCase(type)} Reason`,
		name        : 'cancelReason',
		type        : 'textarea',
		placeholder : `Enter Your ${startCase(type)} Reason Here`,
		span        : 12,
		theme       : 'admin',
		className   : 'primary md',
		rules       : { required: 'Reason is required' },
	},
	{
		name       : 'documentUrls',
		label      : `${startCase(type)} Agreement file`,
		type       : 'file',
		drag       : 'true',
		span       : 12,
		uploadtype : 'aws',
		accept     : '.png,.pdf,.jpg,.jpeg,.doc,.docx',
		maxsize    : GLOBAL_CONSTANTS.options.upload_file_size['5MB'],
	},
];

export default controls;
