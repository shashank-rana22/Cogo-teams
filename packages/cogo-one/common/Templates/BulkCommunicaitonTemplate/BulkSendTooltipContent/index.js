import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function BulkSendTooltipContent({ othersUserName = [] }) {
	return (
		<div className={styles.overflow_div}>
			{othersUserName.map((name = '') => <div key={name}>{startCase(name?.toLowerCase()) || 'User'}</div>)}
		</div>
	);
}

export default BulkSendTooltipContent;
