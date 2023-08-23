import { IcMArrowRight, IcMArrowLeft } from '@cogoport/icons-react';

import tourStyles from './tourStyles.module.css';

export const TOUR_COMMON_PROPS = {
	startAt       : 0,
	closeWithMask : false,
	maskClassName : tourStyles.tour_mask,
	nextButton    : <span><IcMArrowRight height={25} width={25} /></span>,
	prevButton    : <span><IcMArrowLeft height={25} width={25} /></span>,
	rounded       : 10,
	showNumber    : false,
};
