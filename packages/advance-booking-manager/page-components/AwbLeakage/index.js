import { functions } from '../../commons/Functions';
import Layout from '../../commons/Layout';
import List from '../../commons/List';
import controls from '../../configurations/add-awb-inventory-stock-controls';
import awbLeakageFields from '../../configurations/awb-leakage-fields.json';

import styles from './styles.module.css';

function AwbLeakage({
	data = {},
	loading = false,
	page = 1,
	setPage = () => {},
	finalList = [],
	setFinalList = () => {},
	control = {},
	errors = {},
	setFilterData = () => {},
}) {
	const inventory_stock_controls = controls(setFilterData);

	return (
		<div className={styles.awb_leakage_container}>

			<header className={styles.header_container}>
				AWB Leakage
			</header>

			<Layout
				fields={inventory_stock_controls}
				control={control}
				errors={errors}
			/>

			<List
				fields={awbLeakageFields}
				list={data?.data?.awbInventoryData}
				totalCount={data?.data?.stats?.awbLeakageStockCount}
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
export default AwbLeakage;
