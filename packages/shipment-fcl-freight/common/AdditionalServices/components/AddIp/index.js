import { Modal } from '@cogoport/components';
import React from 'react';

import useUpdateShipmentAdditionalService from '../../../../hooks/useUpdateShipmentAdditionalService';

import AddInvoicingParty from './AddInvoicingParty';
import styles from './styles.module.css';

function AddIp({
	shipmentData,
	showIp,
	setShowIp = () => {},
	refetch,
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

	const refetchForUpdateSubService = () => {
		setShowIp(false);
		refetch();
	};

	const { updateInvoicingParty } = useUpdateShipmentAdditionalService({
		refetch: refetchForUpdateSubService,
		showIp,
	});

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
