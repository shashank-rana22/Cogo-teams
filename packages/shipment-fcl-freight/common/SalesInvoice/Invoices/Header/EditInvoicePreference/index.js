import { Button, Modal } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useState, useContext } from 'react';

import useEditInvoicePref from '../../../../../hooks/useEditInvoicePref';
import AddInvoicingParty from '../../../../AdditionalServices/components/AddIp/AddInvoicingParty';
import getModifiedInvoicingParties from '../../../helpers/getModifiedInvoicingParties';

import ListInvoicePreferences from './ListInvoicePreferences';
import styles from './styles.module.css';

function EditInvoicePreference({
	invoicing_parties = [],
	disableAction = false,
	refetch = () => {},
}) {
	const { shipment_data, primary_service, servicesList } = useContext(ShipmentDetailContext);

	const [show, setShow] = useState(false);
	const [addInvoicingParty, setAddInvoicingParty] = useState(false);

	const invoicingParties = getModifiedInvoicingParties({ invoicing_parties });

	const refetchAfterApiCall = () => {
		refetch();
		setShow(false);
	};

	const {
		importer_exporter_id = '',
		country_id = '',
		is_tax_applicable = true,
		is_job_closed_financially = false,
		consignee_shipper_id = '',
		stakeholders = [],
		end_to_end_shipment = {},
		shipment_type = '',
	} = shipment_data || {};

	const {
		selectedParties = [],
		setSelectedParties = () => {},
		handleInvoicingPartyAdd = () => {},
		handleEditPreferences = () => {},
		...rest
	} = useEditInvoicePref({
		servicesList,
		invoicing_parties : invoicingParties,
		shipment_data,
		primary_service,
		refetch           : refetchAfterApiCall,
	});

	const organizationDetails = {
		id: (end_to_end_shipment?.is_possible
			&& ['origin_booking_agent', 'destination_booking_agent'].includes(
				stakeholders[GLOBAL_CONSTANTS.zeroth_index]?.stakeholder_type,
			))
			? consignee_shipper_id
			: importer_exporter_id || undefined,
		country_id: country_id || undefined,
		is_tax_applicable,
	};

	const handleClose = () => {
		setSelectedParties(rest?.formattedIps);
		setShow(false);
		setAddInvoicingParty(false);
	};

	const disableOnProcessing = (selectedParties || []).some((obj) => obj?.processing);

	return (
		<>
			<Button
				size="sm"
				onClick={() => setShow(true)}
				disabled={is_job_closed_financially || disableAction || disableOnProcessing}
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
							themeType="secondary"
							onClick={() => handleClose()}
							disabled={rest?.loading}
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
										primary_service={shipment_type}
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
