import { TabPanel, Tabs } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import Header from '../../commons/Header';
import TableComponent from '../../commons/TableComponent';
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
	} = props;

	const SECONDARY_TAB_OPTIONS = getSecondaryTabOptions();

	const options = Object.values(SECONDARY_TAB_OPTIONS);

	return (
		<div>

			<Header
				refetch={refetch}
				debounceQuery={debounceQuery}
				searchValue={searchValue}
				setSearchValue={setSearchValue}
				setParams={setParams}
				primaryTab={primaryTab}
			/>

			<EnrichmentStats />

			<div>
				<Tabs
					activeTab={secondaryTab}
					fullWidth
					onChange={setSecondaryTab}
					themeType="primary"
				>
					{(options || []).map((option) => {
						const { title = '', key = '', hide_columns = [] } = option;

						const filteredColumns = columns.filter((listItem) => !hide_columns?.includes(listItem.id));

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
