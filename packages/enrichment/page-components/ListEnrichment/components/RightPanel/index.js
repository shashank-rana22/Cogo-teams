import { TabPanel, Tabs } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import { startCase } from '@cogoport/utils';

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
		partnerId = '',
		authRoleId,
	} = props;

	const geo = getGeoConstants();

	const ENRICHMENT_TABS = geo.navigations.enrichment.request_sent.tabs;

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
				{Object.values(ENRICHMENT_TABS).map((item) => (
					<TabPanel key={item} name={item} title={startCase(item)}>
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
							partnerId={partnerId}
							authRoleId={authRoleId}
						/>
					</TabPanel>
				))}
			</Tabs>
		</section>

	);
}

export default RightPanel;
