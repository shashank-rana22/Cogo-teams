import FileManagement from '../components/FileManagement';
import ManualEnrichment from '../components/ManualEnrichment';

const PRIMARY_TABS_MAPPING = {
	manual_enrichment: {
		key                : 'manual_enrichment',
		containerComponent : ManualEnrichment,
	},
	file_management: {
		key                : 'file_management',
		containerComponent : FileManagement,
	},

};

export default PRIMARY_TABS_MAPPING;
