import { Loader, Button } from '@cogoport/components';
import EmptyState from '@cogoport/surface-modules/common/EmptyState';
import { isEmpty } from '@cogoport/utils';
import { useMemo, useState, useEffect } from 'react';

import InvoicingPartyItem from './InvoicingPartyItem';
import styles from './styles.module.css';

export default function InvoicingPartiesList({
	data = {},
	loading = false,
	primary_service,
	updateInvoicingParty = () => {},
	organization = {},
	bookingType,
	isIE,
	setShowComponent = () => {},
	setInvoiceToTradePartyDetails = () => {},
}) {
	const { is_tax_applicable = false } = organization;
	const [valuesState, setValuesState] = useState([]);
	const [optionsDisabledState, setOptionsDisabledState] = useState({});

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

			const {
				organization_id = '',
				address = '',
				name = '',
				tax_number = '',
				pincode = '',
				is_sez,
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
				poc                     : null,
				trade_party_type        : invoicingParty.trade_party_type,
				organization_trade_party_id,
				registration_number     : invoicingParty.registration_number,
			};

			updateInvoicingParty({ ...obj });
		}
	};

	if (loading) {
		return (
			<div className={styles.loader_container}>
				<Loader themeType="primary" />
			</div>
		);
	}

	const newInvoicingPartiesList = invoicingPartiesList.filter((item) => !isEmpty(item[address_to_use] || []));

	if (isEmpty(newInvoicingPartiesList)) {
		return (
			<>
				{bookingType === 'self' ? (
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
				) : null}

				<EmptyState />
			</>
		);
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
}
