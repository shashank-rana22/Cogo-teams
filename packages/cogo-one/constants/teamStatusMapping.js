import {
	IcCFtick, IcMCrossInCircle, IcCWaitForSometime, IcMMinusInCircle,
	IcMDummyCircle,
} from '@cogoport/icons-react';

export const USER_CURRENT_STATUS_WITH_ICON_MAPPING = {
	available: {
		status : 'Available',
		icon   : <IcCFtick />,
	},
	busy: {
		status : 'Busy',
		icon   : <IcMDummyCircle fill="#EE3425" />,
	},
	do_not_dusturb: {
		status : 'Do Not Disturb',
		icon   : <IcMMinusInCircle fill="#EE3425" />,
	},
	be_right_back: {
		status : 'Be Right Back',
		icon   : <IcCWaitForSometime />,
	},
	appear_away: {
		status : 'Appear Away',
		icon   : <IcCWaitForSometime />,
	},
	appear_offline: {
		status : 'Appear Offline',
		icon   : <IcMCrossInCircle fill="#828282" />,
	},
};
