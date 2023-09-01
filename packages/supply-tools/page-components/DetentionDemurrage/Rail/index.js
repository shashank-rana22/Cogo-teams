import { useState } from 'react';

import checkSlabsSatifyingDaysLimit from '../../../helpers/checkSlabsSatifyingDaysLimit';
import useListRailDomesticFreightRateFreeDays from '../../../hooks/useListRailDomesticFreightRateFreeDays';
import useUpdateRailDomesticFreightRateFreeDay from '../../../hooks/useUpdateRailDomesticFreightRateFreeDay';
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
		refetch = () => {},
	} = useListRailDomesticFreightRateFreeDays({ activeTab,	isApiTrigger: ['active', 'inactive'].includes(activeTab) });

	const {
		apiTrigger = () => {},
		loading:createLoading = false,
	} = useUpdateRailDomesticFreightRateFreeDay({ refetch });

	const handleEditSubmit = ({ data:formValues, item, callBack = () => {} }) => {
		const isSatifyingDaysLimit = checkSlabsSatifyingDaysLimit({ data: formValues });

		if (isSatifyingDaysLimit) apiTrigger({ data: formValues, item, callBack });
	};

	const listViewProps = { columns: listFieldsColumns, filters, setFilters, data, loading, createLoading };

	const invoiceProps = { listFilters: LIST_INVOICE_DEFAULT_FILTERS, shipment_type: SHIPMENT_TYPE };

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
					{['active', 'inactive'].includes(activeTab)
						? <Filter filters={filters} setFilters={setFilters} /> : null}

					{activeTab === 'active' ? <AddEdit refetchList={refetch} /> : null}
				</div>
			</div>

			<ShipmentTabs activeTab={activeTab} setActiveTab={setActiveTab} activeShipment={activeShipment} />

			{tabMapping[activeTab] ? tabMapping[activeTab] : null}
		</div>
	);
}

export default Rail;
