import { cl } from '@cogoport/components';

import styles from './styles.module.css';

function RowContent({ columnDetails = {}, data = {} }) {
	const { label = '', getValue = () => {} } = columnDetails || {};
	const value = getValue(data);

	return (
		<div className={`${styles.content_container}`}>
			{label ? <div className={styles.content_title}>{label}</div> : null}
			<div className={cl`${styles.content_value} ${styles[value]}`}>{value}</div>
		</div>
	);
}

export default RowContent;
