import { Popover } from '@cogoport/components';
import { IcMArrowDown } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import FilterContent from './FilterContent';
import styles from './styles.module.css';
import useFilterPopover from './useFilterPopover';

function FilterPopover({ filters, setFilters }) {
	const {
		showFilter, setShowFilter, topicOptions, tagOptions,
		control, handleSubmit, onSubmit, onClickReset, audienceOptions,
	} = useFilterPopover({ setFilters });

	return (
		<Popover
			caret={false}
			trigger="click"
			placement="bottom"
			visible={showFilter}
			onClickOutside={() => { setShowFilter(false); }}
			render={(
				<FilterContent
					onClickReset={onClickReset}
					topicOptions={topicOptions}
					tagOptions={tagOptions}
					control={control}
					handleSubmit={handleSubmit}
					onSubmit={onSubmit}
					audienceOptions={audienceOptions}
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
