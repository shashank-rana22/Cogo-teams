import { Button } from '@cogoport/components';

import styles from './styles.module.css';

export default function PopoverContent({
	setShow = () => {},
	setShowModal = () => {},
	invoice = {},
	commonActions = false,
	editInvoicesVisiblity = false,
	showCancelOptions = {},
	shipment_data = {},
}) {
	const handleClick = (modalName) => {
		setShowModal(modalName);
		setShow(false);
	};

	const { is_job_closed_financially = false } = shipment_data || {};

	return (
		<>
			{commonActions ? (
				<>
					{editInvoicesVisiblity ? (
						<Button
							themeType="tertiary"
							className={styles.text}
							onClick={() => handleClick('edit_invoice')}
							disabled={is_job_closed_financially}
						>
							Edit Invoice
						</Button>
					) : null}

					{!invoice?.processing ? (
						<>
							<Button
								themeType="tertiary"
								className={styles.text}
								onClick={() => handleClick('change_currency')}
								disabled={is_job_closed_financially}
							>
								Change Currency
							</Button>

							<Button
								themeType="tertiary"
								className={styles.text}
								onClick={() => handleClick('add_remarks')}
								disabled={is_job_closed_financially}
							>
								Add Remarks
							</Button>

							{invoice?.billing_address?.trade_party_type === 'self' ? (
								<Button
									themeType="tertiary"
									className={styles.text}
									onClick={() => handleClick('change_payment_mode')}
									disabled={is_job_closed_financially}
								>
									Change Payment Mode
								</Button>
							) : null}
						</>
					) : null}
				</>
			) : null}

			{ showCancelOptions?.showCancel
					&& !invoice?.processing ? (
						<Button
							themeType="tertiary"
							className={styles.text}
							onClick={() => handleClick('cancel_e_invoice')}
							type="button"
						>
							Request Cancel E Invoice
						</Button>
				) : null}

			{ showCancelOptions?.showReplace
					&& !invoice?.processing ? (
						<Button
							themeType="tertiary"
							className={styles.text}
							onClick={() => handleClick('replace_e_invoice')}
							type="button"
						>
							Request Replace E Invoice
						</Button>
				) : null}

			{!invoice?.processing
				? (invoice.exchange_rate_document || []).map((url) => (
					<Button
						key={url}
						themeType="tertiary"
						className={styles.text}
						onClick={() => window.open(url, '_blank')}
					>
						Exchange Rate Document
					</Button>
				)) : null}
		</>
	);
}
