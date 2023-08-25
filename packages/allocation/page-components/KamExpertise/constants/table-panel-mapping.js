import KamExpertiseScoreConfig from '../components/ExpertiseConfigurations/Tabs/KamExpertiseScore';
import KamLevel from '../components/ExpertiseConfigurations/Tabs/KamLevel';

export const CONSTANT_KEYS = {
	KAM_EXPERTISE_SCORE_CONFIG : 'kam-expertise-score-config',
	KAM_LEVEL_CONFIG           : 'kam-level-config',
};

const { KAM_EXPERTISE_SCORE_CONFIG, KAM_LEVEL_CONFIG } = CONSTANT_KEYS;

export const getTabPanelMapping = ({ t = () => {} }) => ({
	configurations: {
		name      : KAM_EXPERTISE_SCORE_CONFIG,
		title     : t('allocation:kam_expertise_score_config'),
		Component : KamExpertiseScoreConfig,
	},

	relations: {
		name      : KAM_LEVEL_CONFIG,
		title     : t('allocation:kam_level_config'),
		Component : KamLevel,
	},
});
