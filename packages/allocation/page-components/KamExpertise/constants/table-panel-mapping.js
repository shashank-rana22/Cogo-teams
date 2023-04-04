import KamExpertiseScoreConfig from '../components/ExpertiseConfigurations/Tabs/KamExpertiseScore';
import KamLevel from '../components/ExpertiseConfigurations/Tabs/KamLevel';

const TAB_PANEL_MAPPING = {
	configurations: {
		name      : 'kam-expertise-score-config',
		title     : 'Kam Expertise Score Config',
		Component : KamExpertiseScoreConfig,
	},

	relations: {
		name      : 'kam-level-config',
		title     : 'Kam Level Config',
		Component : KamLevel,
	},
};
export default TAB_PANEL_MAPPING;
