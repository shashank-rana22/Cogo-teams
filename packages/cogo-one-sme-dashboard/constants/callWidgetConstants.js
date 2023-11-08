import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';

export const CALL_STATUS_MAPPING = {
	answered: {
		label : 'Call Successfully Answered',
		count : 'total_answered_calls',
		icon  : <Image
			src={GLOBAL_CONSTANTS.image_url.call_answered}
			height={26}
			width={26}
			alt="answered"
		/>,
		non_allocated : 'unallocated_answered_calls',
		allocated     : 'allocated_missed_calls',
	},
	missed: {
		label : 'Call Missed',
		count : 'total_missed_calls',
		icon  : <Image
			src={GLOBAL_CONSTANTS.image_url.call_missed}
			height={30}
			width={30}
			alt="missed"
		/>,
		non_allocated : 'unallocated_missed_calls',
		allocated     : 'allocated_missed_calls',
	},
};
