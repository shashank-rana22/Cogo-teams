import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

interface Props {
	text?: string;
	isBody?: boolean;
	bodyData?: string[];
}

function Details({
	text = '',
	isBody = false,
	bodyData = [],
}:Props) {
	if (!isBody) {
		return <div className={styles.section}>{text}</div>;
	}

	const htmlContent = bodyData.reduce((content, current) => (content + current), '');

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
