import adminConfig from './admin';
import bookingAgent from './bookingAgent';
import bookingDesk from './bookingDesk';
import bookingDeskManager from './bookingDeskManager';
import coeFinanceOwners from './coeFinanceOwners';
import documentDesk from './documentDesk';
import documentDeskManager from './documentDeskManager';
import fieldExecutiveAgent from './fieldExecutiveAgent';
import ftlGroundOps from './ftlGroundOps';
import processOwners from './processOwners';
import superadminConfig from './superadmin';

// can_reassign_task = ['superadmin', 'tech_super_admin', 'prod_process_owner', 'admin'];
const CONFIG_MAPPING = {
	superadmin            : superadminConfig,
	booking_agent         : bookingAgent,
	admin                 : adminConfig,
	booking_desk          : bookingDesk,
	booking_desk_manager  : bookingDeskManager,
	document_desk         : documentDesk,
	document_desk_manager : documentDeskManager,
	corporate_owner       : processOwners,
	prod_process_owner    : processOwners,
	service_ops3          : coeFinanceOwners,
	ftl_ground_ops        : ftlGroundOps,
	field_service_ops     : fieldExecutiveAgent,
};

const stakeholderConfig = ({ stakeholder }) => CONFIG_MAPPING[stakeholder] || {};

export default stakeholderConfig;
