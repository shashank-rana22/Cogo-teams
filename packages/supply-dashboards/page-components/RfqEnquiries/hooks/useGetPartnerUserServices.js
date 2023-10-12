const OPTION_MAPPING = {
	fcl_freight       : { label: 'FCL', value: 'fcl_freight' },
	lcl_freight       : { label: 'LCL', value: 'lcl_freight' },
	air_freight       : { label: 'AIR', value: 'air_freight' },
	fcl_freight_local : { label: 'FCL Local', value: 'fcl_freight_local' },
	lcl_freight_local : { label: 'LCL Local', value: 'lcl_freight_local' },
};

const useGetPartnerUserServices = ({ partner_user = {} }) => {
	const OPTIONS = [];
	OPTIONS.push({ value: undefined, label: 'ALL' });

	(partner_user.services || []).forEach((option) => {
		if (OPTION_MAPPING[option]) {
			OPTIONS.push(OPTION_MAPPING[option]);
		}
	});

	return OPTIONS;
};
export default useGetPartnerUserServices;
