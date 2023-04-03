import FinanceDashBoard from '../components/MainData/FinanceDashBoard';
import Profile from '../components/MainData/Profile';
import ServicesUsers from '../components/MainData/Services&Users';

const TAB_OPTION_MAPPING = {
	services_and_users: {
		key                : 'services_and_users',
		title              : 'Services and Users',
		containerComponent : ServicesUsers,
	},
	profile: {
		key                : 'profile',
		title              : 'Profile',
		containerComponent : Profile,
	},
	finance_dashboard: {
		key                : 'finance_dashboard',
		title              : 'Finance Dashboard',
		containerComponent : FinanceDashBoard,
	},

};

export default TAB_OPTION_MAPPING;
