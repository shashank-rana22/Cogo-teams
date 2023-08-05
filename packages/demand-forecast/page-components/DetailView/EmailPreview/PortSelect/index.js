import { Toggle } from '@cogoport/components';

import styles from './styles.module.css';

function PortSelect() {
	return (
		<div className={styles.header}>
			<div>
				Generate report for  :
			</div>
			<div>
				<Toggle
					name="a4"
					size="md"
					disabled={false}
					onLabel="Selected Port Pair"
					offLabel="All Assigned Port Pairs"
				/>
			</div>

		</div>
	);
}
export default PortSelect;
