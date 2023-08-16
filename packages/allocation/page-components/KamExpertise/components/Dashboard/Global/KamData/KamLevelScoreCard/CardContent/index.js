import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function CardContent({ listData, value }) {
	return (
		<div className={styles.container}>
			<span className={styles.lable}>{startCase(value) || ''}</span>

			<div className={styles.value_container}>
				<span className={styles.value}>
					{listData?.[value] || '0'}
				</span>

			</div>
		</div>
	);
}

export default CardContent;
