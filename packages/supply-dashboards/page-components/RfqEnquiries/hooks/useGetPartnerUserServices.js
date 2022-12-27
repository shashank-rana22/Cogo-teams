const useGetPartnerUserServices = ({ partner_user = {} }) => {
	const OPTIONS = [];

	(partner_user.services || []).forEach((option) => {
		if (option === 'fcl_freight') {
			OPTIONS.push({ label: 'FCL', value: 'fcl_freight' });
		} else if (option === 'air_freight') {
			OPTIONS.push({
				label : 'AIR International',
				value : 'air_freight',
			});
		} else if (option === 'ftl_freight') {
			OPTIONS.push({ label: 'FTL', value: 'ftl_freight' });
		} else if (option === 'ltl_freight') {
			OPTIONS.push({ label: 'LTL', value: 'ltl_freight' });
		} else if (option === 'lcl_freight') {
			OPTIONS.push({ label: 'LCL', value: 'lcl_freight' });
		} else if (option === 'fcl_customs') {
			OPTIONS.push({ label: 'FCL Customs', value: 'fcl_customs' });
		} else if (option === 'lcl_customs') {
			OPTIONS.push({ label: 'LCL Customs', value: 'lcl_customs' });
		} else if (option === 'air_customs') {
			OPTIONS.push({ label: 'AIR Customs', value: 'air_customs' });
		} else if (option === 'haulage_freight') {
			OPTIONS.push({ label: 'Haulage Freight', value: 'haulage_freight' });
		} else if (option === 'trailer_freight') {
			OPTIONS.push({
				label : 'Trailer',
				value : 'trailer_freight',
			});
		} else if (option === 'fcl_cfs') {
			OPTIONS.push({ label: 'FCL Cfs', value: 'fcl_cfs' });
		}
	});

	return OPTIONS;
};
export default useGetPartnerUserServices;
