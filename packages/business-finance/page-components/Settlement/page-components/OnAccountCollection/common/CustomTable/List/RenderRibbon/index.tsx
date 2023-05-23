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
			<div className={accMode === 'AP' ? styles.ap_ribbon : styles.simple_ribbon}>
				{accMode}
			</div>

			<div className={DocType ? styles.doc_type_ribbon : styles.tds_ribbon}>
				{DocType || 'TDS'}
			</div>
		</div>
	);
}
export default RenderRibbon;
