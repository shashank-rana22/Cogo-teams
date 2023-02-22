import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';

import styles from './styles.module.css';

interface PropsType {
	isSortActive:string;
	setIsSortActive:Function;
	setGlobalFilters:Function;
}

function SortData({ isSortActive, setIsSortActive, setGlobalFilters }:PropsType) {
	const ascending = () => {
		setIsSortActive(true);
		setGlobalFilters((prev) => ({
			...prev,
			sortType: 'ASC',
		}));
	};
	const descending = () => {
		setIsSortActive(false);
		setGlobalFilters((prev) => ({
			...prev,
			sortType: 'DESC',

		}));
	};

	return (
		<div className={styles.container}>
			REQUEST DATE
			<div className={styles.icon_style}>
				{isSortActive
					? <IcMArrowRotateUp color="#F68B21" onClick={ascending} />
					: <IcMArrowRotateUp color="#D3D3D3" onClick={ascending} />}
				{isSortActive ? <IcMArrowRotateDown color="#D3D3D3" onClick={descending} />
					: 	<IcMArrowRotateDown color="#F68B21" onClick={descending} /> }

			</div>
		</div>
	);
}
export default SortData;
