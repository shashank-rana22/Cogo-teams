import { Modal, Button } from '@cogoport/components';
import React from 'react';

import AddInvoicingParty from './AddInvoicingParty';
import styles from './styles.module.css';

function AddIp({
	shipmentData = {},
	setShowIp = () => {},
	updateInvoicingParty = () => {},
}) {
	const organizationDetails = {
		id         : shipmentData?.importer_exporter?.id || undefined,
		country_id : shipmentData?.importer_exporter?.country_id || undefined,
	};

	if (shipmentData?.importer_exporter?.is_tax_applicable === null) {
		organizationDetails.is_tax_applicable = true;
	} else {
		organizationDetails.is_tax_applicable =	shipmentData?.importer_exporter?.is_tax_applicable;
	}

	return (
		<Modal
			size="xl"
			show
			className={styles.ip_modal_container}
			onClose={() => setShowIp(false)}
			closeOnOuterClick={false}
		>
			<Modal.Header title="ADD INVOICING PARTY" />

			<Modal.Body>
				<AddInvoicingParty
					organizationDetails={organizationDetails}
					updateInvoicingParty={updateInvoicingParty}
				/>
			</Modal.Body>

			<Modal.Footer>
				<Button onClick={() => setShowIp(false)}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default AddIp;
