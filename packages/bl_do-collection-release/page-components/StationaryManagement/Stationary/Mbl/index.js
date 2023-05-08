import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

const WIDTH = '30px';
const HEIGHT = '16px';

function Mbl({ data = {}, loading }) {
	const { stats:{ mbl_copies, total_organizations } = {} } = data || {};

	return (
		<div className={styles.container}>
			<h3 className={styles.title}>MBL</h3>
			<div className={styles.divider} />

			<div className={styles.stats}>
				<div className={styles.stats_sub_container}>
					<div>Copies</div>
					{loading
						? <Placeholder width={WIDTH} height={HEIGHT} />
						: <div className={styles.value}>{mbl_copies || '-'}</div> }
				</div>

				<div className={styles.stats_sub_container}>
					<div>Organizations</div>
					{loading
						? <Placeholder width={WIDTH} height={HEIGHT} />
						: <div className={styles.value}>{total_organizations || '-'}</div> }
				</div>
			</div>
		</div>
	);
}

export default Mbl;
