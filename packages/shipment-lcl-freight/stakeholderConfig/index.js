import superadminConfig from './superadmin.json';

const CONFIG_MAPPING = {
	superadmin: superadminConfig,
};

const stakeholderConfig = ({ stakeholder }) => CONFIG_MAPPING[stakeholder] || {};

export default stakeholderConfig;
