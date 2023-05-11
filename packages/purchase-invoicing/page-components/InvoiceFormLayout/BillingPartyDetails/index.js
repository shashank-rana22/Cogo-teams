import { Placeholder } from '@cogoport/components';
import { SelectController } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import AccordianView from '../../../common/Accordianview';

import styles from './styles.module.css';

function BillingPartyDetails({
	control,
	billingParty = {},
	setBillingParty,
	setValue,
	watch,
	errors,
	errMszs,
	open,
	purchaseInvoiceValues,
	listEntities,
}) {
	const billingPartyOpts = listEntities?.list?.map((item) => ({
		...item,
		value : item?.registration_number,
		label : `${item?.entity_code} - ${item?.country?.name} - ${item?.business_name}`,
	}));

	const billingPartiesExcept101 = billingPartyOpts?.filter(
		(item) => item?.entity_code !== '101',
	);

	const billingPartyaAdresses = billingParty?.addresses?.map((address) => ({
		...address,
		label : address?.address,
		value : address?.gst_number,
	}));

	const bilingAddressGst = watch('billing_party_address');
	const address = billingParty?.addresses?.find((billingaddress) => (billingaddress.gst_number
		=== (bilingAddressGst || purchaseInvoiceValues?.billing_party_address)));

	return (
		<AccordianView title="Billing Party Details" fullwidth showerror={errMszs?.billingPartyErr} open={open}>
			{!isEmpty(billingPartiesExcept101)
				? (
					<>
						<div className={styles.flex}>
							<div className={styles.selectcontainer}>
								<div className={styles.label}>Select Billing Party</div>
								<SelectController
									control={control}
									name="billing_party"
									placeholder="Enter Billing Party"
									options={billingPartiesExcept101}
									onChange={(_, obj) => {
										setBillingParty(obj);
										setValue('billing_party_address', '');
									}}
									rules={{ required: true }}
									value={purchaseInvoiceValues?.billing_party}
								/>
								{errors?.billing_party && (
									<div className={`${styles.errors}`}>
										Billing Party is Required
									</div>
								)}
							</div>
							{billingParty?.addresses && (
								<div className={`${styles.selectcontainer} ${styles.marginleft}`}>
									<div className={styles.label}>Select Billing Address</div>
									<SelectController
										control={control}
										name="billing_party_address"
										placeholder="Select Billing Address"
										options={billingPartyaAdresses}
										rules={{ required: true }}
										value={purchaseInvoiceValues?.billing_party_address}
									/>
									{errors?.billing_party_address && (
										<div className={`${styles.errors}`}>
											Billing Party Address is Required
										</div>
									)}
								</div>
							)}
						</div>
						{address && (
							<div className={styles.address}>
								<div>
									<span className={styles.key}>Address</span>
									<span className={styles.value}>
										:
										{' '}
										{address?.address}
									</span>
								</div>
								<div className={styles.flex}>
									<div>
										<span className={styles.key}>PAN Number</span>
										<span className={styles.value}>
											:
											{' '}
											{billingParty?.registration_number}
										</span>
									</div>
									<div>
										<span className={styles.key}>GST Number</span>
										<span className={styles.value}>
											:
											{' '}
											{address?.gst_number}
										</span>
									</div>
								</div>
							</div>
						)}
					</>
				) : <Placeholder width="100%" height="80px" />}
		</AccordianView>
	);
}

export default BillingPartyDetails;
