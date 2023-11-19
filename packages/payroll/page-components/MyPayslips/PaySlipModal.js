import { Modal } from '@cogoport/components';

import styles from './styles.module.css';

function PaySlipModal({ showModal, documentType, setShowModal, modalUrl }) {
	const { earnings, deductions, variable_earnings } = modalUrl || {};

	const formattedData = {
		Earnings: earnings ? Object.entries(earnings).map(([key, value]) => ({ category: key, amount: value })) : [],
		Deductions:
		deductions ? Object.entries(deductions).map(([key, value]) => ({ category: key, amount: value })) : [],
		'Variable Earnings':
		variable_earnings
			? Object.entries(variable_earnings).map(([key, value]) => ({ category: key, amount: value })) : [],
	};
	return (
		<Modal size="lg" show={showModal} onClose={() => setShowModal(false)} placement="top">
			<Modal.Header title={documentType} />
			<Modal.Body>
				<div className={styles.pdf_container}>
					{Object.entries(formattedData).map(([category, items]) => (
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
					))}
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default PaySlipModal;
