import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';

import styles from './styles.module.css';

function GetSortingData({
	exceptionFilter,
	setExceptionFilter,
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
		setExceptionFilter({ ...exceptionFilter, page: 1 });
	};
	return (
		<div
			role="presentation"
			className={styles.icon_div}

		>
			<IcMArrowRotateUp
				onClick={() => handleSortingClick('ASC')}
				style={{ color: sortBy === type && sortType === 'ASC' ? '#F68B21' : '#BDBDBD' }}
			/>

			<IcMArrowRotateDown
				onClick={() => handleSortingClick('DESC')}
				style={{ color: sortBy === type && sortType === 'DESC' ? '#F68B21' : '#BDBDBD' }}
			/>
		</div>
	);
} export default GetSortingData;
