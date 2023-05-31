import { Popover } from '@cogoport/components';
import { IcMArrowDown, IcMSort } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import FilterContent from './FilterContent';
import styles from './styles.module.css';
import useFilterPopover from './useFilterPopover';

function FilterPopover({ filters, setFilters }) {
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
			caret
			placement="bottom"
			onClickOutside={() => setShowFilter(false)}
			visible={showFilter}
			render={(
				<FilterContent
					onClickReset={onClickReset}
					control={control}
					handleSubmit={handleSubmit}
					onSubmit={onSubmit}
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
				<IcMSort />

				<div className={styles.filter_text}>
					{!isEmpty(filters) ? <div className={styles.dot} /> : null}
					&nbsp;Sort By
				</div>
			</div>
		</Popover>
	);
}

export default FilterPopover;
