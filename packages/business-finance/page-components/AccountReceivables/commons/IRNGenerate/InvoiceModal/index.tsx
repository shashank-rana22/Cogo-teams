import { Modal, Button } from '@cogoport/components';
import { DatepickerController, InputController, UploadController, useForm } from '@cogoport/forms';
import React from 'react';

import styles from './styles.module.css';

function InvoiceModal({
	uploadInvoice,
	setUploadInvoice,
	uploadEInvoice,
	loading,
}) {
	const {
		handleSubmit,
		control,
		formState: { errors: errorVal },
	} = useForm();

	const onSubmit = (value) => {
		uploadEInvoice(value);
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
								<div className={styles.lable_style}>E Invoice Date</div>
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

								<div className={styles.lable_style}>E Invoice Due Date</div>
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
							<div className={styles.input_style} style={{ width: '230px' }}>
								<div className={styles.lable_style}>E-invoice Number</div>
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
						<div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '32px' }}>

							<div style={{ width: '360px' }}>
								<div className={styles.lable_style}>E-invoice pdf file</div>
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
								<div className={styles.lable_style}>E-invoice xml file</div>
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
