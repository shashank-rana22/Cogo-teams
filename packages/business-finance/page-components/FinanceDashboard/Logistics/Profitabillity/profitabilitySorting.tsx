import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';

import styles from './styles.module.css';

interface Props {
	sort?:string
	setSort?: React.Dispatch<React.SetStateAction<string>>
}
function GetSortingData({ sort, setSort }:Props) {
	return (
		<div className={styles.sorting}>
			<div style={{ marginRight: '8px' }}>Profitabillity</div>
			<div style={{ marginBottom: '2px' }}>
				<div
					onClick={() => {
						setSort('Asc');
					}}
					role="presentation"
					className={sort === 'Asc' ? styles.sort_active : styles.sort_inactive}
				>
					<IcMArrowRotateUp />
				</div>
				<div
					onClick={() => {
						setSort('Desc');
					}}
					role="presentation"
					className={sort === 'Desc' ? styles.sort_active : styles.sort_inactive}
				>
					<IcMArrowRotateDown />
				</div>

			</div>
		</div>
	);
}
export default GetSortingData;
