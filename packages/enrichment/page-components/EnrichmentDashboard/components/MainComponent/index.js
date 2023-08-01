import { TabPanel, Tabs } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import TableComponent from '../../../../common/TableComponent';
import getEnrichmentTableColumns from '../../utils/get-enrichment-table-columns';
import getSecondaryTabOptions from '../../utils/secondary-tabs-mapping';

import EnrichmentStats from './EnrichmentStats';

function MainComponent(props) {
	const {
		list = [],
		paginationData = {},
		loading = false,
		getNextPage = () => {},
		columns = [],
		secondaryTab = '',
		setSecondaryTab = () => {},
		authRoleId = '',
		stats = {},
		loadingStats = false,

	} = props;

	const SECONDARY_TAB_OPTIONS = getSecondaryTabOptions({ stats });

	const options = Object.values(SECONDARY_TAB_OPTIONS);

	const filteredColumns = getEnrichmentTableColumns({ secondaryTab, authRoleId, columns });

	return (
		<div>

			<EnrichmentStats stats={stats} loadingStats={loadingStats} />

			<div>
				<Tabs
					activeTab={secondaryTab}
					fullWidth
					onChange={setSecondaryTab}
					themeType="primary"
				>
					{(options || []).map((option) => {
						const { title = '', key = '', value = '' } = option;

						return (
							<TabPanel
								name={key}
								key={key}
								title={startCase(title)}
								badge={value}
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

export default MainComponent;
