import { Modal } from '@cogoport/components';

import styles from './styles.module.css';

function PaySlipModal({ showModal, documentType, setShowModal, modalUrl, openUrl }) {
	const { earnings, deductions, variable_earnings } = modalUrl || {};
	// console.log('modalurl', modalUrl);

	const formattedData = {
		Earnings: earnings ? Object.entries(earnings).map(([key, value]) => ({ category: key, amount: value })) : [],
		Deductions:
		deductions ? Object.entries(deductions).map(([key, value]) => ({ category: key, amount: value })) : [],
		'Variable Earnings':
		variable_earnings
			? Object.entries(variable_earnings).map(([key, value]) => ({ category: key, amount: value })) : [],
	};

	console.log('formate', formattedData);
	return (
		<Modal size="lg" show={showModal} onClose={() => setShowModal(false)} placement="top">
			<Modal.Header title={documentType} />
			<Modal.Body>
				<div className={styles.pdf_container}>
					{/* {Object.entries(formattedData).map(([category, items]) => (
						<div className={styles.table} key={category}>
							<div className={styles.head_row}>
								<span className={styles.head_left}>{category}</span>
								<span className={styles.head_left}>Amount</span>
							</div>
							{items.map((item) => (
								<div className={styles.normal_row} key={item.category}>
									<span className={styles.text_left}>{item.category}</span>
									<span className={styles.text_left}>{item.amount}</span>
								</div>

							))}

						</div>
					))} */}
					<iframe
						src={openUrl}
						type="application/pdf"
						width="100%"
						height="100%"
						title="Document"
						style={{ border: 'none' }}
					>
						<p>
							It seems you don&apos;t have a PDF plugin for this browser. No biggie... you can
							{' '}
							<a href={modalUrl}>click here to download the PDF file.</a>
						</p>
					</iframe>
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default PaySlipModal;
