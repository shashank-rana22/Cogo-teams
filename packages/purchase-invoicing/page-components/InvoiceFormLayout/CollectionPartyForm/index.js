import { Modal, Button } from '@cogoport/components';
import {
	CheckboxController, CountrySelectController,
	InputController, UploadController,
} from '@cogoport/forms';
import React from 'react';

import useAddCollectionParty from '../../../hooks/useAddCollectionParty';

import PocForm from './PocForm';
import styles from './styles.module.css';

function CollectionPartyForm({
	showCollectionParty = false,
	setShowCollectionParty = () => {},
	serviceProvider = {},
}) {
	const {
		handleSubmit,
		onError,
		errors,
		addCollectionParty,
		control,
	} = useAddCollectionParty({
		organization_id : serviceProvider?.service_provider_id,
		setOpen         : setShowCollectionParty,
		source          : 'shipment',
	});

	return (
		<Modal
			size="lg"
			show={showCollectionParty}
			placement="center"
			className={styles.modal_container}
			onClose={() => { setShowCollectionParty(false); }}
		>
			<Modal.Header title={(
				<div className={styles.heading}>
					Add Collection Party
				</div>
			)}
			/>
			<Modal.Body>
				<div className={styles.layout}>
					<div className={styles.issez}>
						<CheckboxController
							control={control}
							label="Not registered under GST"
							name="registered_gst"
						/>
						<CheckboxController
							control={control}
							label="Is  SEZ"
							name="is_sez"
						/>
					</div>
					<div className={styles.flexlayout}>
						<div className={styles.input_container}>
							<div className={styles.label}>Business Name</div>
							<InputController
								name="company_name"
								control={control}
								size="sm"
								placeholder="Add Business Name"
								rules={{ required: 'Business Name is required' }}
							/>
							{errors?.company_name ? (
								<div className={styles.errors}>
									Company Name is Required
								</div>
							) : null}
						</div>
						<div className={`${styles.selectcontainer}`}>
							<div className={styles.label}>Country of Registration</div>
							<div>
								<CountrySelectController
									name="country"
									control={control}
									size="sm"
									placeholder="Enter or Select Country"
									optionValueKey="id"
									rules={{ required: 'Country of Registration is required' }}
								/>
								{errors?.country ? (
									<div className={styles.errors}>
										country is Required
									</div>
								) : null}
							</div>
						</div>
						<div className={styles.input_container}>
							<div className={styles.label}>PAN Number</div>
							<InputController
								name="registration_number"
								control={control}
								size="sm"
								placeholder="PAN Number"
								rules={{ required: 'PAN Number is required' }}
							/>
							{errors?.registration_number ? (
								<div className={styles.errors}>
									PAN Number is Required
								</div>
							) : null}
						</div>
						<div className={styles.input_container}>
							<div className={styles.label}>GST Number</div>
							<InputController
								name="tax_number"
								control={control}
								size="sm"
								placeholder="Tax Number"
								rules={{ required: 'Tax Number is required' }}
							/>
							{errors?.tax_number ? (
								<div className={styles.errors}>
									Tax Number is Required
								</div>
							) : null}
						</div>
						<div className={styles.input_container}>
							<div className={styles.label}>Billing Address</div>
							<InputController
								name="address"
								control={control}
								size="sm"
								placeholder="Billing Address"
								rules={{ required: 'Billing Address is required' }}
							/>
							{errors?.address ? (
								<div className={styles.errors}>
									Billing Address is Required
								</div>
							) : null}
						</div>
						<div className={styles.input_container}>
							<div className={styles.label}>PIN Code</div>
							<InputController
								name="pincode"
								control={control}
								size="sm"
								placeholder="PIN Code"
								rules={{ required: 'PIN Code is required' }}
							/>
							{errors?.pincode ? (
								<div className={styles.errors}>
									PIN Code is Required
								</div>
							) : null}
						</div>
					</div>
				</div>
				<div>
					<PocForm control={control} errors={errors} />
				</div>
				<div className={styles.flex}>
					<div className={`${styles.input_container} ${styles.width}`}>
						<div className={styles.label}>Bank A/c Number</div>
						<InputController
							name="bank_account_number"
							control={control}
							size="sm"
							placeholder="Enter your Bank A/c Number"
							rules={{ required: 'Bank A/c Number is required' }}
						/>
						{errors?.bank_account_number ? (
							<div className={styles.errors}>
								Bank A/c Number is Required
							</div>
						) : null}
					</div>
					<div className={`${styles.input_container} ${styles.width} ${styles.marginleft}`}>
						<div className={styles.label}>Bank Name</div>
						<InputController
							name="bank_name"
							control={control}
							size="sm"
							placeholder="Bank Name"
							rules={{ required: 'Bank Name is required' }}
						/>
						{errors?.bank_name ? (
							<div className={styles.errors}>
								Bank Name is Required
							</div>
						) : null}
					</div>
					<div className={`${styles.input_container} ${styles.width}`}>
						<div className={styles.label}>Branch Name</div>
						<InputController
							name="branch_name"
							control={control}
							size="sm"
							placeholder="Branch Name"
							rules={{ required: 'Branch Name is required' }}
						/>
						{errors?.branch_name ? (
							<div className={styles.errors}>
								Branch Name is Required
							</div>
						) : null}
					</div>
					<div className={`${styles.input_container} ${styles.width} ${styles.marginleft}`}>
						<div className={styles.label}>IFSC</div>
						<InputController
							name="ifsc_number"
							control={control}
							size="sm"
							placeholder="Bank IFSC"
							rules={{ required: 'Bank IFSC is required' }}
						/>
						{errors?.ifsc_number ? (
							<div className={styles.errors}>
								Bank IFSC is Required
							</div>
						) : null}
					</div>
					<div className={styles.tds_rate}>
						<div className={styles.label}>TDS Rate (%)</div>
						<InputController
							name="tds_rate"
							type="number"
							control={control}
							size="sm"
							placeholder="Add TDS Rate"
						/>
					</div>
					<div className={`${styles.upload_container} ${styles.marginleftchecque}`}>
						<label className={styles.label}>Upload Cancelled Cheque</label>
						<UploadController
							name="cancelled_cheque"
							control={control}
							rules={{
								required: true,
							}}
						/>
						{errors?.cancelled_cheque ? (
							<div className={styles.errors}>
								Cancelled Cheque is Required
							</div>
						) : null}
					</div>
				</div>
				<div className={styles.flex}>
					<div className={styles.upload_container}>
						<label className={styles.label}>Company Existence Proof</label>
						<UploadController
							name="company_existence_proof"
							control={control}
							rules={{
								required: true,
							}}
						/>
						{errors?.company_existence_proof ? (
							<div className={styles.errors}>
								Company Existence Proof is Required
							</div>
						) : null}
					</div>
					<div className={`${styles.upload_container} ${styles.marginleft}`}>
						<label className={styles.label}>Idemnification Proof</label>
						<UploadController
							name="idemnification_proof"
							control={control}
							rules={{
								required: true,
							}}
						/>
						{errors?.idemnification_proof ? (
							<div className={styles.errors}>
								Idemnification Proof is Required
							</div>
						) : null}
					</div>
					<div className={styles.upload_container}>
						<label className={styles.label}>Upload GST proof</label>
						<UploadController
							name="gst_proof"
							control={control}
							rules={{
								required: true,
							}}
						/>
						{errors?.gst_proof ? (
							<div className={styles.errors}>
								Upload GST proof is Required
							</div>
						) : null}
					</div>
					<div className={`${styles.upload_container} ${styles.marginleft}`}>
						<label className={styles.label}>SEZ proof</label>
						<UploadController
							name="sez_proof"
							control={control}
							rules={{
								required: true,
							}}
						/>
						{errors?.sez_proof ? (
							<div className={styles.errors}>
								SEZ proof is Required
							</div>
						) : null}
					</div>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<div className={styles.buttoncontainer}>
					<Button
						className={styles.cancel}
						themeType="secondary"
						onClick={() => { setShowCollectionParty(false); }}
					>
						Discard
					</Button>
					<Button
						className={styles.button}
						onClick={handleSubmit(addCollectionParty, onError)}
					>
						Save
					</Button>
				</div>
			</Modal.Footer>
		</Modal>

	);
}

export default CollectionPartyForm;
