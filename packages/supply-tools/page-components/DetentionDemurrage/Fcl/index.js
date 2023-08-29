import { useState } from 'react';

import useListFclFreightRateFreeDays from '../../../hooks/useListFclFreightRateFreeDays';
import ListView from '../common/ListView';
import ShipmentTabs from '../common/ShipmentTabs';

import AddEdit from './AddEdit';
import Form from './AddEdit/Form';
import Filter from './Filter';
import listFieldsColumns from './listFieldsColumns';
import styles from './styles.module.css';

function Fcl({ activeShipment = '' }) {
	const [activeTab, setActiveTab] = useState('active');

	const { data = {}, setFilters = () => {}, filters = {}, loading } = useListFclFreightRateFreeDays({
		activeTab,
		isApiTrigger: ['active', 'inactive'].includes(activeTab),
	});

	const listViewProps = { filters, setFilters, data, columns: listFieldsColumns, loading };

	const handleEditSubmit = (values) => console.log({ values }, 'EDIT FCL');

	const tabMapping = {
		active   : <ListView {...listViewProps} EditForm={Form} handleSubmitForm={handleEditSubmit} />,
		inactive : <ListView {...listViewProps} EditForm={Form} handleSubmitForm={handleEditSubmit} />,
	};

	return (
		<div className={styles.container}>
			<div>
				<h2>FCL</h2>

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

export default Fcl;
