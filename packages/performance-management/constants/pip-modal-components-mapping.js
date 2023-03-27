import CreateModal from '../page-components/HRDashboard/TabComponents/PIPProbations/PIPModals/CreateModal';
import LogModal from '../page-components/HRDashboard/TabComponents/PIPProbations/PIPModals/LogModal';
import PipUloadModal from '../page-components/HRDashboard/TabComponents/PIPProbations/PIPModals/PipUploadModal';
import ReviewModal from '../page-components/HRDashboard/TabComponents/PIPProbations/PIPModals/ReviewModal';
import UpdateModal from '../page-components/HRDashboard/TabComponents/PIPProbations/PIPModals/UpdateModal';

const pipModalComoponentsMapping = {
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
};

export default pipModalComoponentsMapping;
