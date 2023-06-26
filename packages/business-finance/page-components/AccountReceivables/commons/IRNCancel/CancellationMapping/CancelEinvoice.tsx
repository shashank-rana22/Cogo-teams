import { Textarea, Button, Modal } from '@cogoport/components';
import { InputController, DatepickerController, UploadController, useForm } from '@cogoport/forms';
import React from 'react';

import useGetIrnCancellation from '../../../hooks/useGetIrnCancellation';
import styles from '../styles.module.css';

interface MappedValues {
	AGREEMENT_NUMBER?: { message: string };
	AGREEMENT_PDF_FILE?: { message: string };
	AGREEMENT_DATE?: { message: string };
	E_INVOICE_DATE?: { message: string };
	CANCELLATION_REASON?: { message: string };
}

const mapping: Record<string, { key: string }> = {
	agreementNumber     : { key: 'AGREEMENT_NUMBER' },
	agreementPdfFile    : { key: 'AGREEMENT_PDF_FILE' },
	agreementDate       : { key: 'AGREEMENT_DATE' },
	E_invoice_date      : { key: 'E_INVOICE_DATE' },
	Cancellation_reason : { key: 'CANCELLATION_REASON' },
};

function CancelEinvoice({
	itemData,
	showCancellationModal,
	setShowCancellationModal,
	IRNLabel,
	refetch,
	entityCode,
}) {
	const {
		handleSubmit,
		control,
		formState: { errors: errorVal },
	} = useForm();

	const { id, invoiceNumber, invoiceDate } = itemData || {};

	const { onSubmit, loading, response, setResponse } = useGetIrnCancellation({
		id,
		setShowCancellationModal,
		refetch,
		entityCode,
	});

	const mappedValues: MappedValues = Object.entries(mapping).reduce((result, [property, { key }]) => {
		const { message = '' } = errorVal?.[property] || {};
		return {
			...result,
			[key as keyof MappedValues]: { message },
		};
	}, {} as MappedValues);

	const {
		AGREEMENT_NUMBER = { message: '' },
		AGREEMENT_PDF_FILE = { message: '' },
		AGREEMENT_DATE = { message: '' },
		E_INVOICE_DATE = { message: '' },
		CANCELLATION_REASON = { message: '' },
	} = mappedValues;

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
								{invoiceNumber}
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
										name="agreementNumber"
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
										name="agreementDate"
										type="datepicker"
										isPreviousDaysAllowed
										placeholder="Agreement Date"
										rules={{ required: 'Agreement Date is required.' }}
									/>
									{AGREEMENT_DATE ? (
										<span className={styles.errors}>
											{' '}
											{AGREEMENT_DATE_MESSAGE.toString()}
										</span>
									) : null}
								</div>
								<div className={styles.div_width}>
									<div className={styles.lable_style}>E-Invoice Date</div>
									<DatepickerController
										control={control}
										name="E_invoice_date"
										value={new Date(invoiceDate)}
										type="datepicker"
										isPreviousDaysAllowed
										placeholder="E-invoice Date"
										rules={{ required: 'E invoice Date is required.' }}
									/>
									{E_INVOICE_DATE ? (
										<span className={styles.errors}>
											{' '}
											{E_INVOICE_DATE_MESSAGE.toString()}
										</span>
									) : null}
								</div>
							</div>
							<div className={styles.upload_container}>
								<div className={styles.upload_Width}>
									<div className={styles.lable_style}>Agreement Proof *</div>
									<UploadController
										control={control}
										name="agreementPdfFile"
										rules={{
											required: 'Agreement pdf file is required',
										}}
									/>
									{AGREEMENT_PDF_FILE ? (
										<span className={styles.errors}>
											{' '}
											{AGREEMENT_PDF_FILE_MESSAGE.toString()}
										</span>
									) : null}
								</div>
								<div className={styles.upload_Width}>
									<div className={styles.lable_style}>Cancellation Reason *</div>
									<Textarea
										size="md"
										name="Cancellation_reason"
										value={response?.remarks}
										onChange={(event) => setResponse((r) => ({ ...r, remarks: event }))}
									/>
									{CANCELLATION_REASON ? (
										<span className={styles.errors}>
											{' '}
											{CANCELLATION_REASON_MESSAGE.toString()}
										</span>
									) : null}
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
								type="button"
								onClick={() => setShowCancellationModal(false)}
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
export default CancelEinvoice;
