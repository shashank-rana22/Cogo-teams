import {
	Select,
	Placeholder, Tabs, TabPanel, Button, Table, DateRangepicker,
} from '@cogoport/components';
import { InputController, MultiselectController, AsyncSelectController } from '@cogoport/forms';
import { IcMDownload } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import EmptyState from '../../../common/EmptyState';
import controls from '../../../configurations/shipment-controls';
import tableDataColumns from '../../../constants/table-data-columns';
import useGetColumns from '../hooks/useGetColumns';
import useSearch from '../hooks/useSearch';

import styles from './styles.module.css';

function Shipment() {
	const [activeTab, setActiveTab] = useState('shipments');
	const {
		loading,
		date,
		setDate,
		answer,
		control,
		handleClick,
		handleSubmit,
	} = useSearch();

	const columnsToShow = tableDataColumns.shipmentByHscode;

	const COLUMNS = useGetColumns({ columnsToShow });

	return (
		<>
			<div className={styles.filter_container}>

				<div className={styles.search_bar}>
					<InputController
						placeholder="Enter a product name or a HS Code"
						name="hs_code"
						control={control}
					/>
				</div>

				{controls[1].map((item) => {
					const ele = { ...item };

					return (
						<MultiselectController
							{...ele}
							placeholder={ele.placeholder}
							options={ele.options}
							isClearable
							style={{ width: ele.width }}
							control={control}
							key={ele.name}
						/>
					);
				})}

				<Button
					size="md"
					themeType="primary"
					onClick={handleSubmit(handleClick)}
					disabled={loading}
					style={{ height: '40px' }}
				>
					Search
				</Button>

			</div>
			<div className={styles.main_container}>
				<div className={styles.advanced_filter_container}>
					<div style={{ paddingTop: '8px' }}>
						Date Range

						<div>
							<DateRangepicker
								isPreviousDaysAllowed
								name="date"
								onChange={setDate}
								value={date}
							/>
						</div>
					</div>

					{controls[0].map((item) => {
						const el = { ...item };
						return (
							<div key={el.name}>
								<div className={styles.microfilter_names}>
									{el.label}
								</div>

								<AsyncSelectController
									{...el}
									placeholder={el.placeholder}
									key={el.name}
									control={control}
									isClearable
									id={`${el.name}_input`}
									className={styles.controller}
								/>
							</div>
						);
					})}
				</div>

				<div className={styles.main_container_right}>
					<div className={styles.category_division}>
						<Tabs
							activeTab={activeTab}
							themeType="secondary"
							onChange={setActiveTab}
						>
							<TabPanel name="shipments" title="Shipments" />
						</Tabs>
					</div>

					<div className={styles.export_info}>
						<div className={styles.shipment_report}>
							Shipment Report
						</div>

						<div className={styles.export_results}>
							<IcMDownload style={{ 'padding-right': '4px' }} />
							Export Results
						</div>
					</div>

					<div className={styles.sort_by_box}>
						<div className={styles.sort_by}>
							Sort By
						</div>
						<div className={styles.select_box}>
							<Select
								value="Arrival date(newest first)"
								options={[{
									label : 'Shipment date (newest first)',
									value : 'Arrival date(newest first)',
								}]}
								disabled
							/>
						</div>

					</div>

					{!isEmpty(answer) && !loading
						&& (
							<div className={styles.table_container}>
								<Table
									className={styles.table}
									columns={COLUMNS}
									data={answer}
								/>
							</div>
						)}

					{ (isEmpty(answer) && !loading) && (
						<EmptyState
							height={350}
							width={600}
							emptyText="Search for records above"
							textSize="24px"
							flexDirection="column"
							style={{ display: 'block' }}
						/>
					)}

					{loading && (
						<Placeholder height="850px" width="868px" margin="50px 20px 20px 0px" />
					)}
				</div>
			</div>
		</>
	);
}

export default Shipment;
