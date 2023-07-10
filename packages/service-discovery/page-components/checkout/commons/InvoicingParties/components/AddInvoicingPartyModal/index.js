import { Modal, Chips, Pill } from '@cogoport/components';
import { useState, useContext } from 'react';

import { CheckoutContext } from '../../../../context';

import SavedAddresses from './SavedAddresses';
import styles from './styles.module.css';

const COMPONENTS_MAPPING = {
	invoice_to_self: {
		label     : 'Self',
		component : SavedAddresses,
	},
	invoice_to_trade_partner: {
		label: (
			<div className={styles.flex}>
				Trade Partner
				{' '}
				<Pill size="md" color="#DDEBC0" style={{ color: '#6c8831' }}>
					OFFER
				</Pill>
			</div>
		),
		component: SavedAddresses,
	},
};

const CHIPS_OPTIONS = Object.entries(COMPONENTS_MAPPING).map(
	([key, value]) => ({ children: value.label, key }),
);

function AddInvoicingPartyModal({
	disabledInvoicingParties,
	isInvoicingPartiesSaved,
	setShowAddInvoicingPartyModal,
	showAddInvoicingPartyModal,
}) {
	const {
		orgData = {},
		primary_service,
		rate,
		conversions,
		detail = {},
		invoice = {},
	} = useContext(CheckoutContext);

	const [activeComponentKey, setActiveComponentKey] = useState(
		() => CHIPS_OPTIONS[0].value,
	);

	const componentProps = {
		invoice_to_self: {
			organization    : orgData?.data,
			primary_service,
			disabledParties : disabledInvoicingParties,
			// updateInvoicingParty,
			bookingType     : 'self',
			// onClose,
			// isIE,
			// setIgstValues,
			// source,
			// isOrgCountryInvoicesRequired,
		},
		invoice_to_trade_partner: {
			organization    : orgData?.data,
			primary_service,
			disabledParties : disabledInvoicingParties,
			// updateInvoicingParty,
			bookingType     : 'paying_party',
			// onClose,
			// setIgstValues,
			// source,
			// isOrgCountryInvoicesRequired,
		},
	};

	const ActiveComponent = COMPONENTS_MAPPING[activeComponentKey].component;
	const activeComponentProps = componentProps[activeComponentKey];

	return (
		<Modal
			show={showAddInvoicingPartyModal}
			size="xl"
			onClose={() => setShowAddInvoicingPartyModal(false)}
			className={styles.modal_container}
		>
			<Modal.Header title="Add Invoicing Party" />

			<Modal.Body>
				<div className={styles.flex}>
					<div className={styles.label}>Invoice To:</div>

					<Chips
						items={CHIPS_OPTIONS}
						selectedItems={activeComponentKey}
						onItemChange={setActiveComponentKey}
					/>

					<ActiveComponent key={activeComponentKey} {...activeComponentProps} />
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default AddInvoicingPartyModal;
