import { Modal } from '@cogoport/components';
import React from 'react';

import useUpdateShipmentAdditionalService from '../../hooks/useUpdateShipmentAdditionalService';

import AddInvoicingParty from './AddInvoicingParty';
import styles from './styles.module.css';

function AddIp({
	shipment_data,
	showIp,
	item,
	setShowIp = () => {},
	refetch,
	updateInvoicingParty = () => {},
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

	// const updateResponse = useUpdateShipmentAdditionalService({
	// 	item,
	// 	setShowIp,
	// 	refetch,
	// 	showIp,
	// });

	return (
		<Modal
			size="xl"
			show={showIp}
			className={styles.ip_modal_container}
			onClose={() => setShowIp(null)}
			closable={false}
			placement="top"
			onOuterClick={() => setShowIp(null)}
		>
			<Modal.Header title="ADD INVOICING PARTY" />
			<Modal.Body>
				<AddInvoicingParty
					organizationDetails={organizationDetails}
					updateInvoicingParty={updateInvoicingParty}
				/>
			</Modal.Body>
		</Modal>
	);
}

export default AddIp;
