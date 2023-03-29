import NotifyModal from '../page-components/HRDashboard/NotifyModal';
import CreateModal from '../page-components/HRDashboard/TabComponents/PIPProbations/PIPModals/CreateModal';
import LogModal from '../page-components/HRDashboard/TabComponents/PIPProbations/PIPModals/LogModal';
import PipUloadModal from '../page-components/HRDashboard/TabComponents/PIPProbations/PIPModals/PipUploadModal';
import ReviewModal from '../page-components/HRDashboard/TabComponents/PIPProbations/PIPModals/ReviewModal';
import UpdateModal from '../page-components/HRDashboard/TabComponents/PIPProbations/PIPModals/UpdateModal';

const modalComoponentsMapping = {
	update: {
		name      : 'update',
		title     : 'Update',
		Component : UpdateModal,
	},
	upload: {
		name      : 'upload',
		title     : 'Upload CSV',
		Component : PipUloadModal,
	},
	kpi_tab_upload: {
		name      : 'kpi_tab_upload',
		title     : 'Upload CSV',
		Component : PipUloadModal,
	},
	create: {
		name      : 'create',
		title     : 'Create',
		Component : CreateModal,
	},
	logs: {
		name      : 'logs',
		title     : 'Logs',
		Component : LogModal,
	},
	review: {
		name      : 'review',
		title     : 'Review',
		Component : ReviewModal,
	},
	notify: {
		name      : 'notify',
		title     : 'Notify Managers',
		Component : NotifyModal,
	},
	manual_feedback: {
		name      : 'manual_feedback',
		title     : 'Manual Feedback',
		Component : CreateModal,
	},
};

export default modalComoponentsMapping;
