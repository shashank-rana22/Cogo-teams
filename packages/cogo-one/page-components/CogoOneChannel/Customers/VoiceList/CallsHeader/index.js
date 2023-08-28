import { Input, Popover } from '@cogoport/components';
import { IcMFilter, IcMSearchlight } from '@cogoport/icons-react';
import { useState } from 'react';

import CallsFilterComponents from './CallsFilterComponent';
import styles from './styles.module.css';

function CallsHeader({ setSearchValue = () => {}, searchValue = '' }) {
	const [filterVisible, setFilterVisible] = useState(false);

	return (
		<div className={styles.header_container}>
			<div className={styles.source_types}>
				<Input
					size="sm"
					prefix={<IcMSearchlight width={18} height={18} />}
					placeholder="Search here..."
					value={searchValue}
					onChange={(val) => setSearchValue(val)}
				/>
			</div>
			<div className={styles.filter_icon}>
				<Popover
					placement="right"
					render={(
							filterVisible && (
								<CallsFilterComponents
									setFilterVisible={setFilterVisible}
									filterVisible={filterVisible}
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
				{/* {!isEmpty(appliedFilters) && <div className={styles.filters_applied} />}s */}
			</div>
		</div>
	);
}

export default CallsHeader;
