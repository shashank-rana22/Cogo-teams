import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

import { formatDocuments } from '../../../../../../../helpers/notesHelpers';
import { formatFileAttributes } from '../../../../../../../utils/getFileAttributes';

import styles from './styles.module.css';

function Document({ eachFile = {} }) {
	const { fileName = '', fileUrl = '' } = eachFile || {};

	return (
		<div className={styles.attachments_div}>
			<div className={styles.attachments}>{fileName}</div>
			<Button size="xs" themeType="linkUi" onClick={() => window.open(fileUrl, '_blank')}>
				open
			</Button>
		</div>
	);
}

function EachNote({
	note = [],
}) {
	const { sop_detail = {}, created_at = '' } = note || {};

	const { document = '', category = '', remarks = '' } = sop_detail || {};

	const formattedDocs = formatFileAttributes({ uploadedFiles: formatDocuments({ documents: document }) });

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<div className={styles.category}>{category}</div>
				<div className={styles.remarks}>
					{remarks}
				</div>
				<div className={styles.footer}>
					{formattedDocs?.map((eachFile) => <Document eachFile={eachFile} key={eachFile?.finalUrl} />)}
				</div>
				<div className={styles.footer_time}>
					{formatDate({
						date       : created_at,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
						formatType : 'dateTime',
						separator  : ' ',
					})}
				</div>
			</div>
		</div>
	);
}

export default EachNote;
