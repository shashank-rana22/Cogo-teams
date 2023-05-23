import bookingAgent from './bookingAgent.json';
import superadminConfig from './superadmin.json';

const CONFIG_MAPPING = {
	superadmin    : superadminConfig,
	booking_agent : bookingAgent,
};

const stakeholderConfig = ({ stakeholder }) => CONFIG_MAPPING[stakeholder] || {};

export default stakeholderConfig;
