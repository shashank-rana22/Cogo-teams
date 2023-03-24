import { format } from '@cogoport/utils';

import styles from './styles.module.css';

function BasicDetails({ stats_data }) {
	const { test_name, validity_start, validity_end } = stats_data || {};

	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				{test_name}
				<p className={styles.validity_label}>
					Valiidty:
					{' '}
					<span className={styles.validity}>
						{format(validity_start, 'dd MMM\' yy')}
						{' '}
						-
						{' '}
						{format(validity_end, 'dd MMM\' yy')}
					</span>
				</p>
			</div>
		</div>
	);
}

export default BasicDetails;
