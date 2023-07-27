import { Popover, cl } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';

import FilterContent from './FilterContent';
import styles from './styles.module.css';
import useFilterPopover from './useFilterPopover';

function Filter() {
	const {
		showFilter,
		setShowFilter,
		control,
		handleSubmit,
		onSubmit,
		onClickReset,
	} = useFilterPopover({});

	return (
		<Popover
			theme="light"
			interactive
			animation="perspective"
			caret={false}
			placement="bottom"
			render={(
				<FilterContent
					onClickReset={onClickReset}
					control={control}
					handleSubmit={handleSubmit}
					onSubmit={onSubmit}

				/>
			)}
			visible={showFilter}
			onClickOutside={() => setShowFilter(false)}
		>
			<div
				className={cl`${styles.filter_container} ${showFilter ? styles.active : ''}`}
				aria-hidden="true"
				onClick={() => {
					setShowFilter((prev) => !prev);
				}}
			>
				<IcMFilter width={16} height={16} className={styles.filter_icon} />

				<div>Filter</div>

				{/* {filtersApplied && <div className={styles.filter_dot} />} */}
			</div>
		</Popover>
	);
}

export default Filter;
