import COGOONE_ADMIN from './viewTypes/cogooneAdmin';
import CP_SUPPORT from './viewTypes/cpSupport';
import CREDIT_CONTROLLER from './viewTypes/creditController';
import DEFAULT from './viewTypes/default';
import MARKETING from './viewTypes/marketing';
import SALES from './viewTypes/sales';
import SALES_ADMIN from './viewTypes/salesAdmin';
import SHIPMENT_SPECIALIST from './viewTypes/shipmentSpecialist';
import SHIPMENT_SPECIALIST_ADMIN from './viewTypes/shipmentSpecialistAdmin';
import SUPPLY from './viewTypes/supply';
import SUPPLY_ADMIN from './viewTypes/supplyAdmin';
import SUPPORT from './viewTypes/support';
import SUPPORT_ADMIN from './viewTypes/supportAdmin';

export const VIEW_TYPE_GLOBAL_MAPPING = {
	sales                     : SALES,
	sales_admin               : SALES_ADMIN,
	support                   : SUPPORT,
	support_admin             : SUPPORT_ADMIN,
	supply                    : SUPPLY,
	supply_admin              : SUPPLY_ADMIN,
	shipment_specialist       : SHIPMENT_SPECIALIST,
	shipment_specialist_admin : SHIPMENT_SPECIALIST_ADMIN,
	cogoone_admin             : COGOONE_ADMIN,
	cp_support                : CP_SUPPORT,
	marketing                 : MARKETING,
	default                   : DEFAULT,
	credit_controller         : CREDIT_CONTROLLER,
};
