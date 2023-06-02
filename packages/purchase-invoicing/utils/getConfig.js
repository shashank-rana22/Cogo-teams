import air_customs from '../constants/Services/air-customs.json';
import air_freight from '../constants/Services/air-freight.json';
import air_freight_local_service from '../constants/Services/air-local.json';
import allServices from '../constants/Services/all-services.json';
import fcl_cfs from '../constants/Services/fcl-cfs.json';
import fcl_customs from '../constants/Services/fcl-customs.json';
import fcl_freight from '../constants/Services/fcl-freight.json';
import fcl_freight_local_service from '../constants/Services/fcl-local.json';
import ftl_freight from '../constants/Services/ftl-freight.json';
import haulage_freight from '../constants/Services/haulage-freight.json';
import lcl_customs from '../constants/Services/lcl-customs.json';
import lcl_freight from '../constants/Services/lcl-freight.json';
import lcl_freight_local_service from '../constants/Services/lcl-local.json';
import ltl_freight from '../constants/Services/ltl-freight.json';
import trailer_freight from '../constants/Services/trailer-freight.json';

const getConfigs = (service) => {
	const configs = {
		fcl_freight,
		fcl_customs,
		haulage_freight,
		ftl_freight,
		trailer_freight,
		lcl_freight,
		lcl_customs,
		ltl_freight,
		air_freight,
		air_customs,
		fcl_freight_service                   : fcl_freight,
		fcl_customs_service                   : fcl_customs,
		origin_fcl_customs_service            : fcl_customs,
		destination_fcl_customs_service       : fcl_customs,
		haulage_freight_service               : haulage_freight,
		origin_trailer_freight_service        : trailer_freight,
		destination_trailer_freight_service   : trailer_freight,
		origin_ftl_freight_service            : ftl_freight,
		destination_ftl_freight_service       : ftl_freight,
		lcl_freight_service                   : lcl_freight,
		lcl_customs_service                   : lcl_customs,
		origin_lcl_customs_service            : lcl_customs,
		destination_lcl_customs_service       : lcl_customs,
		origin_ltl_freight_service            : ltl_freight,
		destination_ltl_freight_service       : ltl_freight,
		air_freight_service                   : air_freight,
		air_customs_service                   : air_customs,
		origin_air_customs_service            : air_customs,
		destination_air_customs_service       : air_customs,
		fcl_freight_local_service,
		origin_fcl_freight_local_service      : fcl_freight_local_service,
		destination_fcl_freight_local_service : fcl_freight_local_service,
		origin_fcl_cfs_service                : fcl_cfs,
		destination_fcl_cfs_service           : fcl_cfs,
		fcl_cfs_service                       : fcl_cfs,
		lcl_freight_local_service,
		origin_lcl_freight_local_service      : lcl_freight_local_service,
		destination_lcl_freight_local_service : lcl_freight_local_service,
		air_freight_local_service,
		origin_air_freight_local_service      : air_freight_local_service,
		destination_air_freight_local_service : air_freight_local_service,
	};

	return configs[service] || allServices;
};
export default getConfigs;
