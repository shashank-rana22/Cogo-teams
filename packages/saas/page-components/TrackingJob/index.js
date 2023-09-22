import { Tabs, TabPanel, Popover } from '@cogoport/components';
import { IcMArrowRotateDown, IcMDoubleFilter } from '@cogoport/icons-react';
import { useState } from 'react';

import ListPagination from './common/ListPagination';
import useGetList from './hooks/useGetList';
import TagsFilter from './TagsFilter';
import SearchFilters from './TagsFilter/search';
import AirTracking from './Tracking/AirTracking';
import OceanTracking from './Tracking/OceanTracking';
import TruckTracking from './Tracking/TruckTracking';

function TrackingJob() {
	const [activeTab, setActiveTab] = useState('air_tracking');
	const {
		data,
		loading,
		filters,
		setFilters,
		searchString,
		setSearchString,
		setSerialId,
		refetch,
	} = useGetList({
		activeTab,
	});

	return (
		<div>
			<div style={{ margin: 20 }}>
				<div>

					{activeTab === 'ocean_tracking' && (
						<div>
							<div>
								Priority
								<IcMArrowRotateDown />
							</div>

							<Popover
								placement="bottom"
								theme="light"
								interactive
								content={(
									<TagsFilter
										activeTab={activeTab}
										filters={filters}
										setFilters={setFilters}
									/>
								)}
							>
								<div>
									<IcMDoubleFilter />
									APPLY FILTERS
								</div>
							</Popover>
						</div>
					)}

				</div>
				<SearchFilters
					searchString={searchString}
					setSearchString={setSearchString}
					activeTab={activeTab}
					filters={filters}
					setFilters={setFilters}
					setSerialId={setSerialId}
				/>
				<ListPagination filters={filters} setFilters={setFilters} data={data} />
				<Tabs
					activeTab={activeTab}
					themeType="primary"
					onChange={setActiveTab}
				>
					<TabPanel name="air_tracking" title="Air Tracking">
						<AirTracking list={data?.list} loading={loading} refetch={refetch} />
					</TabPanel>
					<TabPanel name="ocean_tracking" title="Ocean Tracking">
						<OceanTracking list={data?.list} loading={loading} refetch={refetch} />
					</TabPanel>
					<TabPanel name="truck_tracking" title="Surface Tracking">
						<TruckTracking list={data?.list} loading={loading} refetch={refetch} />
					</TabPanel>
				</Tabs>
			</div>
		</div>
	);
}
export default TrackingJob;
