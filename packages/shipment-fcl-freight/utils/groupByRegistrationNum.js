export function groupByRegistrationNum(invoices = []) {
	const GROUP_BY_ORG_INVOICES = {};

	(invoices || []).forEach((invoice) => {
		const key = invoice?.billing_address?.registration_number;

		GROUP_BY_ORG_INVOICES[key] = {
			invoices      : [...(GROUP_BY_ORG_INVOICES[key]?.invoices || []), invoice],
			business_name : invoice?.billing_address?.business_name,
			name          : invoice?.billing_address?.name,
		};
	});

	return GROUP_BY_ORG_INVOICES;
}
