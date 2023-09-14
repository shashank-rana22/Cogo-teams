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
	controlType = '',
}) {
	const { sop_detail = {}, created_at = '', instruction = '', url_links = [], last_updated_by = {} } = note || {};

	const { name = '' } = last_updated_by || {};
	const { document = '', category = '', remarks: sopRemarks = '' } = sop_detail || {};

	const DATA_MAPPING = {
		get_api: {
			remarks   : sopRemarks,
			documents : document,
			heading   : category,
		},
		list_api: {
			remarks   : instruction,
			documents : url_links,
			heading   : 'CCS Team Notes',
		},
	};

	const { remarks = '', documents = '', heading = '' } = DATA_MAPPING[controlType] || {};

	const formattedDocs = formatFileAttributes({ uploadedFiles: formatDocuments({ documents }) });

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<div className={styles.category}>{heading}</div>
				<div className={styles.remarks}>
					{remarks}
				</div>
				<div className={styles.footer}>
					{formattedDocs?.map((eachFile) => <Document eachFile={eachFile} key={eachFile?.finalUrl} />)}
				</div>
				<div className={styles.footer_time}>
					{name ? (
						<span>
							By
							{' '}
							{name}
						</span>
					) : null}
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
