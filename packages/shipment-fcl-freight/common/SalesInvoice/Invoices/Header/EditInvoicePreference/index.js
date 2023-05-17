import { Button, Modal } from '@cogoport/components';
import React, { useState } from 'react';

import AddInvoicingParty from '../../../../AdditionalServices/components/AddIp/AddInvoicingParty';

import ListInvoicePreferences from './ListInvoicePreferences';
import styles from './styles.module.css';
import useEditInvoicePref from './useEditInvoicePref';

function EditInvoicePreference({
	shipment_data = {},
	invoicing_parties = [],
	refetch = () => {},
	isIE = false,
	disableAction = false,
}) {
	const [show, setShow] = useState(false);
	const [addInvoicingParty, setAddInvoicingParty] = useState(false);

	let invoiceParties = invoicing_parties;

	invoiceParties = invoicing_parties.map((ip) => {
		const ipService = (ip?.services || []).map((service, index) => ({
			...service,
			serviceKey: `${service?.service_id}:${ip?.is_igst}:${ip?.id}:${index}`,
		}));
		return { ...ip, services: ipService };
	});

	const {
		selectedParties,
		setSelectedParties,
		handleInvoicingPartyAdd,
		handleEditPreferences,
		...rest
	} = useEditInvoicePref({
		invoicing_parties: invoiceParties,
		shipment_data,
		setShow,
		refetch,
	});
	const organizationDetails = {
		id         : shipment_data?.importer_exporter?.id || undefined,
		country_id : shipment_data?.importer_exporter?.country_id || undefined,
	};
	if (shipment_data?.importer_exporter?.is_tax_applicable === null) {
		organizationDetails.is_tax_applicable = true;
	} else {
		organizationDetails.is_tax_applicable =			shipment_data?.importer_exporter?.is_tax_applicable;
	}

	const handleClose = () => {
		setSelectedParties(rest?.formattedIps);
		setShow(false);
		setAddInvoicingParty(false);
	};

	return (
		<div className="edit_invoice">
			<Button
				className="secondary sm"
				onClick={() => setShow(true)}
				disabled={disableAction}
			>
				Edit Invoice Preference
			</Button>

			{show ? (
				<Modal
					size="lg"
					themeType="secondary"
					show={show}
					onClose={() => handleClose()}
					onOuterClick={() => handleClose()}
					closable={!rest?.loading}
				>
					<Modal.Header title="EDIT INVOICING PREFERENCE" />
					<Modal.Body className={isIE ? 'ie' : ''}>
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
								invoicingParties={selectedParties}
								raw_invoicing_parties={invoiceParties}
								isIE={isIE}
								{...rest}
							/>

							{addInvoicingParty ? (
								<Modal
									size="lg"
									themeType="secondary"
									show={addInvoicingParty}
									onClose={() => setAddInvoicingParty(false)}
									onOuterClick={() => setAddInvoicingParty(false)}
								>
									<Modal.Header title="Add Invoicing Party" />
									<Modal.Body className={isIE ? 'ie' : ''}>
										<div className={styles.form}>
											<AddInvoicingParty
												shipmentData={shipment_data}
												organizationDetails={organizationDetails}
												updateInvoicingParty={(ip) => handleInvoicingPartyAdd(ip)}
												primary_service={shipment_data?.shipment_type}
												isIE={isIE}
											/>
										</div>
									</Modal.Body>
								</Modal>
							) : null}
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
				</Modal>
			) : null}
		</div>
	);
}

export default EditInvoicePreference;
