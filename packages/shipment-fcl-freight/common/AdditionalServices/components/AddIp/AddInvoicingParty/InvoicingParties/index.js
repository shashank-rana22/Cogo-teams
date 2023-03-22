// import { trackEvent } from '@cogo/commons/analytics';
// import { APP_EVENT, PARTNER_EVENT } from '@cogo/commons/analytics/constants';
import { Button, Loader } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect, useMemo } from 'react';

import useListOrganizationInvoicingParties from '../../../../../../hooks/useListOrganizationInvoicingParties';
import EmptyState from '../../../../../EmptyState';
import CreateNewBillingAddress from '../CreateNewBillingAddress';
// import CreateNewInvoicingParty from '../CreateNewInvoicingParty';

import InvoicingPartyItem from './InvoicingPartyItem';
import styles from './styles.module.css';

// const tradePartyType = {
// 	key   : 'paying_party',
// 	label : 'PAYING PARTY',
// 	value : 'paying_party',
// };

function InvoicingParties({
	organization = {},
	primary_service,
	updateInvoicingParty = () => {},
	bookingType = 'self',
	isIE,
	source,
}) {
	const { general: { query } } = useSelector((state) => state);

	const { checkout_id } = query || {};

	const { id: organizationId = '', is_tax_applicable = false } = organization;

	const [valuesState, setValuesState] = useState([]);
	const [optionsDisabledState, setOptionsDisabledState] = useState({});

	const [showComponent, setShowComponent] = useState('view_billing_addresses');

	const [invoiceToTradePartyDetails, setInvoiceToTradePartyDetails] = useState(
		{},
	);

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

	const { data, loading } = useListOrganizationInvoicingParties({ params, bookingType });

	const invoicingPartiesList = useMemo(() => (data || {}).list || [], [data]);

	const address_to_use = is_tax_applicable ? 'billing_addresses' : 'other_addresses';

	useEffect(() => {
		if (loading || invoicingPartiesList.length === 0) {
			return;
		}

		const values = [];
		const optionsDisabled = {}; // optionsDisabled only for billing_addresses

		invoicingPartiesList.forEach((item) => {
			(item.billing_addresses || []).forEach((billingAddress) => {
				const { id = '' } = billingAddress;

				values.push(id);
			});
		});

		setValuesState(values);
		setOptionsDisabledState(optionsDisabled);
	}, [loading, invoicingPartiesList]);

	const handleChange = (newValue) => {
		setValuesState(newValue);

		if (newValue) {
			const newSelectedAddressId = newValue;

			const invoicingParty = invoicingPartiesList.find((item) => {
				const allAddresses = item[address_to_use] || [];

				const isAddressPresent = allAddresses.some((address) => address.id === newSelectedAddressId);

				return isAddressPresent;
			});

			const tax_mechanism = (invoicingParty?.tax_mechanism || []).filter(
				(item) => {
					if (primary_service === item?.service_type) {
						return item;
					}
					return null;
				},
			);

			const selectedAddress = invoicingParty[address_to_use]
				.find((address) => address.id === newSelectedAddressId);

			// const EVENT = PARTNER_EVENT;
			// trackEvent(EVENT.checkout_changed_invoicing_parties, {
			// 	checkout_id,
			// 	invoicing_parties: [
			// 		{
			// 			name     : selectedAddress?.name,
			// 			poc_name : selectedAddress?.poc_details?.name,
			// 		},
			// 	],
			// });

			const {
				organization_id = '',
				address = '',
				name = '',
				tax_number = '',
				pincode = '',
				is_sez,
				// poc_details = [],
				organization_trade_party_id,
			} = selectedAddress;

			const obj = {
				name,
				business_name           : invoicingParty.business_name,
				organization_id,
				organization_country_id : invoicingParty.country_id,
				tax_number,
				tax_mechanism           : tax_mechanism?.[0]?.mechanism_type,
				address,
				pincode,
				is_sez                  : !!is_sez,
				poc                     : null, // poc_details,
				trade_party_type        : invoicingParty.trade_party_type,
				organization_trade_party_id,
				registration_number     : invoicingParty.registration_number,
			};

			updateInvoicingParty({ ...obj });
		}
	};

	const renderList = () => {
		if (loading) {
			return (
				<div className={styles.loader_container}>
					<Loader themeType="primary" />
				</div>
			);
		}

		const newInvoicingPartiesList = invoicingPartiesList.filter((item) => !isEmpty(item[address_to_use] || []));

		if (isEmpty(newInvoicingPartiesList)) {
			if (bookingType === 'self') {
				return (
					<>
						<Button
							onClick={() => {
								setShowComponent('create_billing_address');
								setInvoiceToTradePartyDetails((previousState) => ({
									...previousState,
									tradePartyId: organization.organization_trade_party_id,
								}));
							}}
							style={{ marginBottom: 16 }}
						>
							Add Address
						</Button>

						<EmptyState heading="address" />
					</>
				);
			}

			return <EmptyState heading="address" />;
		}

		return newInvoicingPartiesList.map((item) => (
			<InvoicingPartyItem
				key={item.id}
				item={item}
				value={valuesState}
				organization={organization}
				handleChange={handleChange}
				optionsDisabled={optionsDisabledState}
				isIE={isIE}
				setShowComponent={setShowComponent}
				setInvoiceToTradePartyDetails={setInvoiceToTradePartyDetails}
			/>
		));
	};

	const renderAdditionalItems = () => {
		if (bookingType === 'self' || showComponent !== 'view_billing_addresses') {
			return null;
		}

		return (
			<div className={styles.trade_party_header}>
				<Button
					onClick={() => setShowComponent('create_trade_party')}
					style={{ marginLeft: 16 }}
				>
					Add New Trade Party
				</Button>
			</div>
		);
	};

	const renderMainComponent = () => {
		if (showComponent === 'view_billing_addresses') {
			return renderList();
		}

		if (showComponent === 'create_billing_address') {
			return (
				<CreateNewBillingAddress
					organizationDetails={organization}
					setShowComponent={setShowComponent}
					// refetch={getOrganizationInvoicingParties}
					invoiceToTradePartyDetails={invoiceToTradePartyDetails}
					setInvoiceToTradePartyDetails={setInvoiceToTradePartyDetails}
				/>

			);
		}

		if (showComponent === 'create_trade_party') {
			return (
				// <CreateNewInvoicingParty
				// 	orgResponse={organization}
				// 	setShowComponent={setShowComponent}
				// 	tradePartyType={tradePartyType}
				// 	fetchOrganizationTradeParties={getOrganizationInvoicingParties}
				// 	viewType="from_checkout"
				// 	source={source}
				// />
				<div>
					CreateNewInvoicingParty
				</div>
			);
		}

		return null;
	};

	return (
		<>
			{renderAdditionalItems()}
			{renderMainComponent()}
		</>
	);
}

export default InvoicingParties;
