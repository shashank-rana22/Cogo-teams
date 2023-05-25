import PreviewDocumet from '../../../../common/PreviewDocumet';

import styles from './styles.module.css';

function IdentificationDocuments() {
	return (
		<div className={styles.container}>
			<div className={styles.card_wrapper}>
				<div className={styles.header}>Adhar Card</div>
				<PreviewDocumet document_header="Adhar Card" preview='true'/>
			</div>

			<div className={styles.card_wrapper}>
				<div className={styles.header}>Pan Card</div>
				<PreviewDocumet document_header="Pan Card" preview='true'/>
			</div>

			<div className={styles.card_wrapper}>
				<div className={styles.header}>Passport</div>
				<PreviewDocumet document_header="Passport" preview='true' />
			</div>

			<div className={styles.card_wrapper}>
				<div className={styles.header}>Driving Licence</div>
				<PreviewDocumet document_header="driving licence" preview='true'/>
			</div>
		</div>

	);
}

export default IdentificationDocuments;
