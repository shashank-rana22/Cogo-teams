import { Modal, Button, Toast } from '@cogoport/components';
import { AsyncSelectController, InputController, UploadController, useForm } from '@cogoport/forms';
import React from 'react';

import useBankDetails from '../../../hooks/useBankDetails';
import useCreateOrganizationDocument from '../../../hooks/useCreateOrganizationDocument';
import toastApiError from '../../../utils/toastApiError';

import styles from './styles.module.css';

function BankForm({
	showBankform = false,
	setShowBankForm,
	orgResponse = {},
	tradePartyId,
}) {
	const { control, handleSubmit, formState: { errors }, watch, setValues } = useForm();

	const { createloading, createTrigger } = useCreateOrganizationDocument();

	const { loading, trigger } = useBankDetails();

	const getPayload = ({ values }) => ({
		organization_id             : orgResponse?.id,
		verification_status         : 'pending',
		organization_trade_party_id : tradePartyId,
		...(values || {}),
		source                      : 'shipment',
	});

	const saveDocument = async ({ values }) => {
		try {
			const payload = getPayload({ values });

			await createTrigger({ data: payload });
			Toast.success('Bank Added Successfully');
			setShowBankForm(false);
		} catch (error) {
			toastApiError(error);
		}
	};

	const onSubmit = (values) => {
		const {
			image_url,
			organization_trade_party_id = '',
			...restValues
		} = values;

		const newValues = {
			name          : 'BankDetails',
			document_type : 'bank_account_details',
			image_url     : image_url?.finalUrl,
			data          : restValues,
			organization_trade_party_id,
			source        : 'shipment',
		};

		saveDocument({
			values: newValues,
		});
	};

	const getBankDetails = async ({ ifsc_code }) => {
		try {
			const response = await trigger({
				params: {
					ifsc_code,
				},
			});
			const bankData = response?.data || {};

			setValues({
				bank_name   : bankData.bank || '',
				branch_name : bankData.branch || '',
			});
		} catch (error) {
			toastApiError(error);
		}
	};

	const onBlurIfscControl = ({ code: ifsc_code }) => {
		getBankDetails({ ifsc_code });
	};
	const ifscCode = watch('ifsc_number');

	return (
		<Modal
			size="lg"
			show={showBankform}
			placement="center"
			className={styles.modal_container}
			onClose={() => { setShowBankForm(false); }}
		>
			<Modal.Header title={(
				<div className={styles.heading}>
					Add Bank Details
				</div>
			)}
			/>
			<Modal.Body>
				<div className={styles.layout}>
					<div className={styles.inputcontainer}>
						<div className={styles.label}>IFSC Number :</div>
						<InputController
							name="ifsc_number"
							control={control}
							placeholder="IFSC Number"
							onBlur={() => {
								onBlurIfscControl({ code: ifscCode });
							}}
							rules={{ required: true }}
							suffix={loading ? <span className={styles.loader}>...</span> : null}
						/>
						{errors?.ifsc_number ? (
							<div className={styles.errors}>
								Ifsc Number is Required
							</div>
						) : null}
					</div>
					<div className={`${styles.inputcontainer} ${styles.marginleft}`}>
						<div className={styles.label}>Account Holder Name :</div>
						<InputController
							name="account_holder_name"
							control={control}
							placeholder="Account Holder Name"
							rules={{ required: true }}
						/>
						{errors?.account_holder_name ? (
							<div className={styles.errors}>
								Account Holder Name is Required
							</div>
						) : null}
					</div>
					<div className={styles.inputcontainer}>
						<div className={styles.label}>Bank Account Number :</div>
						<InputController
							name="bank_account_number"
							control={control}
							placeholder="Bank Account Number"
							rules={{ required: true }}
						/>
						{errors?.bank_account_number ? (
							<div className={styles.errors}>
								Ifsc Number is Required
							</div>
						) : null}
					</div>
					<div className={`${styles.inputcontainer} ${styles.marginleft}`}>
						<div className={styles.label}>Bank Name :</div>
						<InputController
							name="bank_name"
							control={control}
							placeholder="Bank Name"
							rules={{ required: true }}
						/>
						{errors?.bank_name ? (
							<div className={styles.errors}>
								Bank Name is Required
							</div>
						) : null}
					</div>
					<div className={styles.inputcontainer}>
						<div className={styles.label}>Branch Name :</div>
						<InputController
							name="branch_name"
							control={control}
							placeholder="Branch Name"
							rules={{ required: true }}
						/>
						{errors?.branch_name ? (
							<div className={styles.errors}>
								Branch Name is Required
							</div>
						) : null}
					</div>
					<div className={`${styles.selectcontainer} ${styles.marginleft}`}>
						<div className={styles.label}>Trade Party Branch :</div>
						<div>
							<AsyncSelectController
								control={control}
								name="organization_trade_party_id"
								placeholder="Trade Party Branch"
								asyncKey="list_organization_trade_parties"
								valueKey="id"
								rules={{ required: true }}
								params={{
									filters: { organization_id: orgResponse?.id },
								}}
							/>
							{errors?.organization_trade_party_id ? (
								<div className={styles.errors}>
									* Required
								</div>
							) : null}
						</div>
					</div>
					<div className={styles.upload_container}>
						<label className={styles.label}>Upload Cancelled Cheque</label>
						<UploadController
							name="image_url"
							control={control}
							rules={{
								required: true,
							}}
						/>
						{errors?.image_url ? (
							<div className={styles.errors}>
								Cancelled Cheque is Required
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
						onClick={() => { setShowBankForm(false); }}
					>
						Discard
					</Button>
					<Button
						className={styles.button}
						onClick={handleSubmit(onSubmit)}
						disabled={createloading}
					>
						Save
					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}

export default BankForm;
