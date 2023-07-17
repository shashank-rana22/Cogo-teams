import { IcMLocation, IcMProfile } from '@cogoport/icons-react';

import AddressDetails from '../components/MainData/AddressDetails';
import UserDetails from '../components/MainData/UserDetails';

const TAB_OPTION_MAPPING = {
	user: {
		key                : 'user',
		title              : 'Point Of Contacts',
		icon               : IcMProfile,
		containerComponent : UserDetails,
	},
	address: {
		key                : 'address',
		title              : 'Address Details',
		icon               : IcMLocation,
		containerComponent : AddressDetails,
	},

};

export default TAB_OPTION_MAPPING;
