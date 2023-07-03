import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';

import styles from './styles.module.css';

function GetSortingData({
	settlementFilters,
	setSettlementFilters,
	setSort,
	type,
	sort,
}) {
	const { sortType = '', sortBy = '' } = sort || {};

	const handleSortingClick = (sortingType) => {
		setSort({
			sortType : sortingType,
			sortBy   : type,
		});
		setSettlementFilters({ ...settlementFilters, page: 1 });
	};
	return (
		<div
			role="presentation"
			className={styles.icon_div}

		>
			<IcMArrowRotateUp
				onClick={() => handleSortingClick('Asc')}
				style={{ color: sortBy === type && sortType === 'Asc' ? '#F68B21' : '#BDBDBD' }}
			/>

			<IcMArrowRotateDown
				onClick={() => handleSortingClick('Desc')}
				style={{ color: sortBy === type && sortType === 'Desc' ? '#F68B21' : '#BDBDBD' }}
			/>
		</div>
	);
} export default GetSortingData;
