import { Tabs, TabPanel } from '@cogoport/components';
import { useState } from 'react';

import AirTracking from './AirTracking';
import useGetList from './hooks/useGetList';
import OceanTracking from './OceanTracking';
import TruckTracking from './TruckTracking';

function TrackingJob() {
	const [activeTab, setActiveTab] = useState('air_tracking');
	const {
		data,
		loading,
		filters,
		setFilters,
	} = useGetList({
		activeTab,
	});

	return (
		<div>
			<div style={{ margin: 20 }}>
				<Tabs
					activeTab={activeTab}
					themeType="primary"
					onChange={setActiveTab}
				>
					<TabPanel name="air_tracking" title="Air Tracking">
						<AirTracking list={data?.list} loading={loading} />
					</TabPanel>

					<TabPanel name="ocean_tracking" title="Ocean Tracking">
						<OceanTracking list={data?.list} loading={loading} />
					</TabPanel>
					<TabPanel name="truck_tracking" title="Surface Tracking">
						<TruckTracking list={data?.list} loading={loading} />
					</TabPanel>
				</Tabs>
			</div>
		</div>
	);
}
export default TrackingJob;
