import FinanceDashBoard from '../components/FinanceDashBoard';
import Profile from '../components/Profile';
import ServicesUsers from '../components/Services&Users';

const TAB_OPTION_MAPPING = {
	services_and_users: {
		key                : 'services_and_users',
		// badgeCountKey      : 'spot_searches_count',
		title              : 'Services and users',
		containerComponent : ServicesUsers,
		// cardComponent      : SearchRateCard,
	},
	profile: {
		key                : 'profile',
		// badgeCountKey      : 'spot_searches_count',
		title              : 'Profile',
		containerComponent : Profile,
		// cardComponent      : SearchRateCard,
	},
	finance_dashboard: {
		key                : 'finance_dashboard',
		// badgeCountKey      : 'spot_searches_count',
		title              : 'Finance Dashboard',
		containerComponent : FinanceDashBoard,
		// cardComponent      : SearchRateCard,
	},
};

export default TAB_OPTION_MAPPING;
