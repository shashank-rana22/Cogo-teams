import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import useListOrganizationInvoicingParties from '../../../../../../../hooks/useListOrganizationInvoicingParties';
import EmptyState from '../../../../../../EmptyState';

import SelfInvoice from './components/SelfInvoice';
import TradePartner from './components/TradePartner';
import styles from './styles.module.css';

const MAPPING = {
	self         : SelfInvoice,
	paying_party : TradePartner,
};

function ViewBillingAddresses({
	bookingType = '',
	is_tax_applicable = false,
	disabledInvoicingParties = [],
	organization = {},
	setActiveState = () => {},
	selectedAddress = {},
	setSelectedAddress = () => {},
	setInvoiceToTradePartyDetails = () => {},
	loading = false,
	data = {},
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

		const values = [];
		const optionsDisabled = {};
		const igstValues = {};

		list.forEach((item, index) => {
			const billingAddresses = [];
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
					values.push(id);
					billingAddresses.push(billingAddress);
				}

				optionsDisabled[id] = isTaxNumberSelected;

				if (
					is_sez
					&& ['rejected', 'pending_from_approval'].includes(verification_status)
				) {
					optionsDisabled[id] = true;
				}
			});

			const billingAddressesIds = billingAddresses.map(
				(billingAddress) => billingAddress.id,
			);

			reorderedList[index].billing_addresses = [
				...billingAddresses,
				...(item.billing_addresses || []).filter(
					(billingAddress) => !billingAddressesIds.includes(billingAddress.id),
				),
			];

			igstValues.cogo_entity_id = item?.cogo_entity_id;
			igstValues.country_id = item?.country_id;
		});

		setValuesState(values);
		setOptionsDisabledState(optionsDisabled);
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
					// handleChange={handleChange}
					optionsDisabled={optionsDisabledState}
					setActiveState={setActiveState}
					selectedAddress={selectedAddress}
					setSelectedAddress={setSelectedAddress}
					setInvoiceToTradePartyDetails={setInvoiceToTradePartyDetails}
				/>
			))}

			{!isEmpty(selectedAddress) ? (
				<div className={styles.footer}>
					<Button themeType="secondary">Cancel</Button>
					<Button style={{ marginLeft: '16px' }} themeType="accent">Next</Button>
				</div>
			) : null}
		</div>
	);
}

export default ViewBillingAddresses;
