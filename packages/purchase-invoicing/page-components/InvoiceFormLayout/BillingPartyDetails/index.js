import { AsyncSelectController, SelectController } from '@cogoport/forms';
import React from 'react';

import AccordianView from '../../../common/Accordianview';

import styles from './styles.module.css';

function BillingPartyDetails({ control, billingParty = {}, setBillingParty, setValue, watch, errors, errMszs }) {
	const billingPartyaAdresses = billingParty?.addresses?.map((address) => ({
		...address,
		label : address?.address,
		value : address?.gst_number,
	}));
	const bilingAddressGst = watch('billing_party_address');
	const address = billingParty?.addresses?.find((billingaddress) => (billingaddress.gst_number === bilingAddressGst));

	return (
		<AccordianView title="Billing Party Details" fullwidth showerror={errMszs?.billingPartyErr}>
			<div className={styles.flex}>
				<div className={styles.selectcontainer}>
					<div className={styles.label}>Select Billing Party</div>
					<AsyncSelectController
						control={control}
						name="billing_party"
						placeholder="Enter Billing Party"
						asyncKey="list_cogo_entity"
						onChange={(_, obj) => {
							setBillingParty(obj);
							setValue('billing_party_address', '');
						}}
						value={billingParty?.entity_code}
						rules={{ required: true }}
					/>
					{errors?.billing_party && (
						<div className={`${styles.errors}`}>
							Billing Party is Required
						</div>
					)}
				</div>
				<div className={`${styles.selectcontainer} ${styles.marginleft}`}>
					<div className={styles.label}>Select Billing Address</div>
					<SelectController
						control={control}
						name="billing_party_address"
						placeholder="Select Billing Address"
						options={billingPartyaAdresses}
						rules={{ required: true }}
					/>
					{errors?.billing_party_address && (
						<div className={`${styles.errors}`}>
							Billing Party Address is Required
						</div>
					)}
				</div>
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
		</AccordianView>
	);
}

export default BillingPartyDetails;
