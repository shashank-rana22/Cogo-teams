import { Button, Modal } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import React, { useState, useContext } from 'react';

import useEditInvoicePref from '../../../../../hooks/useEditInvoicePref';
import AddInvoicingParty from '../../../../AdditionalServices/components/AddIp/AddInvoicingParty';
import getModifiedInvoicingParties from '../../../helpers/getModifiedInvoicingParties';

import ListInvoicePreferences from './ListInvoicePreferences';
import styles from './styles.module.css';

function EditInvoicePreference({
	invoicing_parties = [],
	bfInvoiceRefetch = () => {},
	disableAction = false,
	salesInvoicesRefetch = () => {},
}) {
	const { shipment_data } = useContext(ShipmentDetailContext);

	const [show, setShow] = useState(false);
	const [addInvoicingParty, setAddInvoicingParty] = useState(false);

	const invoicingParties = getModifiedInvoicingParties({ invoicing_parties });

	const refetchAfterApiCall = () => {
		salesInvoicesRefetch();
		bfInvoiceRefetch();
		setShow(false);
	};

	const { importer_exporter_id, country_id, is_tax_applicable } = shipment_data;

	const {
		selectedParties = [],
		setSelectedParties = () => {},
		handleInvoicingPartyAdd = () => {},
		handleEditPreferences = () => {},
		...rest
	} = useEditInvoicePref({
		invoicing_parties : invoicingParties,
		shipment_data,
		refetch           : refetchAfterApiCall,
	});

	const organizationDetails = {
		id                : importer_exporter_id || undefined,
		country_id        : country_id || undefined,
		is_tax_applicable : is_tax_applicable ?? true,
	};

	const handleClose = () => {
		setSelectedParties(rest?.formattedIps);
		setShow(false);
		setAddInvoicingParty(false);
	};

	return (
		<>
			<Button
				size="sm"
				onClick={() => setShow(true)}
				disabled={disableAction}
				themeType="secondary"
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

					<Modal.Body className={styles.form}>
						<div
							className={styles.full_width_btn}
							onClick={() => setAddInvoicingParty(true)}
							tabIndex={0}
							role="button"
						>
							+ Add Invoicing Party
						</div>

						<ListInvoicePreferences
							shipmentData={shipment_data}
							invoicingParties={selectedParties}
							raw_invoicing_parties={invoicingParties}
							{...rest}
						/>
					</Modal.Body>

					<Modal.Footer className={styles.modal_footer}>
						<Button
							size="md"
							themeType="tertiary"
							onClick={() => handleClose()}
						>
							Cancel
						</Button>

						<Button
							size="md"
							onClick={handleEditPreferences}
							disabled={rest?.loading}
						>
							Submit
						</Button>
					</Modal.Footer>

					{addInvoicingParty ? (
						<Modal
							size="xl"
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
										updateInvoicingParty={(ip) => {
											handleInvoicingPartyAdd(ip);
											setAddInvoicingParty(false);
										}}
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
