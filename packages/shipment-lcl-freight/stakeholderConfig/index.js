import adminConfig from './admin.json';
import bookingAgent from './bookingAgent.json';
import superadminConfig from './superadmin.json';

// can_reassign_task = ['superadmin', 'tech_super_admin', 'prod_process_owner', 'admin'];
const CONFIG_MAPPING = {
	superadmin        : superadminConfig,
	booking_agent     : bookingAgent,
	admin             : adminConfig,
	operation_manager : superadminConfig,
	coe_head          : adminConfig,
};

const stakeholderConfig = ({ stakeholder }) => CONFIG_MAPPING[stakeholder] || {};

export default stakeholderConfig;
