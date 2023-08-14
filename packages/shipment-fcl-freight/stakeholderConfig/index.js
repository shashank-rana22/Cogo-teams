import defaultConfig from './defaultView.json';
import igmConfig from './igmView.json';

const CONFIG_MAPPING = {
	DEFAULT_VIEW : defaultConfig,
	IGM_VIEW     : igmConfig,
};

const stakeholderConfig = ({ stakeholder }) => CONFIG_MAPPING[stakeholder] || {};

export default stakeholderConfig;
