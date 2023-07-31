function billingPartyRejectCheckboxList(
	entityCode,
	organizationNameBuyer,
	address,
	registrationNumberBuyer,
	taxNumberBuyer,
) {
	return [
		{ name: 'Entity', value: 'Entity', label: `Entity - ${entityCode} - ${organizationNameBuyer}` },
		{ name: 'Address', value: 'Address', label: `Address - ${address}` },
		{ name: 'PAN Number', value: 'PAN Number', label: `PAN Number - ${registrationNumberBuyer}` },
		{ name: 'GST Number', value: 'GST Number', label: `GST Number - ${taxNumberBuyer}` },
	];
}
export default billingPartyRejectCheckboxList;
