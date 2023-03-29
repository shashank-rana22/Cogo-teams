import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';

import styles from './styles.module.css';

const applySorting = ({ value, type, setSortFilter }) => {
	setSortFilter({ sortBy: value, sortType: type });
};

function SortComponent({ value, sortFilter, setSortFilter }) {
	const { sortBy = '', sortType = '' } = sortFilter || {};

	return (
		<div className={styles.icon_div}>
			{sortBy === value && sortType === 'desc' ? (
				<IcMArrowRotateUp
					width={14}
					height={14}
					onClick={() => {
						applySorting({ value, type: 'asc', setSortFilter });
					}}
				/>
			) : (
				<IcMArrowRotateDown
					width={14}
					height={14}
					onClick={() => {
						applySorting({ value, type: 'desc', setSortFilter });
					}}
				/>
			)}
		</div>
	);
}

export default SortComponent;
