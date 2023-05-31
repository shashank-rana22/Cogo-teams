import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';

import styles from './styles.module.css';

interface FilterPropsInterface {
	filters?:{ sortType?:string, sortBy?:string }
	setFilters?: React.Dispatch<React.SetStateAction<{}>>
	sortingKey?:string
}

function SortIcon({ setFilters, sortingKey, filters }:FilterPropsInterface) {
	const sortEle = () => {
		let newSortType = '';
		if (filters?.sortBy.toUpperCase() === sortingKey.toUpperCase() || !filters?.sortBy) {
			newSortType = (filters?.sortType === 'ASC') ? 'DESC' : 'ASC';
		} else { newSortType = 'DESC'; }
		setFilters((prev) => ({
			...prev,
			sortBy   : sortingKey?.toUpperCase(),
			sortType : newSortType,
		}));
	};

	return (
		<div className={styles.container}>
			<div className={styles.center} onClick={() => { sortEle(); }} role="presentation">
				<IcMArrowRotateUp
					className={((filters?.sortBy === sortingKey?.toUpperCase()
						&& filters?.sortType !== 'DESC')
						|| filters?.sortBy !== sortingKey?.toUpperCase()) && styles.asc}
				/>
			</div>

			<div
				className={styles.centers}
				onClick={() => { sortEle(); }}
				role="presentation"
			>
				<IcMArrowRotateDown
					className={filters?.sortBy === sortingKey?.toUpperCase()
						&& filters?.sortType === 'DESC' && styles.desc}
				/>
			</div>
		</div>
	);
}
export default SortIcon;
