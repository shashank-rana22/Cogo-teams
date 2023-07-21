import { isEmpty } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import EmptyState from '../../../../../../EmptyState';

import SelfInvoice from './components/SelfInvoice';
import TradePartner from './components/TradePartner';

const MAPPING = {
	self         : SelfInvoice,
	paying_party : TradePartner,
};

function ViewBillingAddresses({
	bookingType = '',
	is_tax_applicable = false,
	disabledInvoicingParties = [],
	organization = {},
	setSelectedAddress = () => {},
	setInvoiceToTradePartyDetails = () => {},
	loading = false,
	data = {},
	setCurrentView = () => {},
	setActiveState = () => {},
}) {
	const [valuesState, setValuesState] = useState([]);
	const [optionsDisabledState, setOptionsDisabledState] = useState({});

	const { list = [] } = data;

	const reorderedList = list;

	const address_to_use = is_tax_applicable
		? 'billing_addresses'
		: 'other_addresses';

	useEffect(() => {
		if (loading || !list.length) {
			return;
		}

		const VALUES = [];
		const OPTIONS_DISABLED = {};
		const IGSTVALUES = {};

		list.forEach((item, index) => {
			const BILLING_ADDRESSES = [];
			(item.billing_addresses || []).forEach((billingAddress) => {
				const {
					id = '',
					tax_number = '',
					is_sez = false,
					verification_status = 'pending_from_approval',
				} = billingAddress;

				const isTaxNumberSelected = disabledInvoicingParties.includes(tax_number);

				if (
					isTaxNumberSelected
					&& ['verified', 'pending'].includes(verification_status)
				) {
					VALUES.push(id);
					BILLING_ADDRESSES.push(billingAddress);
				}

				OPTIONS_DISABLED[id] = isTaxNumberSelected;

				if (
					is_sez
					&& ['rejected', 'pending_from_approval'].includes(verification_status)
				) {
					OPTIONS_DISABLED[id] = true;
				}
			});

			const billingAddressesIds = BILLING_ADDRESSES.map(
				(billingAddress) => billingAddress.id,
			);

			reorderedList[index].billing_addresses = [
				...BILLING_ADDRESSES,
				...(item.billing_addresses || []).filter(
					(billingAddress) => !billingAddressesIds.includes(billingAddress.id),
				),
			];

			IGSTVALUES.cogo_entity_id = item?.cogo_entity_id;
			IGSTVALUES.country_id = item?.country_id;
		});

		setValuesState(VALUES);
		setOptionsDisabledState(OPTIONS_DISABLED);
	}, [disabledInvoicingParties, list, loading, reorderedList]);

	const newList = reorderedList.filter(
		(item) => !isEmpty(item[address_to_use] || []),
	);

	if (isEmpty(newList)) {
		return <EmptyState />;
	}

	const ActiveComponent = MAPPING[bookingType];

	return (
		<div>
			{newList.map((item) => (
				<ActiveComponent
					key={item.id}
					item={item}
					value={valuesState}
					organization={organization}
					optionsDisabled={optionsDisabledState}
					setSelectedAddress={setSelectedAddress}
					setInvoiceToTradePartyDetails={setInvoiceToTradePartyDetails}
					setCurrentView={setCurrentView}
					setActiveState={setActiveState}
				/>
			))}
		</div>
	);
}

export default ViewBillingAddresses;
