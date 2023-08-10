import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';

import styles from './styles.module.css';

interface FilterPropsInterface {
	filters?:{ sortType?:string, sortBy?:string };
	setFilters?: React.Dispatch<React.SetStateAction<{}>>;
	sortingKey?:string;
}

function SortIcon({ setFilters, sortingKey, filters }:FilterPropsInterface) {
	const sortEle = () => {
		let newSortType = '';
		if (filters?.sortBy === sortingKey || !filters?.sortBy) {
			newSortType = (filters?.sortType === 'Asc') ? 'Desc' : 'Asc';
		} else { newSortType = 'Desc'; }
		setFilters((prev) => ({
			...prev,
			sortBy   : sortingKey,
			sortType : newSortType,
		}));
	};

	return (
		<div className={styles.container}>
			<div className={styles.center} onClick={() => { sortEle(); }} role="presentation">
				<IcMArrowRotateUp
					className={((filters?.sortBy === sortingKey
						&& filters?.sortType !== 'Desc')
						|| filters?.sortBy !== sortingKey) && styles.asc}
				/>
			</div>

			<div
				className={styles.centers}
				onClick={() => { sortEle(); }}
				role="presentation"
			>
				<IcMArrowRotateDown
					className={filters?.sortBy === sortingKey
						&& filters?.sortType === 'Desc' && styles.desc}
				/>
			</div>
		</div>
	);
}
export default SortIcon;
