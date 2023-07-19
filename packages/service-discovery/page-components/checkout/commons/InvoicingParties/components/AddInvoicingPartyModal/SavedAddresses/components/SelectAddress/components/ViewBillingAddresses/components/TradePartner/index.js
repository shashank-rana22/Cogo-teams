import { Pill, Tooltip, Button, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { CountrySpecificData } from '@cogoport/globalization/utils/CountrySpecificDetail';
import { IcMInfo } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function TradePartner({
	item = {},
	value = [],
	organization = {},
	optionsDisabled = {},
	setInvoiceToTradePartyDetails = () => {},
	setCurrentView = () => {},
	setSelectedAddress = () => {},
	setPaymentModes = () => {},
	setActiveState = () => {},
}) {
	const {
		id: tradePartyId,
		billing_addresses,
		business_name,
		country_id,
		registration_number,
		other_addresses,
		verification_status = '',
		rejection_reason = '',
		trade_party_type = '',
		credit_option = {},
	} = item;

	const { is_tax_applicable = false } = organization;

	const disabledIds = Object.entries(optionsDisabled).reduce(
		(acc, [key, optionValue]) => {
			if (optionValue) {
				return [...acc, key];
			}
			return acc;
		},
		[],
	);

	return (
		<div className={styles.container}>
			<div className={styles.label}>
				<div className={styles.business_name}>{business_name}</div>
				{verification_status && (
					<div className={styles.tag_container}>
						<Pill className={verification_status}>{verification_status}</Pill>

						<Tooltip
							content={(
								<div>
									Please provide a proof of agreement that verifies the trade
									party&apos;s authorization to make payment on behalf of the
									Booking party.
									{' '}
								</div>
							)}
							placement="top"
							caret={false}
							interactive
						>
							{verification_status === 'pending' && (
								<div>
									<IcMInfo
										className="image"
										fill="red"
										height={16}
										width={16}
									/>
								</div>
							)}
						</Tooltip>
					</div>
				)}
			</div>

			{((is_tax_applicable ? billing_addresses : other_addresses) || []).map(
				(billingAddress) => {
					const {
						id,
						address = '',
						tax_number = '',
						is_sez = false,
						verification_status: is_sez_verification_status = 'pending',
					} = billingAddress;

					return (
						<div
							key={id}
							role="presentation"
							onClick={() => {
								setSelectedAddress({
									...billingAddress,
									address_object_type: is_tax_applicable
										? 'billing_address'
										: 'address',
									additional_info: {
										business_name,
										trade_party_type,
										registration_number,
										organization_country_id: country_id,
									},
									credit_option,
									freight_invoice_currency : null,
									invoice_currency         : GLOBAL_CONSTANTS.currency_code.INR,
								});

								setPaymentModes((pv) => ({
									...pv,
									[id]: {
										credit_days : 0,
										interest    : 0,
										paymentMode : 'cash',
									},
								}));

								setCurrentView('select_services');
							}}
							className={cl`${styles.main_container} ${
								value.includes(id) && styles.active
							} ${disabledIds.includes(id) && styles.disabled}`}
						>
							<div className={styles.address_container}>
								<div className={styles.text}>{address}</div>

								{is_sez && (
									<div className={styles.address_container}>
										<div className={cl`${styles.tag_container} ${styles.sez}`}>
											<Pill className={is_sez_verification_status}>
												SEZ verification is
												{' '}
												{startCase(is_sez_verification_status)}
											</Pill>
											{' '}
										</div>

										{is_sez_verification_status === 'rejected'
											&& rejection_reason && (
												<Tooltip
													placement="top"
													content={startCase(rejection_reason)}
													caret={false}
													interactive
												>
													<div>
														<IcMInfo
															height="10px"
															width="10px"
															fill="#FF0000"
														/>
													</div>
												</Tooltip>
										)}
									</div>
								)}
							</div>

							<div className={styles.gst_number}>
								<CountrySpecificData
									country_id={country_id}
									accessorType="registration_number"
									accessor="label"
								/>
								{' '}
								Number :
								{' '}
								{tax_number || 'Not Applicable'}
							</div>
						</div>
					);
				},
			)}

			<div className={styles.button_container}>
				<Button
					onClick={() => {
						setActiveState('create_billing_address');

						setInvoiceToTradePartyDetails((previousDetails) => ({
							...previousDetails,
							tradePartyId,
							countryId          : country_id,
							registrationNumber : registration_number,
						}));
					}}
					size="sm"
					themeType="accent"
				>
					{' '}
					+ Add Address
				</Button>
			</div>
		</div>
	);
}

export default TradePartner;
