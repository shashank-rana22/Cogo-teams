import { Input, Popover } from '@cogoport/components';
import { IcMFilter, IcMSearchlight } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import FilterComponents from '../../FilterComponents';

import styles from './styles.module.css';
import SubTabs from './subTabs';

function Header({
	searchValue,
	setSearchValue,
	activeSubTab,
	setActiveSubTab,
	viewType,
	tagOptions,
	setAppliedFilters,
	setIsBotSession,
	appliedFilters,
	isBotSession,
}) {
	const [filterVisible, setFilterVisible] = useState(false);

	return (
		<>
			<SubTabs
				activeSubTab={activeSubTab}
				setActiveSubTab={setActiveSubTab}
				viewType={viewType}
				setAppliedFilters={setAppliedFilters}
				setIsBotSession={setIsBotSession}
			/>

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
									activeSubTab={activeSubTab}
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
		</>
	);
}

export default Header;
