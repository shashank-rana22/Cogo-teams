import { Placeholder } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';

import styles from './styles.module.css';

function PortPair() {
	return (
		<div className={styles.container}>
			<div>
				<div className={styles.name}>
					<Placeholder style={{ width: '120px', height: '30px' }} />

				</div>
				<div>
					<Placeholder style={{ width: '120px', height: '30px' }} />
				</div>

			</div>
			<IcMPortArrow />
			<div>
				<div className={styles.name}>
					<Placeholder style={{ width: '120px', height: '30px' }} />
				</div>
				<div>
					<Placeholder style={{ width: '120px', height: '30px' }} />
				</div>
			</div>
		</div>
	);
}

export default PortPair;
