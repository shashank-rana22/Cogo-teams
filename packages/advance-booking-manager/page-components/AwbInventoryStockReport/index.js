import { useState, useEffect } from 'react';

import { functions } from '../../commons/Functions';
import Layout from '../../commons/Layout';
import List from '../../commons/List';
import controls from '../../configurations/add-awb-inventory-stock-controls';
import { AwbInventoryStockReportFields } from '../../configurations/awb-inventory-stock-report-fields';

import styles from './styles.module.css';

function AwbInventoryStockReport({
	data,
	loading,
	page,
	setPage,
	finalList,
	setFinalList,
	control,
	errors,
	setFilterData,
}) {
	const [filter, setFilter] = useState({});
	const inventory_stock_controls = controls(setFilter);
	const { fields } = AwbInventoryStockReportFields;

	useEffect(() => {
		setFilterData(filter);
	}, [filter, setFilterData]);

	return (
		<div className={styles.stock_report_container}>

			<header className={styles.header_container}>
				<div className={styles.heading}>Inventory Stock</div>
			</header>

			<Layout
				fields={inventory_stock_controls}
				control={control}
				errors={errors}
			/>

			<List
				fields={fields}
				data={data}
				loading={loading}
				functions={functions}
				page={page}
				setPage={setPage}
				finalList={finalList}
				setFinalList={setFinalList}
			/>
		</div>

	);
}
export default AwbInventoryStockReport;
