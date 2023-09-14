import { Popover, InputNumber } from '@cogoport/components';
import { IcMFilter, IcMSearchlight } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import CallsFilterComponents from './CallsFilterComponent';
import styles from './styles.module.css';

function CallsHeader({
	appliedFilters = {},
	setAppliedFilters = () => {},
	searchValue = '',
	setSearchValue = () => {},
}) {
	const [filterVisible, setFilterVisible] = useState(false);

	return (
		<div className={styles.header_container}>
			<div className={styles.source_types}>
				<InputNumber
					size="sm"
					prefix={<IcMSearchlight width={18} height={18} />}
					placeholder="Enter Mobile Number..."
					value={searchValue}
					onChange={setSearchValue}
					arrow={false}
				/>
			</div>
			<div className={styles.filter_icon}>
				<Popover
					placement="right"
					render={(
						filterVisible && (
							<CallsFilterComponents
								setFilterVisible={setFilterVisible}
								appliedFilters={appliedFilters}
								setAppliedFilters={setAppliedFilters}
							/>
						)
					)}
					className={styles.styled_popover}
					visible={filterVisible}
					onClickOutside={() => setFilterVisible(false)}
				>
					<IcMFilter
						onClick={() => setFilterVisible((prev) => !prev)}
						className={styles.filter_icon}
					/>
				</Popover>
				{!isEmpty(appliedFilters) && <div className={styles.filters_applied} />}
			</div>
		</div>
	);
}

export default CallsHeader;
