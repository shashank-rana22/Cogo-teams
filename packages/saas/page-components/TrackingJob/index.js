import { Tabs, TabPanel, Popover, Button } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import { useState } from 'react';

import ListPagination from './common/ListPagination';
import useGetList from './hooks/useGetList';
import Filters from './pages-component/Filter';
import SearchFilters from './pages-component/Filter/Search/search';
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

	const onTabChange = (name) => {
		setActiveTab(name);
		setSearchString('');
		setSerialId('');
	};
	return (

		<div className={styles.main_container}>

			<div className={styles.filter_container}>
				<div>
					<h1>Tracking Job</h1>
				</div>
				<div className={styles.filter}>

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
							placement="right-end"
							theme="light"
							interactive
							content={(
								<Filters
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
			</div>

			<ListPagination filters={filters} setFilters={setFilters} data={data} />
			<Tabs
				activeTab={activeTab}
				themeType="primary"
				onChange={onTabChange}
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
	);
}
export default TrackingJob;
