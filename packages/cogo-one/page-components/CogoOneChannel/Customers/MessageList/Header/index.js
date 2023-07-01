import { Input, Popover, cl } from '@cogoport/components';
import { IcMFilter, IcMSearchlight } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import { getSubTabsMapping } from '../../../../../configurations/getSubTabsMapping';
import { VIEW_TYPE_GLOBAL_MAPPING } from '../../../../../constants/viewTypeMapping';
import FilterComponents from '../../FilterComponents';

import styles from './styles.module.css';

const MORE_THAN_SINGLE_TAB = 2;

function SubTabs({ activeSubTab, setActiveSubTab, viewType, setAppliedFilters, setIsBotSession }) {
	const SUB_TAB_MAPPING = getSubTabsMapping({ viewType });

	const handleTabClick = ({ name }) => {
		setActiveSubTab(name);
		setAppliedFilters({});
		if (!VIEW_TYPE_GLOBAL_MAPPING[viewType].permissions?.bot_message_toggle) {
			setIsBotSession(false);
		}
	};
	if (SUB_TAB_MAPPING?.length < MORE_THAN_SINGLE_TAB) {
		return null;
	}

	return (
		<div className={styles.parent_tab_div}>
			{SUB_TAB_MAPPING.map((eachTab = {}) => (
				<div
					role="presentation"
					className={cl`${styles.each_tab_flex} ${
						activeSubTab === eachTab?.name ? styles.active_tab_styles : ''}`}
					key={eachTab?.name}
					onClick={() => handleTabClick({ name: eachTab?.name })}
				>
					<div className={styles.icon_styles}>{eachTab.icon || null}</div>
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
					{(!isEmpty(appliedFilters))
					&& <div className={styles.filters_applied} />}
				</div>
			</div>
		</>
	);
}

export default Header;
