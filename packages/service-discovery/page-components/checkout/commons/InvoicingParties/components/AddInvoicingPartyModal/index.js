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
	disabledInvoicingParties = [],
	isInvoicingPartiesSaved,
	setShowAddInvoicingPartyModal,
	showAddInvoicingPartyModal,
	source = '',
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
		() => CHIPS_OPTIONS[0].key,
	);
	const [currentView, setCurrentView] = useState('select_address');
	const [activeState, setActiveState] = useState('view_billing_addresses');
	const [selectedAddress, setSelectedAddress] = useState({});

	const componentProps = {
		invoice_to_self: {
			organization : orgData?.data,
			primary_service,
			disabledInvoicingParties,
			// updateInvoicingParty,
			bookingType  : 'self',
			// onClose,
			// isIE,
			// setIgstValues,
			// isOrgCountryInvoicesRequired,
			currentView,
			activeState,
			setActiveState,
			setCurrentView,
			selectedAddress,
			setSelectedAddress,
			source,
		},
		invoice_to_trade_partner: {
			organization : orgData?.data,
			primary_service,
			disabledInvoicingParties,
			// updateInvoicingParty,
			bookingType  : 'paying_party',
			// onClose,
			// setIgstValues,
			// isOrgCountryInvoicesRequired,
			currentView,
			activeState,
			setActiveState,
			setCurrentView,
			selectedAddress,
			setSelectedAddress,
			source,
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

			<Modal.Body style={{ maxHeight: '620px' }}>
				<div className={styles.flex}>
					<div className={styles.label}>Invoice To:</div>

					<Chips
						items={CHIPS_OPTIONS}
						selectedItems={activeComponentKey}
						onItemChange={(value) => {
							setActiveComponentKey(value);
							setSelectedAddress({});
						}}
					/>
				</div>

				<ActiveComponent key={activeComponentKey} {...activeComponentProps} />
			</Modal.Body>
		</Modal>
	);
}

export default AddInvoicingPartyModal;
