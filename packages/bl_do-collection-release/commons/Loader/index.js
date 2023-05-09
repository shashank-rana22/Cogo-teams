// import { Skeleton } from '@cogoport/front/components/admin';

import styles from './styles.module.css';

export default function Loader() {
	return (
		<div className={styles.container}>
			<div className={styles.main}>
				<div className={styles.row}>
					<div className={styles.details}>
						Loading
					</div>
					<div className={styles.details}>
						Loading
					</div>
				</div>
				<div className={styles.action}>
					Loading
				</div>
			</div>
		</div>
	);
}
