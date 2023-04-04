import { useState } from 'react';

import controls from '../../../configurations/shipment-controls';
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
				controls={controls}
				handleSubmit={handleSubmit}
				handleClick={handleClick}
				loading={loading}
			/>

			<div className={styles.main_container}>
				<Sidebar
					date={date}
					setDate={setDate}
					control={control}
					controls={controls}
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
