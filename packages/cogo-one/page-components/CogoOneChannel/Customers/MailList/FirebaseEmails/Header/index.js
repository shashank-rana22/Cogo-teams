import { Input, Popover, Button } from '@cogoport/components';
import { IcMFilter, IcMSearchlight } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import getFilterControls from '../../../../../../configurations/email-filter-controls';
import useListPlatformConfigConstants from '../../../../../../hooks/useListPlatformConfigConstants';
import FilterComponents from '../../../FilterComponents';
import SubTabs from '../../../MessageList/Header/subTabs';

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
	activeSubTab = '',
	setActiveSubTab = () => {},
	activeTab = '',
	sidFilter = '',
	resetSidFilter = () => {},
}) {
	const [filterVisible, setFilterVisible] = useState(false);

	const {
		listPlatformConfigConstants = () => {},
		configLoading = false,
		configData = [],
	} = useListPlatformConfigConstants({ keyName: 'COGOVERSE_TEAM_MAPPING' });

	useEffect(() => {
		listPlatformConfigConstants();
	}, [listPlatformConfigConstants]);

	return (
		<>
			<div className={styles.sub_tabs_wrapper}>
				<SubTabs
					activeSubTab={activeSubTab}
					setActiveSubTab={setActiveSubTab}
					viewType={viewType}
					setAppliedFilters={setAppliedFilters}
					setIsBotSession={setIsBotSession}
					activeTab={activeTab}
					hasSidFilter={!!sidFilter}
				/>
				{sidFilter	? (
					<div className={styles.flex_filter}>
						<div className={styles.applied_filters}>
							<span>{sidFilter}</span>
							SID filter is applied
						</div>
						<Button
							size="sm"
							themeType="linkUi"
							onClick={resetSidFilter}
						>
							clear
						</Button>
					</div>
				) : undefined}
			</div>
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
									filterControls={getFilterControls({
										configLoading,
										configData,
										viewType,
										activeSubTab,
									})}
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
