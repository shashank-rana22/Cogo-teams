import { cfsColumns } from './servicewise-columns/cfs-columns';
import { chaColumns } from './servicewise-columns/cha-columns';
import { fclColumns } from './servicewise-columns/fcl-columns';
import { trailerColumns } from './servicewise-columns/trailer-controls';

export const columns = ({ setShow, service_type }) => {
	const SERVICE_COLUMNS_MAPPING = {
		fcl_freight             : fclColumns,
		lcl_freight             : fclColumns,
		ftl_freight             : trailerColumns,
		ltl_freight             : trailerColumns,
		air_freight             : trailerColumns,
		trailer_freight         : trailerColumns,
		haulage_freight         : trailerColumns,
		rail_domestic_freight   : trailerColumns,
		fcl_freight_local_agent : trailerColumns,
		air_customs             : chaColumns,
		air_freight_local       : trailerColumns,
		fcl_customs             : chaColumns,
		lcl_customs             : chaColumns,
		fcl_cfs                 : cfsColumns,
	};

	return SERVICE_COLUMNS_MAPPING[service_type]({ setShow, service_type });
};
