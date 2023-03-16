import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';

import styles from './styles.module.css';

function SortIcon({ setIsAscendingActive, setFilters, isAscendingActive }) {
	const handleOnChangeUp = () => {
		setIsAscendingActive('true');
		setFilters((prev:object) => ({
			...prev,
			sortType: 'ASC',
		}));
	};
	const handleOnChangeDown = () => {
		setIsAscendingActive('false');
		setFilters((prev:object) => ({
			...prev,
			sortType: 'DESC',
		}));
	};
	return (
		<>
			<div className={styles.center} onClick={() => handleOnChangeUp()} role="presentation">
				<IcMArrowRotateUp
					className={isAscendingActive === 'true' && styles.asc}

				/>
			</div>
			<div className={styles.centers} onClick={() => handleOnChangeDown()} role="presentation">
				<IcMArrowRotateDown
					className={isAscendingActive === 'false' && styles.desc}

				/>
			</div>
		</>
	);
}
export default SortIcon;
