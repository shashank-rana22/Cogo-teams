import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';

import styles from './styles.module.css';

interface FilterPropsInterface {
	filters?:{ sortType?:string }
	setFilters?: React.Dispatch<React.SetStateAction<{}>>
	sortingKey?:string
}

function SortIcon({ setFilters, sortingKey, filters }:FilterPropsInterface) {
	const sortEle = () => {
		setFilters((prev) => ({
			...prev,
			sortBy   : sortingKey?.toUpperCase(),
			sortType : (!filters?.sortType || filters?.sortType === 'ASC') ? 'DESC' : 'ASC',
		}));
	};

	return (
		<div className={styles.container}>
			<div className={styles.center} onClick={() => { sortEle(); }} role="presentation">
				<IcMArrowRotateUp
					className={(!filters?.sortType || filters?.sortType === 'ASC') && styles.asc}
				/>
			</div>

			<div
				className={styles.centers}
				onClick={() => { sortEle(); }}
				role="presentation"
			>
				<IcMArrowRotateDown
					className={filters?.sortType === 'DESC' && styles.desc}
				/>
			</div>
		</div>
	);
}
export default SortIcon;
