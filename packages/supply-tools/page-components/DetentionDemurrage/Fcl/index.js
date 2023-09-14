import { useState } from 'react';

import checkSlabsSatifyingDaysLimit from '../../../helpers/checkSlabsSatifyingDaysLimit';
import useListFclFreightRateFreeDays from '../../../hooks/useListFclFreightRateFreeDays';
import useUpdateFclFreightRateFreeDay from '../../../hooks/useUpdateFclFreightRateFreeDay';
import ListView from '../common/ListView';
import ShipmentTabs from '../common/ShipmentTabs';

import AddEdit from './AddEdit';
import Form from './AddEdit/Form';
import Filter from './Filter';
import listFieldsColumns from './listFieldsColumns';
import styles from './styles.module.css';

function Fcl({ activeShipment = '' }) {
	const [activeTab, setActiveTab] = useState('active');

	const {
		data = {},
		setFilters = () => {}, filters = {}, loading, refetch = () => {},
	} = useListFclFreightRateFreeDays({
		activeTab,
		isApiTrigger: ['active', 'inactive'].includes(activeTab),
	});

	const {
		apiTrigger = () => {},
		loading:createLoading = false,
	} = useUpdateFclFreightRateFreeDay({ refetch });

	const handleEditSubmit = ({ data:formValues = {}, item = {}, callBack = () => {} }) => {
		const isSatifyingDaysLimit = checkSlabsSatifyingDaysLimit({ data: formValues });

		if (isSatifyingDaysLimit) apiTrigger({ data: formValues, item, callBack });
	};

	const listViewProps = { filters, setFilters, data, columns: listFieldsColumns, loading, createLoading };

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
					{activeTab === 'active' ? <AddEdit refetchList={refetch} /> : null}
				</div>

			</div>

			<ShipmentTabs activeTab={activeTab} setActiveTab={setActiveTab} activeShipment={activeShipment} />

			{tabMapping[activeTab] ? tabMapping[activeTab] : null}
		</div>
	);
}

export default Fcl;
