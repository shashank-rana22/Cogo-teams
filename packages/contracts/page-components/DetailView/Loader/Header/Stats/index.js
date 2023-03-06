import { Placeholder } from '@cogoport/components';

import Content from './Content';
import styles from './styles.module.css';

function Stats() {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.heading}>
					<div className={styles.contract_id}>
						<Placeholder style={{ width: '100px', height: '20px' }} />
					</div>
					<Placeholder style={{ width: '60px', height: '10px' }} />
				</div>
				<div className={styles.details}>
					<div><Placeholder style={{ width: '100px', height: '20px' }} /></div>
				</div>
			</div>
			<Content />
		</div>
	);
}
export default Stats;
