import { Button } from '@cogoport/components';
import { useState, useMemo } from 'react';

import useListOrganizationInvoicingParties from '../../../../../../hooks/useListOrganizationInvoicingParties';
import CreateNewBillingAddress from '../CreateNewBillingAddress';
import CreateNewTradeParty from '../CreateNewTradeParty';

import InvoicingPartiesList from './InvoicingPartyiesList';
import styles from './styles.module.css';

const tradePartyType = {
	key   : 'paying_party',
	label : 'PAYING PARTY',
	value : 'paying_party',
};

function InvoicingParties({
	organization = {},
	primary_service,
	updateInvoicingParty = () => {},
	bookingType = 'self',
	isIE,
}) {
	const { id: organizationId = '' } = organization;

	const [showComponent, setShowComponent] = useState('view_billing_addresses');

	const [invoiceToTradePartyDetails, setInvoiceToTradePartyDetails] = useState({});

	const params = useMemo(() => ({
		filters: {
			organization_id  : organizationId,
			status           : 'active',
			trade_party_type : bookingType,
		},
		pagination_data_required        : false,
		billing_addresses_data_required : true,
		documents_data_required         : true,
		other_addresses_data_required   : true,
	}), [organizationId, bookingType]);

	const { data, loading, refetch } = useListOrganizationInvoicingParties({ params });

	return (
		<>
			{bookingType === 'self' || showComponent !== 'view_billing_addresses' ? null : (
				<div className={styles.trade_party_header}>
					<Button
						onClick={() => setShowComponent('create_trade_party')}
						style={{ marginLeft: 16 }}
					>
						Add New Trade Party
					</Button>
				</div>
			)}

			{showComponent === 'view_billing_addresses' ? (
				<InvoicingPartiesList
					data={data}
					loading={loading}
					primary_service={primary_service}
					updateInvoicingParty={updateInvoicingParty}
					organization={organization}
					bookingType={bookingType}
					setShowComponent={setShowComponent}
					setInvoiceToTradePartyDetails={setInvoiceToTradePartyDetails}
					isIE={isIE}
				/>
			) : null}

			{showComponent === 'create_billing_address' ? (
				<CreateNewBillingAddress
					organizationDetails={organization}
					setShowComponent={setShowComponent}
					refetch={refetch}
					invoiceToTradePartyDetails={invoiceToTradePartyDetails}
					setInvoiceToTradePartyDetails={setInvoiceToTradePartyDetails}
				/>
			) : null}

			{showComponent === 'create_trade_party' ? (
				<CreateNewTradeParty
					orgResponse={organization}
					setShowComponent={setShowComponent}
					showComponent={showComponent}
					tradePartyType={tradePartyType}
					fetchOrganizationTradeParties={refetch}
				/>
			) : null}
		</>
	);
}

export default InvoicingParties;
