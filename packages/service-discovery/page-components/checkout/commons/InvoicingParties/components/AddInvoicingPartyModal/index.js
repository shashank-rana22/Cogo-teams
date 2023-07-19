import { Modal, Chips, Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
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
	isInvoicingPartiesSaved = true,
	setShowAddInvoicingPartyModal = () => {},
	showAddInvoicingPartyModal = false,
	source = '',
	services = [],
	rate = {},
	paymentModes = {},
	setPaymentModes = () => {},
	getCheckoutInvoices = () => {},
}) {
	const {
		orgData = {},
		primary_service,
	} = useContext(CheckoutContext);

	const [activeComponentKey, setActiveComponentKey] = useState(
		() => CHIPS_OPTIONS[GLOBAL_CONSTANTS.zeroth_index].key,
	);
	const [currentView, setCurrentView] = useState('select_address');
	const [activeState, setActiveState] = useState('view_billing_addresses');
	const [selectedAddress, setSelectedAddress] = useState({});

	const componentProps = {
		invoice_to_self: {
			organization : orgData?.data,
			primary_service,
			disabledInvoicingParties,
			bookingType  : 'self',
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
			bookingType  : 'paying_party',
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
							setCurrentView('select_address');
							setActiveState('view_billing_addresses');
						}}
					/>
				</div>

				<ActiveComponent
					key={activeComponentKey}
					setShowAddInvoicingPartyModal={setShowAddInvoicingPartyModal}
					services={services}
					rate={rate}
					paymentModes={paymentModes}
					setPaymentModes={setPaymentModes}
					getCheckoutInvoices={getCheckoutInvoices}
					{...activeComponentProps}
				/>
			</Modal.Body>
		</Modal>
	);
}

export default AddInvoicingPartyModal;
