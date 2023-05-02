import { Modal, Button } from '@cogoport/components';
import { DatepickerController, InputController, UploadController, useForm } from '@cogoport/forms';
import React, { useEffect, useState } from 'react';

import styles from './styles.module.css';

function InvoiceModal({
	uploadInvoice,
	setUploadInvoice,
	uploadEInvoice,
	loading,
}) {
	const {
		setValue,
		watch,
		handleSubmit,
		control,
		formState: { errors: errorVal },
	} = useForm();

	const onSubmit = (value) => {
		console.log('value', value);

		// uploadEInvoice(value);
	};

	return (
		<Modal
			show={uploadInvoice}
			onClose={() => setUploadInvoice(false)}
			size="lg"
			onOuterClick={() => setUploadInvoice(false)}
		>
			<Modal.Header
				title="Upload E-invoice Document"
			/>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Modal.Body>
					<div>

						<div style={{ display: 'flex', justifyContent: 'space-around' }}>
							<div style={{ width: '230px' }}>
								<span>E Invoice Date</span>
								<DatepickerController
									control={control}
									name="E_invoice_date"
									type="datepicker"
									isPreviousDaysAllowed
									placeholder="E-invoice Date"
									rules={{ required: 'E invoice Date is required.' }}
								/>
								{errorVal.E_invoice_date && (
									<span className={styles.errors}>
										{' '}
										{errorVal?.E_invoice_date?.message.toString()}
									</span>
								)}
							</div>

							<div style={{ width: '230px' }}>

								<span>E Invoice Due Date</span>
								<DatepickerController
									control={control}
									name="E_invoice_due_date"
									type="datepicker"
									placeholder="E-invoice Due Date"
									isPreviousDaysAllowed
									rules={{ required: 'E invoice Due Date is required.' }}
								/>
								{errorVal.E_invoice_due_date && (
									<span className={styles.errors}>
										{' '}
										{errorVal?.E_invoice_due_date?.message.toString()}
									</span>
								)}
							</div>
							<div style={{ width: '230px' }}>
								<span>E-invoice Number</span>
								<InputController
									control={control}
									name="E_invoice_number"
									placeholder="E-invoice Number"
									type="number"
									rules={{ required: 'E invoice Number is required.' }}
								/>
								{errorVal.E_invoice_number && (
									<span className={styles.errors}>
										{' '}
										{errorVal?.E_invoice_number?.message.toString()}
									</span>
								)}
							</div>
						</div>
						<div style={{ display: 'flex', justifyContent: 'space-around' }}>

							<div style={{ width: '360px' }}>
								<span>E-invoice pdf file</span>
								<UploadController
									control={control}
									name="E_invoice_pdf_file"
									rules={{
										required: 'E-invoice pdf file is required',
									}}
								/>
								{errorVal.E_invoice_pdf_file && (
									<span className={styles.errors}>
										{' '}
										{errorVal?.E_invoice_pdf_file?.message.toString()}
									</span>
								)}
							</div>
							<div style={{ width: '360px' }}>
								<span>E-invoice xml file</span>
								<UploadController
									control={control}
									name="E_invoice_xml_file"
									rules={{
										required: 'E-invoice xml file is required',
									}}
								/>
								{errorVal.E_invoice_xml_file && (
									<span className={styles.errors}>
										{' '}
										{errorVal?.E_invoice_xml_file?.message.toString()}
									</span>
								)}
							</div>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<div className={styles.button_div}>
						<div style={{ marginRight: '10px' }}>
							<Button
								className="secondary md"
								onClick={() => setUploadInvoice(false)}
							>
								Cancel
							</Button>
						</div>
						<div>
							<Button className="primary md" disabled={loading} type="submit">
								{loading ? 'Uploading' : 'Upload'}
							</Button>
						</div>
					</div>
				</Modal.Footer>
			</form>
		</Modal>
	);
}

export default InvoiceModal;
