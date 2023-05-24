import PIPProbations from '../common/PIPProbations';
import UploadedFiles from '../common/PIPProbations/UploadedFiles';
import KPIFeedbacks from '../page-components/HRDashboard/TabComponents/KPIFeedbacks';
import PastStats from '../page-components/ManagerDashboard/TabComponents/PastStats';

const tabPanelComponentMapping = {
	hr_dashboard: [
		{ name: 'feedbacks', title: 'KPI Feedbacks', key: 'feedbacks', Component: KPIFeedbacks },
		{ name: 'pip', title: 'PIP', key: 'pip', Component: PIPProbations },
		{ name: 'probation', title: 'Probations', key: 'probation', Component: PIPProbations },
		{ name: 'uploaded_files', title: 'Uploaded Files', key: 'uploaded_files', Component: UploadedFiles },
	],
	manager_dashboard: [
		{ name: 'past_stats', title: 'KPI Feedbacks', key: 'feedbacks', Component: PastStats },
		{ name: 'pip', title: 'PIP', key: 'pip', Component: PIPProbations },
		{ name: 'probation', title: 'Probations', key: 'probation', Component: PIPProbations },
	],
};

export default tabPanelComponentMapping;
