import adminConfig from './admin.json';
import bookingAgent from './bookingAgent.json';
import bookingDeskConfig from './bookingDesk.json';
import bookingDeskManagerConfig from './bookingDeskManager.json';
import costBookingManagerConfig from './costBookingManager.json';
import defaultConfig from './default.json';
import documentDeskConfig from './documentDesk.json';
import ffCostBooking from './ffCostBooking.json';
import prodProcessOwnerConfig from './prodProcessOwner.json';
import so1So2Ops from './so1So2Ops.json';
import superadminConfig from './superadmin.json';

const CONFIG_MAPPING = {
	superadmin                   : superadminConfig,
	account_receivable_executive : bookingAgent,
	booking_agent                : bookingAgent,
	admin                        : adminConfig,
	booking_desk                 : bookingDeskConfig,
	booking_desk_manager         : bookingDeskManagerConfig,
	document_desk                : documentDeskConfig,
	document_desk_manager        : documentDeskConfig,
	prod_process_owner           : prodProcessOwnerConfig,
	coe_head                     : adminConfig,
	credit_control               : adminConfig,
	cogo_auditor_id              : adminConfig,
	cost_booking_manager         : costBookingManagerConfig,
	so1_so2_ops                  : so1So2Ops,
	ff_cost_booking              : ffCostBooking,
	so1_revenue_desk             : ffCostBooking,
};

const stakeholderConfig = ({ stakeholder }) => CONFIG_MAPPING[stakeholder] || defaultConfig;

export default stakeholderConfig;
