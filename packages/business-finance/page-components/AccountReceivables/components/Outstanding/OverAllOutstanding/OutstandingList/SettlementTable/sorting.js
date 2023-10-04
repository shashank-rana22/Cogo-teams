import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';

import styles from './styles.module.css';

interface Sort {
	sortType?: string;
	sortBy?: string;
}
interface Props {
	sort?: Sort;
	setSort?: React.Dispatch<React.SetStateAction<object>>;
	type?: string;
	settlementFilters?: object;
	setSettlementFilters?: React.Dispatch<React.SetStateAction<object>>;
}
function GetSortingData({
	settlementFilters = {},
	setSettlementFilters = () => {},
	setSort = () => {},
	type = '',
	sort = {},
}:Props) {
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
