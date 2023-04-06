import { useState } from 'react';

import tableDataColumns from '../../../constants/table-data-columns';
import useGetColumns from '../hooks/useGetColumns';
import useSearch from '../hooks/useSearch';

import Filter from './MacroFilters';
import ShipmentReport from './ShipmentReport';
import Sidebar from './Sidebar';
import styles from './styles.module.css';

function Shipment() {
	const [activeTab, setActiveTab] = useState('shipments');
	const {
		loading,
		date,
		setDate,
		response,
		control,
		handleClick,
		handleSubmit,
	} = useSearch();

	const columnsToShow = tableDataColumns.shipmentByHscode;

	const COLUMNS = useGetColumns({ columnsToShow });

	return (
		<>
			<Filter
				control={control}
				handleSubmit={handleSubmit}
				handleClick={handleClick}
				loading={loading}
			/>

			<div className={styles.main_container}>
				<Sidebar
					date={date}
					setDate={setDate}
					control={control}
				/>
				<ShipmentReport
					activeTab={activeTab}
					setActiveTab={setActiveTab}
					response={response}
					COLUMNS={COLUMNS}
					loading={loading}
				/>
			</div>
		</>
	);
}

export default Shipment;
