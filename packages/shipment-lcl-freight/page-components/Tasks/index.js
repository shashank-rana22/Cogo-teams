import { TabPanel, Tabs } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { startCase } from '@cogoport/utils';
import { useContext, useState } from 'react';

import ShipmentView from './ShipmentView';
import styles from './styles.module.css';
import TaskView from './TaskView';

const SOURCE = ['consol', 'coload'];

function Tasks() {
	const { shipment_data = {} } = useContext(ShipmentDetailContext);
	const [activeTab, setActiveTab] = useState(shipment_data.source);
	return SOURCE.includes(shipment_data.source)
		? (
			<div className={styles.tab_container}>
				<Tabs activeTab={activeTab} onChange={setActiveTab} fullWidth>
					<TabPanel
						name={shipment_data.source}
						title={startCase(shipment_data.source)}
					>
						<TaskView />
					</TabPanel>
					<TabPanel name="shipment" title="Shipment">
						<ShipmentView />
					</TabPanel>
				</Tabs>
			</div>
		)
		: <TaskView />;
}

export default Tasks;
