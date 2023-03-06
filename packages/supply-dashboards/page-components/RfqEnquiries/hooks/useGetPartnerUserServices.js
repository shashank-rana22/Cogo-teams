const useGetPartnerUserServices = ({ partner_user = {} }) => {
	const OPTIONS = [];
	OPTIONS.push({ value: undefined, label: 'ALL' });

	(partner_user.services || []).forEach((option) => {
		if (option === 'fcl_freight') {
			OPTIONS.push({ label: 'FCL', value: 'fcl_freight' });
		} else if (option === 'air_freight') {
			OPTIONS.push({
				label : 'AIR',
				value : 'air_freight',
			});
		} else if (option === 'lcl_freight') {
			OPTIONS.push({ label: 'LCL', value: 'lcl_freight' });
		}
	});

	return OPTIONS;
};
export default useGetPartnerUserServices;
