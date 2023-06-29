import { Input, Popover, cl } from '@cogoport/components';
import { IcMFilter, IcMSearchlight } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import { getSubTabsMapping } from '../../../../../configurations/getSubTabsMapping';
import FilterComponents from '../../FilterComponents';

import styles from './styles.module.css';

function SubTabs({ activeSubTab, setActiveSubTab, viewType, setAppliedFilters }) {
	const SUB_TAB_MAPPING = getSubTabsMapping({ viewType });

	return (
		<div className={styles.parent_tab_div}>
			{SUB_TAB_MAPPING.map((eachTab = {}) => (
				<div
					role="presentation"
					className={cl`${styles.each_tab_flex} ${
						activeSubTab === eachTab?.name ? styles.active_tab_styles : ''}`}
					key={eachTab?.name}
					onClick={() => {
						setActiveSubTab(eachTab?.name);
						setAppliedFilters({});
					}}
				>
					{eachTab.icon || null}
					<text className={styles.label}>{eachTab.label}</text>
				</div>
			))}
		</div>
	);
}

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
					{(!isEmpty(appliedFilters))
					&& <div className={styles.filters_applied} />}
				</div>
			</div>
		</>
	);
}

export default Header;
