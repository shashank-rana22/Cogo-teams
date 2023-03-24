import Dashboard from '../page-components/HRDashboard/TabComponents/PIPProbations/Dashboard';
import PendingReviews from '../page-components/HRDashboard/TabComponents/PIPProbations/PendingReviews';
import UploadedFiles from '../page-components/HRDashboard/TabComponents/PIPProbations/UploadedFiles';

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
	uploaded_files: {
		name      : 'uploaded_files',
		title    	: 'Uploaded Files',
		Component : UploadedFiles,
	},
};

export default tabPanelComponentMapping;
