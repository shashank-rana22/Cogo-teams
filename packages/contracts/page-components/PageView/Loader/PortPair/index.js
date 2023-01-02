import { Placeholder } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';

import styles from './styles.module.css';

function PortPair() {
	return (
		<div className={styles.container}>
			<div>
				<div className={styles.name}>
					<Placeholder />
				</div>
				<div>
					<Placeholder />
				</div>

			</div>
			<IcMPortArrow />
			<div>
				<div className={styles.name}>
					<Placeholder />
				</div>
				<div>
					<Placeholder />
				</div>
			</div>
		</div>
	);
}

export default PortPair;
