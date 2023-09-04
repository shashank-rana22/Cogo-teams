import { useContext, useState } from 'react';

import { CheckoutContext } from '../../../../../../../context';
import useListOrganizationInvoicingParties from '../../../../../hooks/useListOrganizationInvoicingParties';

import CreateBillingAddress from './components/CreateBillingAddress';
import CreateNewInvoicingParty from './components/CreateNewInvoicingParty';
import ViewBillingAddresses from './components/ViewBillingAddresses';
import styles from './styles.module.css';

const COMPONENT_MAPPING = {
	view_billing_addresses : ViewBillingAddresses,
	create_billing_address : CreateBillingAddress,
	create_trade_party     : CreateNewInvoicingParty,
};

function AddNewItem({
	bookingType = '',
	setActiveState = () => {},
	organization_trade_party_id = '',
	setInvoiceToTradePartyDetails = () => {},
}) {
	if (bookingType === 'self') {
		return (
			<div
				role="presentation"
				onClick={() => {
					setActiveState('create_billing_address');

					setInvoiceToTradePartyDetails((previousState) => ({
						...previousState,
						tradePartyId: organization_trade_party_id,
					}));
				}}
				className={styles.add_container}
			>
				+ ADD NEW ADDRESS
			</div>
		);
	}

	return (
		<div
			role="presentation"
			onClick={() => {
				setActiveState('create_trade_party');
			}}
			className={styles.add_container}
		>
			+ ADD NEW TRADE PARTY
		</div>
	);
}

function SelectAddress({
	bookingType = '',
	disabledInvoicingParties = [],
	activeState = '',
	setActiveState = () => {},
	setSelectedAddress = () => {},
	source = '',
	setCurrentView = () => {},
}) {
	const { orgData = {} } = useContext(CheckoutContext);

	const [invoiceToTradePartyDetails, setInvoiceToTradePartyDetails] = useState(
		{},
	);

	const {
		id: organizationId = '',
		is_tax_applicable = false,
		organization_trade_party_id = '',
	} = orgData || {};

	const { data = {}, loading, trigger } = useListOrganizationInvoicingParties({
		organizationId,
		bookingType,
	});

	const componentProps = {
		view_billing_addresses: {
			bookingType,
			is_tax_applicable,
			disabledInvoicingParties,
			organization: orgData,
			setActiveState,
			setSelectedAddress,
			setInvoiceToTradePartyDetails,
			loading,
			data,
			setCurrentView,
		},
		create_billing_address: {
			organization: orgData,
			setActiveState,
			invoiceToTradePartyDetails,
			setInvoiceToTradePartyDetails,
			source,
			trigger,
		},
		create_trade_party: {
			organization: orgData,
			setActiveState,
			source,
			trigger,
		},
	};

	const ActiveComponent = COMPONENT_MAPPING[activeState];
	const activeComponentprops = componentProps[activeState];

	return (
		<div>
			{activeState === 'view_billing_addresses' ? (
				<AddNewItem
					bookingType={bookingType}
					setInvoiceToTradePartyDetails={setInvoiceToTradePartyDetails}
					organization_trade_party_id={organization_trade_party_id}
					setActiveState={setActiveState}
				/>
			) : null}

			<ActiveComponent {...activeComponentprops} />
		</div>
	);
}

export default SelectAddress;
