import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function LoaderCardItem() {
	return (
		<div className={styles.card_container}>
			<div className={styles.header}>
				<div className={styles.heading}><Placeholder width="120px" height="24px" /></div>
			</div>

			<div className={styles.bottom_container}>
				<div>
					<div className={styles.label}><Placeholder width="40px" /></div>
					<div className={styles.value}><Placeholder widht="10px" /></div>
				</div>

				<div>
					<div className={styles.label}><Placeholder width="40px" /></div>
					<div className={styles.value}><Placeholder widht="40px" /></div>
				</div>
			</div>
		</div>
	);
}

export default LoaderCardItem;
