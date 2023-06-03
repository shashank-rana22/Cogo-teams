import { Modal, Button } from '@cogoport/components';
import { DatepickerController, InputController, UploadController, useForm } from '@cogoport/forms';
import React from 'react';

import styles from './styles.module.css';

interface InvoiceModalParams {
	uploadInvoice?: boolean,
	setUploadInvoice?: (p: boolean) => void,
	uploadEInvoice?: Function,
	loading?: boolean
}

function InvoiceModal({
	uploadInvoice,
	setUploadInvoice,
	uploadEInvoice,
	loading,
}: InvoiceModalParams) {
	const {
		handleSubmit,
		control,
		formState: { errors: errorVal },
	} = useForm();

	const onSubmit = (value) => {
		uploadEInvoice(value);
	};

	const {
		E_invoice_date : E_INVOICE_DATE = {}, E_invoice_due_date : E_INVOICE_DUE_DATE = {},
		E_invoice_number: E_INVOICE_NUMBER = {}, E_invoice_pdf_file: E_INVOICE_PDF_FILE = {},
		E_invoice_xml_file: E_INVOICE_XML_FILE = {},
	} = errorVal;

	const { message: E_INVOICE_DATE_MESSAGE = '' } = E_INVOICE_DATE;
	const { message: E_INVOICE_DUE_DATE_MESSAGE = '' } = E_INVOICE_DUE_DATE;
	const { message: E_INVOICE_NUMBER_MESSAGE = '' } = E_INVOICE_NUMBER;
	const { message: E_INVOICE_PDF_FILE_MESSAGE = '' } = E_INVOICE_PDF_FILE;
	const { message: E_INVOICE_XML_FILE_MESSAGE = '' } = E_INVOICE_XML_FILE;

	return (
		<Modal
			show={uploadInvoice}
			onClose={() => setUploadInvoice(false)}
			size="lg"
		>
			<Modal.Header
				title="Upload E-invoice Document"
			/>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Modal.Body>
					<div>

						<div className={styles.date_container}>
							<div
								className={styles.div_width}
							>
								<div className={styles.lable_style}>E Invoice Date</div>
								<DatepickerController
									control={control}
									name="E_invoice_date"
									type="datepicker"
									isPreviousDaysAllowed
									placeholder="E-invoice Date"
									rules={{ required: 'E invoice Date is required.' }}
								/>
								{E_INVOICE_DATE && (
									<span className={styles.errors}>
										{' '}
										{E_INVOICE_DATE_MESSAGE.toString()}
									</span>
								)}
							</div>

							<div className={styles.div_width}>

								<div className={styles.lable_style}>E Invoice Due Date</div>
								<DatepickerController
									control={control}
									name="E_invoice_due_date"
									type="datepicker"
									placeholder="E-invoice Due Date"
									isPreviousDaysAllowed
									rules={{ required: 'E invoice Due Date is required.' }}
								/>
								{E_INVOICE_DUE_DATE && (
									<span className={styles.errors}>
										{' '}
										{E_INVOICE_DUE_DATE_MESSAGE.toString()}
									</span>
								)}
							</div>
							<div className={styles.input_style}>
								<div className={styles.lable_style}>E-invoice Number</div>
								<InputController
									control={control}
									name="E_invoice_number"
									placeholder="E-invoice Number"
									type="number"
									rules={{ required: 'E invoice Number is required.' }}
								/>
								{E_INVOICE_NUMBER && (
									<span className={styles.errors}>
										{' '}
										{E_INVOICE_NUMBER_MESSAGE.toString()}
									</span>
								)}
							</div>
						</div>
						<div
							className={styles.upload_container}
						>

							<div className={styles.upload_Width}>
								<div className={styles.lable_style}>E-invoice pdf file</div>
								<UploadController
									control={control}
									name="E_invoice_pdf_file"
									rules={{
										required: 'E-invoice pdf file is required',
									}}
								/>
								{E_INVOICE_PDF_FILE && (
									<span className={styles.errors}>
										{' '}
										{E_INVOICE_PDF_FILE_MESSAGE.toString()}
									</span>
								)}
							</div>
							<div className={styles.upload_Width}>
								<div className={styles.lable_style}>E-invoice xml file</div>
								<UploadController
									control={control}
									name="E_invoice_xml_file"
									rules={{
										required: 'E-invoice xml file is required',
									}}
								/>
								{E_INVOICE_XML_FILE && (
									<span className={styles.errors}>
										{' '}
										{E_INVOICE_XML_FILE_MESSAGE.toString()}
									</span>
								)}
							</div>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<div className={styles.button_div}>
						<div
							className={styles.cancel_style}
						>
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
