import { Modal, Button } from '@cogoport/components';
import React from 'react';

import AddInvoicingParty from './AddInvoicingParty';
import styles from './styles.module.css';

function AddIp({
	shipmentData = {},
	setShowIp = () => {},
	updateInvoicingParty = () => {},
}) {
	const { importer_exporter: { id, country_id, is_tax_applicable } = {} } = shipmentData;
	const organizationDetails = {
		id                : id || undefined,
		country_id        : country_id || undefined,
		is_tax_applicable : is_tax_applicable ?? true,
	};

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
