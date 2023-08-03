import { format } from '@cogoport/utils';

import styles from './styles.module.css';

const ZERO = 0;
function UpdatedOn({ data }) {
	return (
		<div className={styles.updated_on}>
			Updated On :
			{' '}
			{format(data?.[ZERO]?.updated_at, 'dd MMM yyyy', null, true)}
			{' '}
		</div>
	);
}

export default UpdatedOn;
