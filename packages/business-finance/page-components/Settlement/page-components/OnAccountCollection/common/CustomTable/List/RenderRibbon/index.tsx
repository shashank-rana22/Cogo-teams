import styles from './styles.module.css';

const MAPPING = {
	REC : 'RECEIPT',
	PAY : 'PAYMENT',
};

function RenderRibbon({ item }) {
	const { paymentCode = '', accMode = '' } = item || {};
	const DocType = MAPPING[paymentCode];
	return (
		<div>
			<div
				style={{ background: accMode === 'AP' ? '#dfd9c8' : '#d5ddd6' }}
				className={styles.ap_ribbon}
			>
				{accMode}
			</div>

			<div
				style={{ background: DocType ? '#dfd9c8' : '#ffccbc' }}
				className={styles.doc_type_ribbon}
			>
				{DocType || 'TDS'}
			</div>
		</div>
	);
}
export default RenderRibbon;
