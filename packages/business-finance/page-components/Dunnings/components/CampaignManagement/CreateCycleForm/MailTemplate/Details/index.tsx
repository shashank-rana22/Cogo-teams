import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

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
	severityLevel,
}:Props) {
	const combinedData = [...bodyData];

	if (combinedData?.[1] === '{{severity_mail}}') {
		combinedData?.splice(2, 0, severityData[severityLevel]);
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
