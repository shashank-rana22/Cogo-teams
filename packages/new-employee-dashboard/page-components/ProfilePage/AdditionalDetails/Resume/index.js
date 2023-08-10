import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../common/EmptyState';
import CommonLoader from '../../../../common/Loader';
import PreviewDocumet from '../../../../common/PreviewDocumet';

import styles from './styles.module.css';

function Resume({ profileData, getEmployeeDetailsLoading }) {
	const { documents } = profileData || {};

	const resumeDoc = (documents || []).find((doc) => (doc?.document_type === 'resume')) || {};

	if (getEmployeeDetailsLoading) {
		return <CommonLoader height="30vh" />;
	}

	if (isEmpty(resumeDoc)) {
		return <EmptyState emptyText="Resume not found" />;
	}

	return (
		<div className={styles.card_wrapper}>
			<div className={styles.header}>Resume</div>
			<PreviewDocumet document_header="Resume" document_url={resumeDoc?.document_url} preview />
		</div>
	);
}

export default Resume;
