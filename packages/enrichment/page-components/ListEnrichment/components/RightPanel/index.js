import { TabPanel, Tabs } from '@cogoport/components';
import { useState, useEffect } from 'react';

import { LIST_SECONDARY_COLUMNS_MAPPING } from '../../../../constants/get-table-columns';
import { tabPanelMapping } from '../../../../constants/tab-panels-mapping';
import Enrichment from '../Enrichment';

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
	} = props;

	const [secondaryTab, setSecondaryTab] = useState('submitted_requests');

	let filteredColumns = [];

	if (activeTab === 'requests_sent') {
		// eslint-disable-next-line max-len
		filteredColumns = columns.filter((listItem) => LIST_SECONDARY_COLUMNS_MAPPING[secondaryTab]?.includes(listItem.id));
	}

	useEffect(() => {
		setApiName('feedback_response_sheets');
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [secondaryTab]);

	return (

		<section className={styles.right_panel}>

			<Tabs
				activeTab={secondaryTab}
				themeType="secondary"
				onChange={setSecondaryTab}
			>

				{Object.values(tabPanelMapping).map((item) => (

					<TabPanel name={item.name} title={item.title}>

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
							showStatistics
						/>
					</TabPanel>
				))}
			</Tabs>
		</section>

	);
}

export default RightPanel;
