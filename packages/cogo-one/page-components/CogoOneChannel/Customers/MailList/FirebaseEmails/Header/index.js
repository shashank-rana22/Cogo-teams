import { Input, Popover } from '@cogoport/components';
import { IcMFilter, IcMSearchlight } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import FILTER_CONTROLS from '../../../../../../configurations/email-filter-controls';
import FilterComponents from '../../../FilterComponents';

import styles from './styles.module.css';

function Header({
	searchValue = '',
	setSearchValue = () => {},
	viewType = '',
	tagOptions = [],
	setAppliedFilters = () => {},
	setIsBotSession = () => {},
	appliedFilters = {},
	isBotSession = false,
}) {
	const [filterVisible, setFilterVisible] = useState(false);

	return (
		<div className={styles.filters_container}>
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
								<FilterComponents
									setFilterVisible={setFilterVisible}
									filterVisible={filterVisible}
									appliedFilters={appliedFilters}
									setAppliedFilters={setAppliedFilters}
									setIsBotSession={setIsBotSession}
									showBotMessages={isBotSession}
									tagOptions={tagOptions}
									viewType={viewType}
									filterControls={FILTER_CONTROLS}
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

export default Header;
