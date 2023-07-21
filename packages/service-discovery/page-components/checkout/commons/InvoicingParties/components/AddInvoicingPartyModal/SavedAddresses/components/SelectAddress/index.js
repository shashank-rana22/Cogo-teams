import { Button } from '@cogoport/components';
import { IcMDashedArrow } from '@cogoport/icons-react';
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
		<div className={styles.create_container}>
			<div className={styles.flex}>
				<div className={styles.bold_text}>UPTO 15%</div>
				<div className={styles.large_text}>CASHBACK*</div>
			</div>

			<div className={styles.flex}>
				<div className={styles.text}>Invite your consignee</div>
				<IcMDashedArrow style={{ margin: 'auto 12px' }} width={24} height={24} />
				<div className={styles.text}>They place their first booking</div>
				<IcMDashedArrow style={{ margin: 'auto 12px' }} width={24} height={24} />
				<div className={styles.text}>You get 15% cashback.</div>
			</div>

			<div style={{ marginTop: '12px' }} className={styles.flex}>
				<Button
					size="lg"
					type="button"
					onClick={() => {
						setActiveState('create_trade_party');
					}}
					themeType="accent"
				>
					Invite Trade Partner
				</Button>

				<div className={styles.terms_text}>*Terms & Conditions Apply</div>
			</div>
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
	} = orgData?.data || {};

	const { data = {}, loading } = useListOrganizationInvoicingParties({
		organizationId,
		bookingType,
	});

	const componentProps = {
		view_billing_addresses: {
			bookingType,
			is_tax_applicable,
			disabledInvoicingParties,
			organization: orgData?.data,
			setActiveState,
			setSelectedAddress,
			setInvoiceToTradePartyDetails,
			loading,
			data,
			setCurrentView,
		},
		create_billing_address: {
			organization: orgData?.data,
			setActiveState,
			invoiceToTradePartyDetails,
			setInvoiceToTradePartyDetails,
			source,
		},
		create_trade_party: {
			organization: orgData?.data,
			setActiveState,
			source,
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
