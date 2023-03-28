import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';

import styles from './styles.module.css';

const applySorting = (val, typ, setSortBy, setSortType) => {
	setSortBy(val);
	setSortType(typ);
};

function SortComponent({ val, sortBy, sortType, setSortBy, setSortType }) {
	return (
		<div className={styles.icon_div}>
			{sortBy === val && sortType === 'desc' ? (
				<IcMArrowRotateUp
					width={14}
					height={14}
					onClick={() => {
						applySorting(val, 'asc', setSortBy, setSortType);
					}}
				/>
			) : (
				<IcMArrowRotateDown
					width={14}
					height={14}
					onClick={() => {
						applySorting(val, 'desc', setSortBy, setSortType);
					}}
				/>
			)}
		</div>
	);
}

export default SortComponent;
