import { Pill, Tooltip, Button } from '@cogoport/components';
import { CountrySpecificData } from '@cogoport/globalization/utils/CountrySpecificDetail';
import { IcMInfo } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function TradePartner({
	item,
	value,
	organization,
	optionsDisabled,
	setActiveState = () => {},
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
		rejection_reason = '',
	} = item;

	const { is_tax_applicable = false } = organization;

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
				(billingAddress, index) => {
					const {
						id,
						address = '',
						tax_number = '',
						is_sez = false,
						verification_status: is_sez_verification_status = 'pending',
					} = billingAddress;

					return (
						<div className={styles.main_container} key={id}>
							<div className={styles.address_container}>
								<div className={styles.text}>{address}</div>

								{is_sez && (
									<div className={styles.address_container}>
										<div className={`${styles.tag_container} ${styles.sez}`}>
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
