import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';

import styles from './styles.module.css';

function RenderSortingArrows({ field:key = '', sortData = {}, setSortData = () => {} }) {
	const { sortBy = '', sortType = '' } = sortData;
	return (
		<div className={styles.icon_flex}>
			<IcMArrowRotateUp
				className={sortBy === key && sortType === 'Asc' && styles.active}
				cursor="pointer"
				onClick={() => setSortData({
					...sortData,
					sortType : 'Asc',
					sortBy   : key,
				})}
			/>
			<IcMArrowRotateDown
				className={sortBy === key && sortType === 'Desc' && styles.active}
				cursor="pointer"
				onClick={() => setSortData({
					...sortData,
					sortType : 'Desc',
					sortBy   : key,
				})}
			/>
		</div>
	);
}
export default RenderSortingArrows;
