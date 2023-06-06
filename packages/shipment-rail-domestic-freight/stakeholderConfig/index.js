import adminConfig from './admin.json';
import bookingAgent from './bookingAgent.json';
import superadminConfig from './superadmin.json';

const CONFIG_MAPPING = {
	superadmin    : superadminConfig,
	booking_agent : bookingAgent,
	admin         : adminConfig,
};

const stakeholderConfig = ({ stakeholder }) => CONFIG_MAPPING[stakeholder] || {};

export default stakeholderConfig;
