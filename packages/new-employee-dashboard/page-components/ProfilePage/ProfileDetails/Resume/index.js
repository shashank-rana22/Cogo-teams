import PreviewDocumet from '../../../../common/PreviewDocumet';

import styles from './styles.module.css';

function Resume() {
	return (

		<div className={styles.card_wrapper}>
			<div className={styles.header}>Resume</div>
			<PreviewDocumet document_header="Resume" />
		</div>

	);
}

export default Resume;
