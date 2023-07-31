import { Button, Modal } from '@cogoport/components';
import { InputController, DatepickerController, UploadController, useForm } from '@cogoport/forms';
import React from 'react';

import useGetIrnCancellation from '../../../hooks/useGetIrnCancellation';
import styles from '../styles.module.css';

function CancelEinvoice({
	itemData,
	showCancellationModal,
	setShowCancellationModal,
	irnLabel,
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
		itemData,
	});

	return (
		<Modal show={showCancellationModal} onClose={() => setShowCancellationModal(false)} size="lg">
			<div className={styles.cancel_modal}>

				<Modal.Header
					title={(
						<div className={styles.cancel_invoice}>
							Cancel
							{' '}
							{irnLabel}
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
										type="text"
										value={response?.agreementNumber}
										onChange={(e) => {
											setResponse((resp) => ({ ...resp, agreementNumber: e }));
										}}
										rules={{ required: 'Agreement Number is required' }}
									/>
									{(response?.agreementNumber === '') && (
										<span className={styles.errors}>
											{' '}
											{errorVal?.agreementNumber?.message.toString()}
										</span>
									)}
								</div>
								<div className={styles.div_width}>
									<div className={styles.lable_style}>
										Aggreement Date *
									</div>
									<DatepickerController
										control={control}
										placement="bottom"
										name="agreementDate"
										type="datepicker"
										value={response?.agreementDate}
										isPreviousDaysAllowed
										onChange={(e) => setResponse((resp) => ({ ...resp, agreementDate: e }))}
										placeholder="Agreement Date"
										rules={{ required: 'Agreement Date is required' }}
									/>
									{response?.agreementDate ? (
										<span className={styles.errors}>
											{errorVal?.agreementDate?.message.toString()}
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
									{(invoiceDate === '') ? (
										<span className={styles.errors}>
											{' '}
											{errorVal?.invoiceDate?.message.toString()}
										</span>
									) : null}
								</div>
							</div>
							<div className={styles.upload_container}>
								<div className={styles.upload_Width}>
									<div className={styles.lable_style}>Agreement Proof *</div>
									<UploadController
										control={control}
										name="agreementDocument"
										value={response?.agreementDocument}
										defaultValues={response?.agreementDocument}
										onChange={(e) => setResponse((resp) => ({ ...resp, agreementDocument: e }))}
										rules={{ required: 'Agreement file is required' }}
									/>
									{(response?.agreementDocument === '') ? (
										<span className={styles.errors}>
											{' '}
											{errorVal?.agreementDocument?.message.toString()}
										</span>
									) : null}
								</div>
								<div className={styles.upload_Width}>
									<div className={styles.lable_style}>Cancellation Reason *</div>
									<InputController
										control={control}
										name="remarks"
										value={response?.remarks}
										onChange={(e) => setResponse((resp) => ({ ...resp, remarks: e }))}
										rules={{ required: 'Reason is required' }}
									/>
									{(response?.remarks === '') ? (
										<span className={styles.errors}>
											{' '}
											{errorVal?.remarks?.message.toString()}
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
