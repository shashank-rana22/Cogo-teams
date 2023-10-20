import ADMIN from './viewTypes/admin';
import COGOONE_ADMIN from './viewTypes/cogooneAdmin';
import CP_SUPPORT from './viewTypes/cpSupport';
import CREDIT_CONTROLLER from './viewTypes/creditController';
import DEFAULT from './viewTypes/default';
import HR from './viewTypes/hr';
import MARKETING from './viewTypes/marketing';
import SALES from './viewTypes/sales';
import SALES_ADMIN from './viewTypes/salesAdmin';
import SERVICE_OPS from './viewTypes/serviceOps';
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
	finance                   : CREDIT_CONTROLLER,
	admin                     : ADMIN,
	hr                        : HR,
	service_ops               : SERVICE_OPS,
};
