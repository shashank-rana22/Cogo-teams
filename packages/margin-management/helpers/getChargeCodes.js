const chargeCodes = {
	fcl_freight     : ['fcl_freight_charges', 'fcl_freight_local_charges'],
	ftl_freight     : ['ftl_freight_charges'],
	haulage_freight : ['haulage_freight_charges'],
	fcl_customs     : ['fcl_customs_charges'],
	air_freight     : [
		'air_freight_charges',
		'air_freight_local_charges',
		'air_freight_surcharges',
		'air_freight_warehouse_charges',
	],
	air_customs : ['air_customs_charges'],
	lcl_freight : [
		'lcl_freight_charges',
		'lcl_freight_local_charges',
		'lcl_freight_surcharge_charges',
	],
	lcl_customs       : ['lcl_customs_charges'],
	ltl_freight       : ['ltl_freight_charges'],
	fcl_cfs           : ['fcl_cfs_charges'],
	fcl_freight_local : ['fcl_freight_local_charges'],
	lcl_freight_local : ['lcl_freight_local_charges'],
};

const getChargeCodesApi = async (service_name, trigger) => {
	try {
		const res = await trigger({ params: { service_name } });
		if (res.hasError) {
			return [];
		}
		return res?.data?.list || [];
	} catch (e) {
		return [];
	}
};
const getChargeCodes = async ({ setChargeCodes, service, trigger }) => {
	const ALL_PROMISES = [];
	(chargeCodes[service] || []).forEach((service_name) => {
		ALL_PROMISES.push(getChargeCodesApi(service_name, trigger));
	});
	Promise.all(ALL_PROMISES).then((values) => {
		const ALL_CHARGES = [];
		values.forEach((item) => {
			ALL_CHARGES.push(...(item || []));
		});
		setChargeCodes(ALL_CHARGES);
	});
};
export default getChargeCodes;
