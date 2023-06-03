import { Placeholder } from '@cogoport/components';
import { v4 as uuid } from 'uuid';

import styles from './styles.module.css';

const WIDTH = '30px';
const HEIGHT = '16px';

function Hbl({ data = {}, loading }) {
	const { stats : { hbl_serial_no = [], hbl_copies } = {} } = data || {};

	const [startSerial, endSerial] = hbl_serial_no || [];

	const mappings = [{ label: 'Copies', value: hbl_copies },
		{ label: 'Serial No. Start', value: startSerial },
		{ label: 'Serial No. End', value: endSerial }];

	return (
		<div className={styles.container}>
			<h3 className={styles.title}>HBL</h3>
			<div className={styles.divider} />

			<div className={styles.stats}>
				{mappings.map((item) => (
					<div className={styles.stats_sub_container} key={uuid()}>
						<div>{item.label}</div>
						{loading
							? <Placeholder width={WIDTH} height={HEIGHT} />
							: <div className={styles.value}>{item.value || '-'}</div> }
					</div>
				))}
			</div>
		</div>
	);
}

export default Hbl;
