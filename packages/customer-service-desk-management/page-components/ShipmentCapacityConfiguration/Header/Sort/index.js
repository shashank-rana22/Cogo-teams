import { Popover, cl } from '@cogoport/components';
import { IcMSort } from '@cogoport/icons-react';
import { useState } from 'react';

import styles from './styles.module.css';

const SORT_OPTIONS = [{
	label : 'Allocation Date ASC',
	value : 'activated_at-asc',
}, {
	label : 'Allocation Date DESC',
	value : 'activated_at-desc',
}];

const renderSortContent = ({
	setSort,
	sortBy,
	setShowSort,
}) => SORT_OPTIONS?.map((item) => (
	<div
		className={cl`${styles.item} ${
			sortBy === item.value ? styles.selected : ''
		}`}
		onClick={() => {
			setSort(item.value);
			setShowSort(false);
		}}
		role="presentation"
		key={item.value}
	>
		{item.label}
	</div>
));

function SortComponent() {
	const [showSort, setShowSort] = useState(false);

	return (
		<div className={styles.container}>
			<Popover
				theme="light"
				interactive
				animation="perspective"
				placement="bottom"
				caret={false}
				visible={showSort}
				onClickOutside={() => setShowSort(false)}
			>
				<div
					className={cl`${styles.sort_container} ${
						showSort ? styles.active : ''
					}`}
					aria-hidden="true"
					onClick={() => {
						setShowSort((prev) => !prev);
					}}
				>
					<IcMSort width={16} height={16} className={styles.sort_icon} />

					<div>Sort</div>
				</div>
			</Popover>
		</div>
	);
}

export default SortComponent;
