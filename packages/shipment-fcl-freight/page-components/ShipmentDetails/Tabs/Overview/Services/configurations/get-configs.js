import fcl_freight from './fcl-freight.json';
import fcl_customs from './fcl-customs.json';
import haulage_freight from './haulage-freight.json';
import ftl_freight from './ftl-freight.json';
import lcl_freight from './lcl-freight.json';
import lcl_customs from './lcl-customs.json';
import ltl_freight from './ltl-freight.json';
import air_freight from './air-freight.json';
import air_customs from './air-customs.json';
import trailer_freight from './trailer-freight.json';
import fcl_freight_local_service from './fcl-local.json';
import lcl_freight_local_service from './lcl-local.json';
import air_freight_local_service from './air-local.json';
import fcl_cfs from './fcl-cfs.json';
import domestic_air_freight from './domestic-air-freight.json';
import rail_domestic_freight from './rail-domestic-freight.json';

const getConfigs = (service_type) => {
	const configs = {
		'fcl-freight': fcl_freight,
		'fcl-customs': fcl_customs,
		'haulage-freight': haulage_freight,
		'ftl-freight': ftl_freight,
		'trailer-freight': trailer_freight,
		'lcl-freight': lcl_freight,
		'lcl-customs': lcl_customs,
		'ltl-freight': ltl_freight,
		'air-freight': air_freight,
		'air-customs': air_customs,
		fcl_freight_service: fcl_freight,
		fcl_customs_service: fcl_customs,
		haulage_freight_service: haulage_freight,
		trailer_freight_service: haulage_freight,
		ftl_freight_service: ftl_freight,
		lcl_freight_service: lcl_freight,
		lcl_customs_service: lcl_customs,
		ltl_freight_service: ltl_freight,
		air_freight_service: air_freight,
		air_customs_service: air_customs,
		fcl_freight_local_service,
		fcl_cfs_service: fcl_cfs,
		lcl_freight_local_service,
		air_freight_local_service,
		domestic_air_freight_service: domestic_air_freight,
		rail_domestic_freight_service: rail_domestic_freight,
	};

	return configs[service_type] || fcl_freight;
};
export default getConfigs;
