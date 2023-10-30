function billingPartyRejectCheckboxList(
	{
		entityCode,
		organizationNameBuyer,
		address,
		registrationNumberBuyer,
		taxNumberBuyer,
	},
) {
	return [
		{ name: 'Entity', value: 'Entity', label: `Entity - ${entityCode} - ${organizationNameBuyer}` },
		{ name: 'Address', value: 'Address', label: `Address - ${address}` },
		{
			name      : 'PAN Number',
			value     : 'PAN Number',
			label     : `PAN Number - ${registrationNumberBuyer}`,
			detectKey : 'bp_tax_number',
		},
		{
			name      : 'GST Number',
			value     : 'GST Number',
			label     : `GST Number - ${taxNumberBuyer}`,
			detectKey : 'bp_tax_number',
		},
	];
}
export default billingPartyRejectCheckboxList;
