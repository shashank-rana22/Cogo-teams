import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

const EMAIL_TEMPLATE = 6;

function EmailTemplateLoading() {
	return (
		<div className={styles.loader}>
			{[...Array(EMAIL_TEMPLATE).keys()].map((key) => (
				<Placeholder height="280px" width="32%" margin="0px 10px 12px 0px" key={key} />
			))}
		</div>
	);
}

export default EmailTemplateLoading;
