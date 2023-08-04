import { Button } from '@cogoport/components';

import styles from './styles.module.css';

export default function PopoverContent({
	setShow = () => {},
	setShowModal = () => {},
	invoice = {},
	commonActions = false,
	editInvoicesVisiblity = false,
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
	);
}
