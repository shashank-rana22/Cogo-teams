import { Pill, Tooltip } from '@cogoport/components';
import { CountrySpecificData } from '@cogoport/globalization/utils/CountrySpecificDetail';
import { IcMInfo } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function SelfInvoice({
	item,
	value,
	organization,
	optionsDisabled,
	setActiveState,
	selectedAddress = {},
	setSelectedAddress = () => {},
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
						<div
							role="presentation"
							onClick={() => {
								setSelectedAddress(billingAddress);
							}}
							className={`${styles.main_container} ${selectedAddress.id === id && styles.active}`}
							key={id}
						>
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

										{is_sez_verification_status !== 'rejected'
											&& !rejection_reason && (
												<Tooltip
													placement="top"
													theme="light-border"
													content={startCase(rejection_reason)}
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
		</div>
	);
}

export default SelfInvoice;
