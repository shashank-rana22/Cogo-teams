import { Textarea, Button, Modal } from '@cogoport/components';
import { InputController, DatepickerController, UploadController, useForm } from '@cogoport/forms';
import React, { useState } from 'react';

import useGetIrnCancellation from '../../hooks/useGetIrnCancellation';

import styles from './styles.module.css';

function CancellationModal({
	itemData,
	showCancellationModal,
	setShowCancellationModal,
	IRNLabel,
}) {
	const {
		handleSubmit,
		control,
		formState: { errors: errorVal },
	} = useForm();

	const [response, setResponse] = useState({
		remarks: '',
	});

	const { onSubmit, loading } = useGetIrnCancellation({
		id: itemData?.id,
		setShowCancellationModal,
		response,
	});

	const {
		Agreement_number: AGREEMENT_NUMBER = {}, Agreement_pdf_file: AGREEMENT_PDF_FILE = {},
		Agreement_date: AGREEMENT_DATE = {},
		E_invoice_date: E_INVOICE_DATE = {},
		Cancellation_reason: CANCELLATION_REASON = {},
	} = errorVal;

	const { message: E_INVOICE_DATE_MESSAGE = '' } = E_INVOICE_DATE;
	const { message: AGREEMENT_NUMBER_MESSAGE = '' } = AGREEMENT_NUMBER;
	const { message: AGREEMENT_DATE_MESSAGE = '' } = AGREEMENT_DATE;
	const { message: AGREEMENT_PDF_FILE_MESSAGE = '' } = AGREEMENT_PDF_FILE;
	const { message: CANCELLATION_REASON_MESSAGE = '' } = CANCELLATION_REASON;

	return (
		<Modal show={showCancellationModal} onClose={() => setShowCancellationModal(false)} size="lg">
			<div className={styles.cancel_modal}>

				<Modal.Header
					title={(
						<div className={styles.cancel_invoice}>
							Cancel
							{' '}
							{IRNLabel}
							{' '}
							<span className={styles.styled_invoice}>
								{itemData?.invoiceNumber}
							</span>
						</div>
					)}
				/>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Modal.Body>
						<div>
							<div className={styles.date_container}>
								<div className={styles.div_width}>
									<div className={styles.lable_style}>
										Agreement No. *
									</div>
									<InputController
										control={control}
										name="Agreement_number"
										placeholder="Agreement Number"
										type="number"
										rules={{ required: 'Agreement Number is required' }}
									/>
									{AGREEMENT_NUMBER && (
										<span className={styles.errors}>
											{' '}
											{AGREEMENT_NUMBER_MESSAGE.toString()}
										</span>
									)}
								</div>
								<div className={styles.div_width}>
									<div className={styles.lable_style}>
										Aggreement Date *
									</div>
									<DatepickerController
										control={control}
										name="Agreement_date"
										type="datepicker"
										isPreviousDaysAllowed
										placeholder="Agreement Date"
										rules={{ required: 'Agreement Date is required.' }}
									/>
									{AGREEMENT_DATE && (
										<span className={styles.errors}>
											{' '}
											{AGREEMENT_DATE_MESSAGE.toString()}
										</span>
									)}
								</div>
								<div className={styles.div_width}>
									<div className={styles.lable_style}>E-Invoice Date</div>
									<DatepickerController
										control={control}
										name="E_invoice_date"
										value={new Date(itemData?.invoiceDate)}
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
							</div>
							<div className={styles.upload_container}>
								<div className={styles.upload_Width}>
									<div className={styles.lable_style}>Agreement Proof *</div>
									<UploadController
										control={control}
										name="Agreement_pdf_file"
										rules={{
											required: 'Agreement pdf file is required',
										}}
									/>
									{AGREEMENT_PDF_FILE && (
										<span className={styles.errors}>
											{' '}
											{AGREEMENT_PDF_FILE_MESSAGE.toString()}
										</span>
									)}
								</div>
								<div className={styles.upload_Width}>
									<div className={styles.lable_style}>Cancellation Reason *</div>
									<Textarea
										size="md"
										name="Cancellation_reason"
										value={response?.remarks}
										onChange={(event) => {
											setResponse((r) => ({ ...r, remarks: event }));
										}}

									/>
									{CANCELLATION_REASON && (
										<span className={styles.errors}>
											{' '}
											{CANCELLATION_REASON_MESSAGE.toString()}
										</span>
									)}
								</div>
							</div>
						</div>
					</Modal.Body>
					<Modal.Footer>
						<div className={styles.confirm_button}>
							<div className={styles.styled_button}>
								<Button disabled={loading} type="submit">
									{loading ? 'Submiting' : 'Submit'}
								</Button>
							</div>
							<Button
								onClick={() => {
									setShowCancellationModal(false);
								}}
							>
								Cancel
							</Button>
						</div>
					</Modal.Footer>
				</form>
			</div>
		</Modal>
	);
}
export default CancellationModal;
