import Dashboard from '../common/PIPProbations/Dashboard';
import PendingReviews from '../common/PIPProbations/PendingReviews';

const subTabPanelComponentMapping = {
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

export default subTabPanelComponentMapping;
