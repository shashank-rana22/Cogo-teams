import { Popover } from '@cogoport/components';
import { IcMArrowDown } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import FilterContent from './FilterContent';
import styles from './styles.module.css';
import useFilterPopover from './useFilterPopover';

function FilterPopover({ filters, setFilters, activeTab }) {
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
			caret={false}
			placement="bottom"
			onClickOutside={() => setShowFilter(false)}
			visible={showFilter}
			render={(
				<FilterContent
					onClickReset={onClickReset}
					control={control}
					handleSubmit={handleSubmit}
					onSubmit={onSubmit}
					activeTab={activeTab}
				/>
			)}
		>
			<div
				role="presentation"
				className={styles.filters}
				onClick={() => {
					setShowFilter((pv) => !pv);
				}}
			>
				<div className={styles.filter_text}>
					{!isEmpty(filters) ? <div className={styles.dot} /> : null}
					Filter By
				</div>

				<IcMArrowDown
					width={16}
					height={16}
					className={` ${styles.caret_arrow} ${showFilter && styles.caret_active}`}
				/>
			</div>
		</Popover>
	);
}

export default FilterPopover;
