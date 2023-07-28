import { RadioGroup, Pill, Tooltip, Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMInfo } from '@cogoport/icons-react';
import React, { useMemo } from 'react';

import styles from './styles.module.css';

const DISABLED_VERIFICATION_STATUS = ['rejected', 'pending'];

function InvoicingPartyItem({
	organization = {},
	item = {},
	value = '',
	handleChange = () => {},
	optionsDisabled = {},
	setShowComponent = () => {},
	setInvoiceToTradePartyDetails = () => {},
}) {
	const {
		id: tradePartyId,
		billing_addresses,
		business_name,
		country_id,
		registration_number,
		other_addresses,
		verification_status = '',
	} = item;

	const { is_tax_applicable = false } = organization;

	const options = useMemo(() => (
		(is_tax_applicable ? billing_addresses : other_addresses) || []).map((billingAddress, index) => {
		const { id, address = '', tax_number = '' } = billingAddress;

		return {
			label: (
				<div className={styles.label_container} key={id} id={`checkout_invoicing_party_${index}`}>
					<div className={styles.address_align}>
						<div className={styles.icon_wrapper}>
							<img
								src={GLOBAL_CONSTANTS.image_url.address_icon}
								alt="address icon"
								width="20"
								height="20"
							/>
						</div>

						<div className={styles.address_text}>{address}</div>
					</div>

					<div className={styles.gst_number}>
						{`TAX/GST Number : ${tax_number || 'Not Applicable'}`}
					</div>
				</div>
			),
			value: id,
		};
	}), [billing_addresses, other_addresses, is_tax_applicable]);

	const onClickAddAddress = () => {
		setShowComponent('create_billing_address');
		setInvoiceToTradePartyDetails((previousDetails) => ({
			...previousDetails,
			tradePartyId,
			countryId          : country_id,
			registrationNumber : registration_number,
		}));
	};

	return (
		<div>
			<div className={styles.label}>
				<div className={styles.business_name}>{business_name}</div>
				{verification_status && (
					<div className={styles.tag_container}>
						<Pill size="md" className={verification_status} color="green">
							{verification_status}
						</Pill>
						<Tooltip
							content={(
								<div>
									Please provide a proof of agreement that verifies the trade
									party&apos;s authorization to make payment on behalf of the
									Booking party.
								</div>
							)}
							placement="top"
							caret={false}
						>
							{verification_status === 'pending' ? (
								<div>
									<IcMInfo
										className="image"
										fill="red"
										height={16}
										width={16}
									/>
								</div>
							) : null}
						</Tooltip>
					</div>
				)}
			</div>

			<RadioGroup
				className={styles.radio_group}
				options={options}
				value={value}
				onChange={handleChange}
				disabled={DISABLED_VERIFICATION_STATUS.includes(verification_status)}
				optionsDisabled={optionsDisabled}
				multiple
			/>

			<Button
				className={styles.add_address}
				onClick={() => onClickAddAddress()}
				themeType="tertiary"
			>
				+ Add Address
			</Button>
		</div>
	);
}

export default InvoicingPartyItem;
