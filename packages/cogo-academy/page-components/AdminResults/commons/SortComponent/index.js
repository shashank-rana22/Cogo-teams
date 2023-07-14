import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';

import styles from './styles.module.css';

function SortComponent({ value, sortFilter, setSortFilter }) {
	const { sortBy = '', sortType = '' } = sortFilter || {};

	return (
		<div className={styles.icon_div}>
			{sortBy === value && sortType === 'desc' ? (
				<IcMArrowRotateUp
					width={14}
					height={14}
					onClick={() => setSortFilter({ sortBy: value, sortType: 'asc' })}
				/>
			) : (
				<IcMArrowRotateDown
					width={14}
					height={14}
					onClick={() => setSortFilter({ sortBy: value, sortType: 'desc' })}
				/>
			)}
		</div>
	);
}

export default SortComponent;
