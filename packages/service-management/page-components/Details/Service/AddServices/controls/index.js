import getCustoms from './getCustoms';
import getFreight from './getFreight';

const services = ({ organization_id = '' }) => {
	const SERVICES = {
		fcl_freight: getFreight({
			organization_id,
			params: {
				filters: {
					type: ['seaport', 'country', 'trade'],
				},
			},

		}),
		lcl_freight: getFreight({
			organization_id,
			params: {
				filters: {
					type: ['seaport', 'country', 'trade'],
				},
			},

		}),
		air_freight: getFreight({
			organization_id: {
				params: {
					filters: {
						type: ['airport', 'country', 'trade'],
					},
				},

			},
		}),
		haulage_freight: getFreight({
			organization_id,
			params: {
				filters: {
					type: ['cluster', 'seaport', 'airport', 'pincode'],
				},
			},

		}),
		fcl_customs: getCustoms({
			params: {
				filters: {
					type: ['seaport', 'country', 'trade'],
				},
			},
			organization_id,

		}),
		ftl_freight: getFreight({
			organization_id,
			params: {
				filters: {
					type: ['cluster', 'seaport', 'airport', 'pincode'],
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
					type: ['seaport', 'country', 'trade'],
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
					type: ['seaport', 'country', 'trade'],
				},
			},
		}),
		fcl_freight_local_agent: getCustoms({
			params: {
				filters: {
					type: ['seaport', 'country', 'trade'],
				},
			},
			organization_id,
		}),
		air_freight_local: getCustoms({
			organization_id,
			params: {
				filters: {
					type: ['airport', 'country', 'trade'],
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

export default services;
