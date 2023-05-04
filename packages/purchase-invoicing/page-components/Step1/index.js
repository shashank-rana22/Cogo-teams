import { Modal, Button } from '@cogoport/components';
import React from 'react';

import InvoiceFormLayout from '../InvoiceFormLayout';

import styles from './styles.module.css';

function Step1({
	contentText,
	uploadInvoiceUrl,
	serviceProvider,
	errors,
	setErrors,
	setBillingParty,
	billingParty,
	errorVal,
	handleSubmit,
	setValue,
	watch,
	control,
	formValues,
	errMszs,
	setOpen,
	setUploadInvoiceUrl,
	handleUpload,
}) {
	return (
		<div>
			<Modal.Header title={contentText} />
			<Modal.Body>
				<InvoiceFormLayout
					uploadInvoiceUrl={uploadInvoiceUrl}
					serviceProvider={serviceProvider}
					errors={errors}
					setErrors={setErrors}
					setBillingParty={setBillingParty}
					billingParty={billingParty}
					errorVal={errorVal}
					handleSubmit={handleSubmit}
					setValue={setValue}
					watch={watch}
					control={control}
					formValues={formValues}
					errMszs={errMszs}
				/>
			</Modal.Body>
			<Modal.Footer>
				<div className={styles.footerstyles}>
					<Button
						size="md"
						style={{ marginRight: 10 }}
						themeType="secondary"
						onClick={() => {
							setOpen(false);
							setUploadInvoiceUrl(null);
						}}
					>
						Cancel
					</Button>
					<Button
						size="md"
						onClick={
						handleUpload
                    }
					>
						Upload
					</Button>
				</div>
			</Modal.Footer>
		</div>
	);
}

export default Step1;
