import { TabPanel, Tabs } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import { startCase } from '@cogoport/utils';

import Header from '../../commons/Header';
import TableComponent from '../../commons/TableComponent';
import useEnrichmentStats from '../../hooks/useEnrichmentStats';
import { getSecondaryTabOptions } from '../../utils/secondary-tabs-mapping';

import EnrichmentStats from './components/EnrichmentStats';

const geo = getGeoConstants();

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

						const is_manager_role = geo.uuid.third_party_enrichment_agencies_rm_ids.includes(authRoleId);

						let allowedColumns = geo.navigations
							.enrichment.manual_enrichment.columns.agent_view?.[secondaryTab];

						if (is_manager_role) {
							allowedColumns = geo.navigations
								.enrichment.manual_enrichment.columns.relationship_manager_view?.[secondaryTab];
						}

						const filteredColumns = columns.filter((listItem) => allowedColumns?.includes(listItem.id));

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
