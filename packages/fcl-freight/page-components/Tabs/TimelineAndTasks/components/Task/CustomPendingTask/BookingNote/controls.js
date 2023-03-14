const controls = [
	{
		name: 'service_provider_id',
		type: 'supplier-select',
		valueKey: 'service_provider_id',
		rules: { required: 'This is required' },
		className: 'primary sm',
	},
	{
		name: 'booking_reference_number',
		label: 'Booking Reference Number',
		type: 'text',
		className: 'primary sm',
		placeholder: 'Type here...',
	},
];

export const fileUrls = [
	{
		name: 'file_urls',
		type: 'file',
		rules: { required: 'This file is required' },
		showLabel: false,
		span: 12,
		themeType: 'secondary',
		height: 60,
		drag: true,
		uploadIcon: 'ic-upload',
		label: '',
		multiple: true,
		accept:
			'image/*,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		uploadType: 'aws',
	},
];

export default controls;
