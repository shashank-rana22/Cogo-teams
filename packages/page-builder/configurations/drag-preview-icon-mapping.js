import { IcMText } from '@cogoport/icons-react';

const DRAG_PREVIEW_ICON_MAPPING = {
	text: { icon: <IcMText width="34px" height="26px" fill="#ffffff" />, text: 'Text' },

	html: {
		icon: <img
			alt=""
			src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/svgviewer-png-output%20(9).png"
			width="42px"
			height="54px"
		/>,
		text: 'HTML',
	},

	divider: {
		icon: <img
			alt=""
			src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/svgviewer-png-output (12).png"
			width="32px"
			height="28px"
		/>,
		text: 'Divider',
	},

	button: {
		icon: <img
			alt=""
			src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/svgviewer-png-output%20(7).png"
			width="78px"
			height="54px"
		/>,
		text: 'Button',
	},

	carousel: {
		icon: <img
			alt=""
			src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/svgviewer-png-output%20(13).png"
			width="32px"
			height="28px"
		/>,
		text: 'Carousel',
	},

};

export default DRAG_PREVIEW_ICON_MAPPING;
