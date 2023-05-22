import PreviewDocumet from '../../../../common/PreviewDocumet';

import styles from './styles.module.css';

function IdentificationDocuments() {
	return (
		<div className={styles.container}>
			<div className={styles.card_wrapper}>
				<div className={styles.header}>Adhar Card</div>
				<PreviewDocumet document_header="Adhar Card" />
			</div>

			<div className={styles.card_wrapper}>
				<div className={styles.header}>Pan Card</div>
				<PreviewDocumet document_header="Pan Card" />
			</div>

			<div className={styles.card_wrapper}>
				<div className={styles.header}>Passport</div>
				<PreviewDocumet document_header="Passport" />
			</div>

			<div className={styles.card_wrapper}>
				<div className={styles.header}>Driving Licence</div>
				<PreviewDocumet document_header="driving licence" />
			</div>
		</div>

	);
}

export default IdentificationDocuments;
