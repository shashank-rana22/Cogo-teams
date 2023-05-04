import { InputController, SelectController } from '@cogoport/forms';
import React from 'react';

import AccordianView from '../../../common/Accordianview';
import { PAYMENT_MODE_OPTIONS } from '../../../constants';

import styles from './styles.module.css';

function AdditionalDetails({ control, errors, errMszs }) {
	return (
		<AccordianView title="Additional Details" fullwidth showerror={errMszs.line_items}>
			<div className={styles.flex}>
				<div className={styles.inputcontainer}>
					<div className={styles.label}>Tax Invoice No :</div>
					<div>
						<InputController
							control={control}
							name="tax_invoice_no"
							placeholder="Tax Invoice No"
							rules={{ required: true }}
						/>
						{errors?.tax_invoice_no && (
							<div className={`${styles.errors}`}>
								Tax Invoice No is Required
							</div>
						)}
					</div>
				</div>
				<div className={`${styles.inputcontainer}`}>
					<div className={styles.label}>IRN Number :</div>
					<div>
						<InputController
							control={control}
							name="irn_number"
							placeholder="IRN Number"
							rules={{ required: true }}
						/>
						{errors?.irn_number && (
							<div className={`${styles.errors}`}>
								Irn Number is Required
							</div>
						)}
					</div>
				</div>
				<div className={`${styles.inputcontainer}`}>
					<div className={styles.label}>Place of Supply :</div>
					<div>
						<InputController
							control={control}
							name="place_of_supply"
							placeholder="Place of Supply"
							rules={{ required: true }}
						/>
						{errors?.place_of_supply && (
							<div className={`${styles.errors}`}>
								Place of Supply is Required
							</div>
						)}
					</div>
				</div>
				<div className={`${styles.inputcontainer}`}>
					<div className={styles.label}>POL :</div>
					<div>
						<InputController
							control={control}
							name="pol"
							placeholder="POL"
							rules={{ required: true }}
						/>
						{errors?.pol && (
							<div className={`${styles.errors}`}>
								Pol is Required
							</div>
						)}
					</div>
				</div>
				<div className={`${styles.inputcontainer}`}>
					<div className={styles.label}>POD :</div>
					<div>
						<InputController
							control={control}
							name="pod"
							placeholder="POD"
							rules={{ required: true }}
						/>
						{errors?.pod && (
							<div className={`${styles.errors}`}>
								Pod is Required
							</div>
						)}
					</div>
				</div>
				<div className={`${styles.selectcontainer}`}>
					<div className={styles.label}>Mode of Payment :</div>
					<div>
						<SelectController
							control={control}
							name="payment_mode"
							placeholder="Mode of Payment"
							options={PAYMENT_MODE_OPTIONS}
							rules={{ required: true }}
						/>
						{errors?.payment_mode && (
							<div className={`${styles.errors}`}>
								Payment Mode is Required
							</div>
						)}
					</div>
				</div>
			</div>
		</AccordianView>
	);
}

export default AdditionalDetails;
