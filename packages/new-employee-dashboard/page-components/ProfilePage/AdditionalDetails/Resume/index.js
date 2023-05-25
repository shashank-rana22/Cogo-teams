import PreviewDocumet from '../../../../common/PreviewDocumet';

import styles from './styles.module.css';

function Resume({ profileData }) {
	const { documents } = profileData || {};

	const resumeDoc = (documents || []).find((doc) => (doc?.document_type === 'resume'));
	return (

		<div className={styles.card_wrapper}>
			<div className={styles.header}>Resume</div>
			<PreviewDocumet document_header="Resume" document_url={resumeDoc?.document_url} preview />
		</div>

	);
}

export default Resume;
