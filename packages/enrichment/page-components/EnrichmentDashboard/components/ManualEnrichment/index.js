import { TabPanel, Tabs } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import Header from '../../commons/Header';
import TableComponent from '../../commons/TableComponent';
import useEnrichmentStats from '../../hooks/useEnrichmentStats';
import getEnrichmentTableColumns from '../../utils/get-enrichment-table-columns';
import { getSecondaryTabOptions } from '../../utils/secondary-tabs-mapping';

import EnrichmentStats from './components/EnrichmentStats';

function ManualEnrichment(props) {
	const {
		refetch = () => {},
		list = [],
		paginationData = {},
		loading = false,
		setParams = () => {},
		getNextPage = () => {},
		columns = [],
		debounceQuery,
		searchValue,
		setSearchValue,
		primaryTab = '',
		secondaryTab = '',
		setSecondaryTab = () => {},
		authRoleId = '',
	} = props;

	const { stats = {}, loading: loadingStats = false, refetchStats = () => {} } = useEnrichmentStats();

	const SECONDARY_TAB_OPTIONS = getSecondaryTabOptions();

	const options = Object.values(SECONDARY_TAB_OPTIONS);

	const filteredColumns = getEnrichmentTableColumns({ secondaryTab, authRoleId, columns });

	return (
		<div>

			<Header
				refetch={refetch}
				refetchStats={refetchStats}
				debounceQuery={debounceQuery}
				searchValue={searchValue}
				setSearchValue={setSearchValue}
				setParams={setParams}
				primaryTab={primaryTab}
				authRoleId={authRoleId}
			/>

			<EnrichmentStats stats={stats} loadingStats={loadingStats} />

			<div>
				<Tabs
					activeTab={secondaryTab}
					fullWidth
					onChange={setSecondaryTab}
					themeType="primary"
				>
					{(options || []).map((option) => {
						const { title = '', key = '' } = option;

						return (
							<TabPanel
								name={key}
								key={key}
								title={startCase(title)}
							>
								<TableComponent
									columns={filteredColumns}
									list={list}
									loading={loading}
									paginationData={paginationData}
									getNextPage={getNextPage}
								/>
							</TabPanel>
						);
					})}

				</Tabs>
			</div>

		</div>
	);
}

export default ManualEnrichment;
