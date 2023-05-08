import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

const WIDTH = '30px';
const HEIGHT = '16px';

function Hbl({ data = {}, loading }) {
	const { stats : { hbl_serial_no = [], hbl_copies } = {} } = data || {};

	const [startSerial, endSerial] = hbl_serial_no || [];

	return (
		<div className={styles.container}>
			<h3 className={styles.title}>HBL</h3>
			<div className={styles.divider} />

			<div className={styles.stats}>
				<div className={styles.stats_sub_container}>
					<div>Copies</div>
					{loading
						? <Placeholder width={WIDTH} height={HEIGHT} />
						: <div className={styles.value}>{hbl_copies || '-'}</div> }
				</div>

				<div className={styles.stats_sub_container}>
					<div>Serial No. Start</div>
					{loading
						? <Placeholder width={WIDTH} height={HEIGHT} />
						: <div className={styles.value}>{startSerial || '-'}</div> }
				</div>

				<div className={styles.stats_sub_container}>
					<div>Serial No. End</div>
					{loading
						? <Placeholder width={WIDTH} height={HEIGHT} />
						: <div className={styles.value}>{endSerial || '-'}</div> }
				</div>
			</div>
		</div>
	);
}

export default Hbl;
