// import AddInvoicingParty from '@cogoport/business-modules/components/AddInvoicingParty';
import React from 'react';

import styles from './styles.module.css';

function AddIp({ shipment_data, handleInvoicingParty = () => {} }) {
	const organizationDetails = {
		id         : shipment_data?.importer_exporter?.id || undefined,
		country_id : shipment_data?.importer_exporter?.country_id || undefined,
	};
	if (shipment_data?.importer_exporter?.is_tax_applicable === null) {
		organizationDetails.is_tax_applicable = true;
	} else {
		organizationDetails.is_tax_applicable =			shipment_data?.importer_exporter?.is_tax_applicable;
	}

	return (
		<div className={styles.container}>
			{/* <AddInvoicingParty
				organizationDetails={organizationDetails}
				updateInvoicingParty={(ip) => handleInvoicingParty(ip)}
				withModal={false}
			/> */}
		</div>
	);
}

export default AddIp;
