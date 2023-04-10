import CreateModal from '../common/PIPProbations/PIPModals/CreateModal';
import LogModal from '../common/PIPProbations/PIPModals/LogModal';
import NotifyModal from '../common/PIPProbations/PIPModals/NotifyModal';
import PipUploadModal from '../common/PIPProbations/PIPModals/PipUploadModal';
import ReviewModal from '../common/PIPProbations/PIPModals/ReviewModal';
import UpdateModal from '../common/PIPProbations/PIPModals/UpdateModal';

const modalComoponentsMapping = {
	update: {
		name      : 'update',
		title     : 'Update',
		Component : UpdateModal,
	},
	upload: {
		name      : 'upload',
		title     : 'Upload CSV',
		Component : PipUploadModal,
	},
	kpi_tab_upload: {
		name      : 'kpi_tab_upload',
		title     : 'Upload CSV',
		Component : PipUploadModal,
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
