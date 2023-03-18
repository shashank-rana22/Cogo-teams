import React from 'react';

import useAddInvoicingParty from '../AddRate/useAddInvoicingParty';

import AddInvoicingParty from './AddInvoicingParty';
import styles from './styles.module.css';

function AddIp({
	shipment_data,
	showIp,
	item,
	setShowIp = () => {},
	refetch,
}) {
	const organizationDetails = {
		id         : shipment_data?.importer_exporter?.id || undefined,
		country_id : shipment_data?.importer_exporter?.country_id || undefined,
	};
	if (shipment_data?.importer_exporter?.is_tax_applicable === null) {
		organizationDetails.is_tax_applicable = true;
	} else {
		organizationDetails.is_tax_applicable =	shipment_data?.importer_exporter?.is_tax_applicable;
	}

	const update_response = useAddInvoicingParty({
		item,
		setShowIp,
		refetch,
		showIp,
	});

	return (
		<div className={styles.container}>
			<AddInvoicingParty
				organizationDetails={organizationDetails}
				updateInvoicingParty={(ip) => update_response.handleInvoicingParty(ip)}
			/>
		</div>
	);
}

export default AddIp;
