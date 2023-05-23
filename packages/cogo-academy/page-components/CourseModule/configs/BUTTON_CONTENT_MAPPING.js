import { IcMArrowRight, IcMDownload } from '@cogoport/icons-react';

const BUTTON_CONTENT__MAPPING = {
	ongoing: {
		secondaryBtnText : 'Curriculum',
		primaryBtnText   : 'Continue Learning',
		icon             : <IcMArrowRight width={16} height={16} />,
	},
	mandatory: {
		secondaryBtnText : 'Curriculum',
		primaryBtnText   : 'Visit Course',
		icon             : <IcMArrowRight width={16} height={16} />,
	},
	completed: {
		secondaryBtnText : 'Rewatch',
		primaryBtnText   : 'Download Certificate',
		icon             : <IcMDownload width={16} height={16} />,
	},
	saved: {},
};

export default BUTTON_CONTENT__MAPPING;
