import fcl_cfs from './fcl-cfs.json';
import fcl_customs from './fcl-customs.json';
import ftl_freight from './ftl-freight.json';
import haulage_freight from './haulage-freight.json';
import ltl_freight from './ltl-freight.json';
import trailer_freight from './trailer-freight.json';

const getConfigs = (service_type) => {
	const configs = {

		'fcl-customs'           : fcl_customs,
		'haulage-freight'       : haulage_freight,
		'ftl-freight'           : ftl_freight,
		'trailer-freight'       : trailer_freight,
		'ltl-freight'           : ltl_freight,
		fcl_customs_service     : fcl_customs,
		haulage_freight_service : haulage_freight,
		trailer_freight_service : haulage_freight,
		ftl_freight_service     : ftl_freight,
		ltl_freight_service     : ltl_freight,
		fcl_cfs_service         : fcl_cfs,
	};

	return configs[service_type] || fcl_cfs;
};
export default getConfigs;
