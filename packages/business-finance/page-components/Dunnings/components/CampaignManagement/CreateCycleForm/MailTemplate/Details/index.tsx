import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

const SPLICE_FROM = 2;
const SEVERITY_MAIL_POSITION = 1;

interface Props {
	text?: string;
	isBody?: boolean;
	bodyData?: string[];
	severityData?: object;
	severityLevel?: string;
}

function Details({
	text = '',
	isBody = false,
	bodyData = [],
	severityData = {},
	severityLevel = '',
}:Props) {
	const combinedData = [...bodyData];

	if (combinedData?.[SEVERITY_MAIL_POSITION] === '{{severity_mail}}') {
		combinedData?.splice(SPLICE_FROM, GLOBAL_CONSTANTS.zeroth_index, severityData[severityLevel]);
	}

	if (!isBody) {
		return <div className={styles.section}>{text}</div>;
	}

	const htmlContent = combinedData.reduce((content, current) => (content + current), '');

	return (
		<div className={styles.section}>
			{!isEmpty(htmlContent) ?	(
				<div dangerouslySetInnerHTML={{ __html: htmlContent }} />
			)
				: (
					<div className={styles.placeholder_body}>
						<h3>Select templates</h3>
					</div>
				)}
		</div>
	);
}

export default Details;
