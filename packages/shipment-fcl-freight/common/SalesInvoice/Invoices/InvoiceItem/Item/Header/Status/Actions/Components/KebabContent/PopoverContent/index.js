import { Button } from '@cogoport/components';

import styles from './styles.module.css';

export default function PopoverContent({
	setShow = () => {},
	setShowModal = () => {},
	invoice = {},
	commonActions = false,
	editInvoicesVisiblity = false,
	showCancelOptions = {},
}) {
	const handleClick = (modalName) => {
		setShowModal(modalName);
		setShow(false);
	};

	return (
		<>
			{commonActions ? (
				<>
					{editInvoicesVisiblity ? (
						<Button
							themeType="tertiary"
							className={styles.text}
							onClick={() => handleClick('edit_invoice')}
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
							>
								Change Currency
							</Button>

							<Button
								themeType="tertiary"
								className={styles.text}
								onClick={() => handleClick('add_remarks')}
							>
								Add Remarks
							</Button>

							{invoice?.billing_address?.trade_party_type === 'self' ? (
								<Button
									themeType="tertiary"
									className={styles.text}
									onClick={() => handleClick('change_payment_mode')}
								>
									Change Payment Mode
								</Button>
							) : null}
						</>
					) : null}

				</>
			) : null}

			{!invoice?.processing ? (
				<>
					{ showCancelOptions?.showCancel ? (
						<Button
							themeType="tertiary"
							className={styles.text}
							onClick={() => handleClick('cancel_e_invoice')}
							type="button"
						>
							Request Cancel E Invoice
						</Button>
					) : null}

					{ showCancelOptions?.showReplace ? (
						<Button
							themeType="tertiary"
							className={styles.text}
							onClick={() => handleClick('replace_e_invoice')}
							type="button"
						>
							Request Replace E Invoice
						</Button>
					) : null}

					{(invoice.exchange_rate_document || []).map((url) => (
						<Button
							key={url}
							themeType="tertiary"
							className={styles.text}
							onClick={() => window.open(url, '_blank')}
						>
							Exchange Rate Document
						</Button>
					))}
				</>
			) : null}

		</>
	);
}
