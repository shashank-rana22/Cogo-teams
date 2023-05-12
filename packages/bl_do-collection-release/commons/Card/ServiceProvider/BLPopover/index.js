import { cl } from '@cogoport/components';
import { v4 as uuid } from 'uuid';

import styles from './styles.module.css';

export default function BLPopver({ bl_do = '', blDetails = [] }) {
	return (
		<div className={cl`${styles.container} ${styles.main}`}>
			<div className={cl`${styles.container} ${styles.header}`}>
				<div className={cl`${styles.text} ${styles.title}`}>
					{bl_do.toUpperCase()}
					{' '}
					Number
				</div>
			</div>
			{(blDetails || []).map((item) => (
				<div className={cl`${styles.container} ${styles.card}`} key={uuid()}>
					<div className={cl`${styles.text} ${styles.bl_number}`}>{item?.bl_number}</div>
				</div>
			))}
		</div>
	);
}
