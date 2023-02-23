import { Popover } from '@cogoport/components';
import { IcMArrowDown } from '@cogoport/icons-react';

import FilterContent from './FilterContent';
import styles from './styles.module.css';
import useFilterPopover from './useFilterPopover';

function FilterPopover({ setFilters }) {
	const {
		showFilter, setShowFilter, topicOptions, tagOptions,
		control, handleSubmit, onSubmit,
	} = useFilterPopover({ setFilters });

	return (
		<Popover
			caret={false}
			trigger="click"
			placement="bottom"
			render={(
				<FilterContent
					topicOptions={topicOptions}
					tagOptions={tagOptions}
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
					setShowFilter(!showFilter);
				}}
			>
				<div>Filter By</div>

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
