import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';

const ICON_MAPPING = {
	asc: {
		setSort   : 'desc',
		Component : IcMArrowRotateUp,
	},
	desc: {
		setSort   : 'asc',
		Component : IcMArrowRotateDown,
	},
};

export default ICON_MAPPING;
