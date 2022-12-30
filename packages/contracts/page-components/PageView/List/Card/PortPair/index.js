import { IcMPortArrow } from '@cogoport/icons-react';

import styles from './styles.module.css';

function PortPair() {
	return (
		<div className={styles.container}>
			<div>
				<div>
					Shanghai (CNSHA)
				</div>
				<div>
					China
				</div>

			</div>
			<IcMPortArrow />
			<div>
				<div>
					Shanghai (CNSHA)
				</div>
				<div>
					China
				</div>
			</div>
		</div>
	);
}

export default PortPair;
