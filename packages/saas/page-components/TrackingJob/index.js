import { Tabs, TabPanel, Popover, Button } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import { useState } from 'react';

import ListPagination from './common/ListPagination';
import useGetList from './hooks/useGetList';
import TagsFilter from './pages-component/TagsFilter';
import SearchFilters from './pages-component/TagsFilter/search';
import AirTracking from './pages-component/Tracking/AirTracking';
import OceanTracking from './pages-component/Tracking/OceanTracking';
import TruckTracking from './pages-component/Tracking/TruckTracking';
import styles from './styles.module.css';

function TrackingJob() {
	const [activeTab, setActiveTab] = useState('air_tracking');
	const {
		data,
		loading,
		filters,
		setFilters,
		searchString,
		serialId,
		setSearchString,
		setSerialId,
		refetch,
	} = useGetList({
		activeTab,
	});

	return (
		<div>
			<div style={{ margin: 20 }}>
				<h1>Tracking Job</h1>
				<div className={styles.filter_container}>
					<SearchFilters
						searchString={searchString}
						serialId={serialId}
						setSearchString={setSearchString}
						activeTab={activeTab}
						filters={filters}
						setFilters={setFilters}
						setSerialId={setSerialId}
					/>
					{activeTab === 'ocean_tracking' && (

						<Popover
							placement="auto-end"
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
							<Button themeType="secondary" size="lg">
								<IcMFilter />
								{' '}
								FILTERS
							</Button>
						</Popover>

					)}

				</div>

				<ListPagination filters={filters} setFilters={setFilters} data={data} />
				<Tabs
					activeTab={activeTab}
					themeType="primary"
					onChange={setActiveTab}
				>
					<TabPanel name="air_tracking" title="Air Tracking">
						<AirTracking
							list={data?.list}
							loading={loading}
							refetch={refetch}
							filters={filters}
							setFilters={setFilters}
						/>
					</TabPanel>
					<TabPanel name="ocean_tracking" title="Ocean Tracking">
						<OceanTracking
							list={data?.list}
							loading={loading}
							refetch={refetch}
							filters={filters}
							setFilters={setFilters}
						/>
					</TabPanel>
					<TabPanel name="truck_tracking" title="Surface Tracking">
						<TruckTracking
							list={data?.list}
							loading={loading}
							refetch={refetch}
							filters={filters}
							setFilters={setFilters}
						/>
					</TabPanel>
				</Tabs>
			</div>
		</div>
	);
}
export default TrackingJob;
