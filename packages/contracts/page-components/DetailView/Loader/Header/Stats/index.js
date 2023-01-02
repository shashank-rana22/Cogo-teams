import { Placeholder } from '@cogoport/components';

import Content from './Content';
import styles from './styles.module.css';

function Stats() {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.heading}>
					<div className={styles.contract_id}>
						<Placeholder />
					</div>
				</div>
				<div className={styles.details}>
					<div><Placeholder /></div>
					<div><Placeholder /></div>
					<div><Placeholder /></div>
				</div>
			</div>
			<Content />
		</div>
	);
}
export default Stats;
