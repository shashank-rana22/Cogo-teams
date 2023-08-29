import { useState } from 'react';

import useListRailDomesticFreightRateFreeDays from '../../../hooks/useListRailDomesticFreightRateFreeDays';
import Invoice from '../common/Invoice';
import ListView from '../common/ListView';
import ShipmentTabs from '../common/ShipmentTabs';

import AddEdit from './AddEdit';
import Form from './AddEdit/Form';
import Filter from './Filter';
import listFieldsColumns from './listFieldsColumns';
import styles from './styles.module.css';

const SHIPMENT_TYPE = 'rail_domestic_freight';
const LIST_INVOICE_DEFAULT_FILTERS = {
	shipment_type: SHIPMENT_TYPE,
};

function Rail({ activeShipment = '' }) {
	const [activeTab, setActiveTab] = useState('active');

	const {
		data = {},
		setFilters = () => {},
		filters = {},
		loading,
	} = useListRailDomesticFreightRateFreeDays({ activeTab,	isApiTrigger: ['active', 'inactive'].includes(activeTab) });

	const listViewProps = { columns: listFieldsColumns, filters, setFilters, data, loading };

	const invoiceProps = { listFilters: LIST_INVOICE_DEFAULT_FILTERS, shipment_type: SHIPMENT_TYPE };

	const handleEditSubmit = (values) => console.log({ values }, 'EDIT RAIL');

	const tabMapping = {
		active   : <ListView {...listViewProps} EditForm={Form} handleSubmitForm={handleEditSubmit} />,
		inactive : <ListView {...listViewProps} EditForm={Form} handleSubmitForm={handleEditSubmit} />,
		invoice  : <Invoice {...invoiceProps} />,
	};

	return (
		<div className={styles.container}>
			<div>
				<h2>Rail Domestic</h2>

				<div className={styles.button_group_container}>
					<Filter filters={filters} setFilters={setFilters} />

					{activeTab === 'active' ? <AddEdit /> : null}
				</div>
			</div>

			<ShipmentTabs activeTab={activeTab} setActiveTab={setActiveTab} activeShipment={activeShipment} />

			{tabMapping[activeTab] ? tabMapping[activeTab] : null}
		</div>
	);
}

export default Rail;
