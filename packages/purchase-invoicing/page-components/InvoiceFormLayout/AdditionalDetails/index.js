import { InputController, SelectController } from '@cogoport/forms';
import React from 'react';

import AccordianView from '../../../common/Accordianview';
import { PAYMENT_MODE_OPTIONS } from '../../../constants';
import getLocationConfig from '../../../utils/getPortConfig';

import styles from './styles.module.css';

function AdditionalDetails({
	control,
	errors = {},
	errMszs = {},
	open = false,
	purchaseInvoiceValues = {},
	shipment_data = {},
	primary_service,
	serviceProvider = {},
	formValues = {},
}) {
	const { origin, destination } = getLocationConfig(primary_service);

	const uploadedInvoices = [];
	(serviceProvider?.collection_parties || [])
		.filter((party) => ['purchase_invoice'].includes(party?.invoice_type))
		.forEach((party) => {
			uploadedInvoices.push({
				label : party?.invoice_no,
				value : party?.finance_job_number,
			});
		});

	return (
		<AccordianView title="Additional Details" fullwidth showerror={errMszs.additional} open={open}>
			<div className={styles.flex}>
				<div className={styles.inputcontainer}>
					<div className={styles.label}>Tax Invoice No :</div>
					<div>
						<InputController
							control={control}
							name="tax_invoice_no"
							placeholder="Tax Invoice No"
							rules={{ required: true }}
							value={purchaseInvoiceValues?.tax_invoice_no}
						/>
						{errors?.tax_invoice_no ? (
							<div className={styles.errors}>
								Tax Invoice No is Required
							</div>
						) : null}
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
							value={purchaseInvoiceValues?.irn_number}
						/>
						{errors?.irn_number ? (
							<div className={styles.errors}>
								Irn Number is Required
							</div>
						) : null}
					</div>
				</div>
				{formValues?.invoice_type === 'credit_note' ? (
					<div className={`${styles.selectcontainer}`}>
						<div className={styles.label}>Ref Invoice No :</div>
						<div>
							<SelectController
								control={control}
								name="ref_invoice_no"
								placeholder="Ref Invoice Number"
								options={uploadedInvoices}
								rules={{ required: true }}
								value={purchaseInvoiceValues?.ref_invoice_no}
							/>
							{errors?.ref_invoice_no ? (
								<div className={styles.errors}>
									Payment Mode is Required
								</div>
							) : null}
						</div>
					</div>
				) : null}
				<div className={styles.inputcontainer}>
					<div className={styles.label}>Place of Supply :</div>
					<div>
						<InputController
							control={control}
							name="place_of_supply"
							placeholder="Place of Supply"
							rules={{ required: true }}
							value={purchaseInvoiceValues?.place_of_supply}
						/>
						{errors?.place_of_supply ? (
							<div className={styles.errors}>
								Place of Supply is Required
							</div>
						) : null}
					</div>
				</div>
				<div className={styles.inputcontainer}>
					<div className={styles.label}>POL :</div>
					<div>
						<InputController
							control={control}
							name="pol"
							placeholder="POL"
							rules={{ required: true }}
							value={purchaseInvoiceValues?.pol || origin?.name}
						/>
						{errors?.pol ? (
							<div className={styles.errors}>
								Pol is Required
							</div>
						) : null}
					</div>
				</div>
				<div className={styles.inputcontainer}>
					<div className={styles.label}>POD :</div>
					<div>
						<InputController
							control={control}
							name="pod"
							placeholder="POD"
							rules={{ required: true }}
							value={purchaseInvoiceValues?.pod || destination?.name}
						/>
						{errors?.pod ? (
							<div className={styles.errors}>
								Pod is Required
							</div>
						) : null}
					</div>
				</div>
				<div className={styles.selectcontainer}>
					<div className={styles.label}>Mode of Payment :</div>
					<div>
						<SelectController
							control={control}
							name="payment_mode"
							placeholder="Mode of Payment"
							options={PAYMENT_MODE_OPTIONS}
							rules={{ required: true }}
							value="cash"
						/>
						{errors?.payment_mode ? (
							<div className={styles.errors}>
								Payment Mode is Required
							</div>
						) : null}
					</div>
				</div>
				{shipment_data?.shipment_type === 'air_freight' ? (
					<>
						<div className={styles.inputcontainer}>
							<div className={styles.label}>MAWB No :</div>
							<div>
								<InputController
									control={control}
									name="mawb_no"
									placeholder="MAWB No"
									rules={{ required: true }}
									value={purchaseInvoiceValues?.mawb_no}
								/>
								{errors?.mawb_no ? (
									<div className={styles.errors}>
										Mawb No is Required
									</div>
								) : null}
							</div>
						</div>
						<div className={styles.inputcontainer}>
							<div className={styles.label}>Package Count :</div>
							<div>
								<InputController
									control={control}
									name="package_count"
									placeholder="Package Count"
									rules={{ required: true }}
									value={purchaseInvoiceValues?.package_count}
									type="number"
								/>
								{errors?.package_count ? (
									<div className={styles.errors}>
										Package Count is Required
									</div>
								) : null}
							</div>
						</div>
						<div className={styles.inputcontainer}>
							<div className={styles.label}>Chargeable Weight :</div>
							<div>
								<InputController
									control={control}
									name="weight"
									placeholder="Chargeable Weight"
									rules={{ required: true }}
									value={purchaseInvoiceValues?.weight}
								/>
								{errors?.weight ? (
									<div className={styles.errors}>
										Weight is Required
									</div>
								) : null}
							</div>
						</div>
					</>
				) : null}
			</div>
		</AccordianView>
	);
}

export default AdditionalDetails;
