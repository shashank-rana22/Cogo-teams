import { Placeholder } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Body() {
	return (
		<div className={styles.body}>
			<div className={styles.upper_body}>
				<div>
					<div className={styles.code}><Placeholder /></div>
					<div className={styles.name}>
						<Placeholder />
					</div>
				</div>
				<div>
					<IcMPortArrow />
				</div>
				<div>
					<div className={styles.code}><Placeholder style={{ width: '10px' }} /></div>

					<div className={styles.name}>
						<Placeholder />
					</div>
				</div>
			</div>
			<div className={styles.container}>
				<Placeholder />
			</div>

		</div>

	);
}
export default Body;
