import { Popover, cl } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import FilterContent from './FilterContent';
import styles from './styles.module.css';
import useFilterPopover from './useFilterPopover';

function Filter({ filters = {}, setFilters = () => {} }) {
	const {
		showFilter,
		setShowFilter,
		control,
		handleSubmit,
		onSubmit,
		onClickReset,
	} = useFilterPopover({ setFilters });

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

				{!isEmpty(filters) && <div className={styles.filter_dot} />}
			</div>
		</Popover>
	);
}

export default Filter;
