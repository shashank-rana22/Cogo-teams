import Dashboard from '../page-components/HRDashboard/TabComponents/PIPProbations/Dashboard';
import PendingReviews from '../page-components/HRDashboard/TabComponents/PIPProbations/PendingReviews';

const tabPanelComponentMapping = {
	dashboard: {
		name      : 'dashboard',
		title     : 'Dashboard',
		Component : Dashboard,
	},
	pending_reviews: {
		name      : 'pending_reviews',
		title     : 'Pending Reviews',
		Component : PendingReviews,
	},
};

export default tabPanelComponentMapping;
