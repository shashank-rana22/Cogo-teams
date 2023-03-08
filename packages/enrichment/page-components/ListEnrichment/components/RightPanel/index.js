import { TabPanel, Tabs } from '@cogoport/components';

import { ENRICHMENT_TABS_MAPPING } from '../../../../constants/tab-panel-mapping';
import Enrichment from '../../common/Enrichment';
import useRightPanel from '../../hooks/useRightPanel';

import styles from './styles.module.css';

function RightPanel(props) {
	const {
		list,
		loading,
		paginationData,
		columns, getNextPage,
		activeTab,
		globalFilters,
		setGlobalFilters,
		debounceQuery,
		searchValue,
		setSearchValue,
		setApiName,
		setParams = () => {},
	} = props;

	const {
		secondaryTab, setSecondaryTab, filteredColumns,
	} =	 useRightPanel({ activeTab, columns, setParams, setApiName });

	return (

		<section className={styles.right_panel}>
			<Tabs
				activeTab={secondaryTab}
				themeType="secondary"
				onChange={setSecondaryTab}
			>
				{Object.values(ENRICHMENT_TABS_MAPPING).map((item) => (
					<TabPanel key={item.name} name={item.name} title={item.title}>
						<Enrichment
							list={list}
							loading={loading}
							paginationData={paginationData}
							columns={filteredColumns}
							getNextPage={getNextPage}
							activeTab={activeTab}
							globalFilters={globalFilters}
							setGlobalFilters={setGlobalFilters}
							debounceQuery={debounceQuery}
							searchValue={searchValue}
							setSearchValue={setSearchValue}
							showStatistics={false}
						/>
					</TabPanel>
				))}
			</Tabs>
		</section>

	);
}

export default RightPanel;
