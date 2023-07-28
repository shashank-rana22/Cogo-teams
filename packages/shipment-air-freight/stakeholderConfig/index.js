import adminConfig from './admin.json';
import bookingAgent from './bookingAgent.json';
import bookingDeskConfig from './bookingDesk.json';
import bookingDeskManagerConfig from './bookingDeskManager.json';
import documentDeskConfig from './documentDesk.json';
import documentDeskManagerConfig from './documentDeskManager.json';
import prodProcessOwnerConfig from './prodProcessOwner.json';
import superadminConfig from './superadmin.json';

const CONFIG_MAPPING = {
	superadmin            : superadminConfig,
	booking_agent         : bookingAgent,
	admin                 : adminConfig,
	booking_desk          : bookingDeskConfig,
	booking_desk_manager  : bookingDeskManagerConfig,
	document_desk         : documentDeskConfig,
	document_desk_manager : documentDeskManagerConfig,
	prod_process_owner    : prodProcessOwnerConfig,
	coe_head              : adminConfig,
	credit_control        : adminConfig,
};

const stakeholderConfig = ({ stakeholder }) => CONFIG_MAPPING[stakeholder] || {};

export default stakeholderConfig;
