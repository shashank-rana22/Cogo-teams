import getCustoms from './getCustoms';
import getFreight from './getFreight';

const OCEAN = ['seaport', 'country', 'trade'];
const AIR = ['airport', 'country', 'trade'];
const SURFACE = ['cluster', 'seaport', 'airport', 'pincode'];

const getServices = ({ organization_id = '' }) => {
	const SERVICES = {
		fcl_freight: getFreight({
			organization_id,
			params: {
				filters: {
					type: OCEAN,
				},
			},

		}),
		lcl_freight: getFreight({
			organization_id,
			params: {
				filters: {
					type: OCEAN,
				},
			},

		}),
		air_freight: getFreight({
			organization_id,
			params: {
				filters: {
					type: AIR,
				},
			},

		}),
		haulage_freight: getFreight({
			organization_id,
			params: {
				filters: {
					type: SURFACE,
				},
			},

		}),
		fcl_customs: getCustoms({
			params: {
				filters: {
					type: OCEAN,
				},
			},
			organization_id,

		}),
		ftl_freight: getFreight({
			organization_id,
			params: {
				filters: {
					type: SURFACE,
				},
			},

		}),
		ltl_freight: getFreight({
			organization_id,
			params: {
				filters: {
					type: ['cluster', 'city', 'pincode'],
				},
			},

		}),
		lcl_customs: getCustoms({
			params: {
				filters: {
					type: OCEAN,
				},
			},
			organization_id,
		}),
		air_customs: getCustoms({
			organization_id,
			params: {
				filters: {
					type: ['airport', 'country'],
				},
			},
		}),
		fcl_cfs: getCustoms({
			organization_id,
			params: {
				filters: {
					type: OCEAN,
				},
			},
		}),
		fcl_freight_local_agent: getCustoms({
			params: {
				filters: {
					type: OCEAN,
				},
			},
			organization_id,
		}),
		air_freight_local: getCustoms({
			organization_id,
			params: {
				filters: {
					type: AIR,
				},
			},
		}),
		rail_domestic_freight: getFreight({
			organization_id,
			params: {
				filters: {
					type: ['railway_terminal'],
				},
			},
		}),
	};
	return SERVICES;
};

export default getServices;
