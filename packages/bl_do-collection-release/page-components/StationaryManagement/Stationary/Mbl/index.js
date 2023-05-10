import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

const WIDTH = '30px';
const HEIGHT = '16px';

function Mbl({ data = {}, loading }) {
	const { stats:{ mbl_copies, total_organizations } = {} } = data || {};

	const mappings = [{ label: 'Copies', value: mbl_copies },
		{ label: 'Organizations', value: total_organizations }];

	return (
		<div className={styles.container}>
			<h3 className={styles.title}>MBL</h3>
			<div className={styles.divider} />

			<div className={styles.stats}>
				{mappings.map((item) => (
					<div className={styles.stats_sub_container}>
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

export default Mbl;
