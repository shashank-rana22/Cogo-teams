import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMEmail } from '@cogoport/icons-react';

const ICON_STYLE = {
	padding: '8px',
};

const getMailControls = () => {
	const controls = [
		{
			name  : 'mail_from',
			type  : 'text',
			label : 'From',
			rules : {
				required: {
					value   : true,
					message : 'This is Required',
				},
				validate: (value) => (value.match(GLOBAL_CONSTANTS.regex_patterns.email)
					? undefined : 'Invalid Email Address'),
			},
			suffix: <div style={ICON_STYLE}><IcMEmail width="20px" height="20px" /></div>,
		},
		{
			name  : 'mail_to',
			type  : 'text',
			label : 'To',
			rules : {
				required: {
					value   : true,
					message : 'This is Required',
				},
				validate: (value) => (value.match(GLOBAL_CONSTANTS.regex_patterns.email)
					? undefined : 'Invalid Email Address'),
			},
			suffix: <div style={ICON_STYLE}><IcMEmail width="20px" height="20px" /></div>,
		},
	];
	return controls;
};
export default getMailControls;
