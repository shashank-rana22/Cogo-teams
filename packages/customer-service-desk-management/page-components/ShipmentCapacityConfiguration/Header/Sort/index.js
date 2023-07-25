import { Popover } from '@cogoport/components';
import { IcMSort } from '@cogoport/icons-react';
import { useState } from 'react';

import styles from './styles.module.css';

// const renderSortContent = ({
// 	setSort,
// 	sortBy,
// 	setShowSort,
// 	t = () => {},
// 	translationKey,
// }) => getSortContent({ t, translationKey })?.map((item) => (
// 	<div
// 		className={`${styles.item} ${
// 			sortBy === item.value ? styles.selected : ''
// 		}`}
// 		onClick={() => {
// 			setSort(item.value);
// 			setShowSort(false);
// 		}}
// 		role="presentation"
// 		key={item.value}
// 	>
// 		{item.label}
// 	</div>
// ));

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
					className={`${styles.sort_container} ${
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
