import { Button } from '@cogoport/components';
import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';

import styles from './styles.module.css';

function GetSortingData({ sort, setSort }) {
	return (
		<div className={styles.sorting}>
			<div style={{ marginRight: '4px' }}>Profitabillity</div>
			<div>
				<Button
					themeType="tertiary"
					onClick={() => {
						setSort('Asc');
					}}
					className={sort === 'Asc' ? styles.sort_active : styles.sort_inactive}
				>
					<IcMArrowRotateUp className={styles.sort_top_icon} />
				</Button>
				<Button
					themeType="tertiary"
					onClick={() => {
						setSort('Desc');
					}}
					className={sort === 'Desc' ? styles.sort_active : styles.sort_inactive}
				>
					<IcMArrowRotateDown className={styles.sort_top_icon} />
				</Button>

			</div>
		</div>
	);
}
export default GetSortingData;
