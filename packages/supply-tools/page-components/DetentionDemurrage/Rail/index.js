import { useState } from 'react';

import Invoice from '../common/Invoice';
import ListView from '../common/ListView';
import ShipmentTabs from '../common/ShipmentTabs';

import AddEdit from './AddEdit';
import Filter from './Filter';
import listFieldsColumns from './listFieldsColumns';
import styles from './styles.module.css';

const SHIPMENT_TYPE = 'rail_domestic_freight';
const LIST_INVOICE_DEFAULT_FILTERS = {
	shipment_type: SHIPMENT_TYPE,
};

function Rail({ activeShipment = '' }) {
	const [activeTab, setActiveTab] = useState('active');

	const listViewProps = { columns: listFieldsColumns };
	const invoiceProps = { listFilters: LIST_INVOICE_DEFAULT_FILTERS, shipment_type: SHIPMENT_TYPE };

	const tabMapping = {
		active   : <ListView {...listViewProps} />,
		inactive : <ListView {...listViewProps} />,
		invoice  : <Invoice {...invoiceProps} />,
	};

	return (
		<div className={styles.container}>
			<div>
				<h2>Rail Domestic</h2>

				<div className={styles.button_group_container}>
					<Filter />
					{activeTab === 'active' ? <AddEdit /> : null}
				</div>

			</div>

			<ShipmentTabs activeTab={activeTab} setActiveTab={setActiveTab} activeShipment={activeShipment} />

			{tabMapping[activeTab] ? tabMapping[activeTab] : null}
		</div>
	);
}

export default Rail;
