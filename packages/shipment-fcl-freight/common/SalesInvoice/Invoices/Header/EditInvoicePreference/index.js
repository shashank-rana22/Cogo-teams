import { Button, Modal } from '@cogoport/components';
import React, { useState } from 'react';

import AddInvoicingParty from '../../../../AdditionalServices/components/AddIp/AddInvoicingParty';
import getModifiedInvoicingParties from '../../../helper/getModifiedInvoicingParties';

// import useEditInvoicePref from '../../../../../hooks/useEditInvoicePref';
import ListInvoicePreferences from './ListInvoicePreferences';
import styles from './styles.module.css';

function EditInvoicePreference({
	shipment_data = {},
	invoicing_parties = [],
	refetch = () => {},
	disableAction = false,
}) {
	const [show, setShow] = useState(false);
	const [addInvoicingParty, setAddInvoicingParty] = useState(false);

	const invoicingParties = getModifiedInvoicingParties({ invoicing_parties });

	// const {
	// 	selectedParties,
	// 	setSelectedParties,
	// 	handleInvoicingPartyAdd,
	// 	handleEditPreferences,
	// 	...rest
	// } = useEditInvoicePref({
	// 	invoicing_parties: invoiceParties,
	// 	shipment_data,
	// 	setShow,
	// 	refetch,
	// });
	const organizationDetails = {
		id         : shipment_data?.importer_exporter?.id || undefined,
		country_id : shipment_data?.importer_exporter?.country_id || undefined,
	};
	if (shipment_data?.importer_exporter?.is_tax_applicable === null) {
		organizationDetails.is_tax_applicable = true;
	} else {
		organizationDetails.is_tax_applicable =	shipment_data?.importer_exporter?.is_tax_applicable;
	}

	const handleClose = () => {
		// setSelectedParties(rest?.formattedIps);
		setShow(false);
		setAddInvoicingParty(false);
	};

	return (
		<>
			<Button
				className="secondary sm"
				onClick={() => setShow(true)}
				disabled={disableAction}
			>
				Edit Invoice Preference
			</Button>

			{show ? (
				<Modal
					show
					size="lg"
					onClose={handleClose}
					closeOnOuterClick={false}
				>
					<Modal.Header title="EDIT INVOICING PREFERENCE" />

					<Modal.Body>
						<div className={styles.form}>

							<Button
								size="md"
								onClick={() => setAddInvoicingParty(true)}
								style={{ width: '100%', marginBottom: '20px' }}
							>
								+ Add Invoicing Party
							</Button>

							<ListInvoicePreferences
								shipmentData={shipment_data}
							// invoicingParties={selectedParties}
								raw_invoicing_parties={invoicingParties}
							/>
						</div>
					</Modal.Body>
					<Modal.Footer>
						<Button
							style={{ marginRight: 16 }}
							className="secondary md"
							onClick={() => handleClose()}
						>
							Cancel
						</Button>

						<Button
							className=" primary md ie_submit_invoice_preference"
						>
							Submit
						</Button>

					</Modal.Footer>

					{addInvoicingParty ? (
						<Modal
							size="lg"
							themeType="secondary"
							show={addInvoicingParty}
							onClose={() => setAddInvoicingParty(false)}
							onOuterClick={() => setAddInvoicingParty(false)}
						>
							<Modal.Header title="Add Invoicing Party" />
							<Modal.Body>
								<div className={styles.form}>
									<AddInvoicingParty
										shipmentData={shipment_data}
										organizationDetails={organizationDetails}
										// updateInvoicingParty={(ip) => handleInvoicingPartyAdd(ip)}
										primary_service={shipment_data?.shipment_type}
									/>
								</div>
							</Modal.Body>
						</Modal>
					) : null}
				</Modal>
			) : null}
		</>

	);
}

export default EditInvoicePreference;
