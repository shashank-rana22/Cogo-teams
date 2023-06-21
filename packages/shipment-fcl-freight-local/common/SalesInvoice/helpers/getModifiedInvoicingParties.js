export default function getModifiedInvoicingParties({ invoicing_parties = [] }) {
	const invoicingParties = (invoicing_parties || []).map((ip) => {
		const ipServices = (ip?.services || []).map(
			(service, index) => ({
				...service,
				serviceKey: `${service?.service_id}:${ip?.id}:${index}`,
			}),
		);

		return { ...ip, services: ipServices };
	});

	return invoicingParties;
}
