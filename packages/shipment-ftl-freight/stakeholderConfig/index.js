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
const LAST_VALUE_INDEX = -1;

const VIEW_MAPPING = {
	booking_agent_view : bookingAgent,
	service_ops1_view  : bookingDesk,
};

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

const stakeholderConfig = ({ stakeholder, authParams = '' }) => {
	if (stakeholder === 'kam_so1') {
		const view = authParams?.split(':')?.at(LAST_VALUE_INDEX);
		return VIEW_MAPPING[view] || {};
	}

	return CONFIG_MAPPING[stakeholder] || {};
};

export default stakeholderConfig;
