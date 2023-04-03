import {
	Select,
	Placeholder, Tabs, TabPanel, Button, Table, DateRangepicker,
} from '@cogoport/components';
import { InputController, MultiselectController, AsyncSelectController } from '@cogoport/forms';
import { IcMDownload } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import tableDataColumns from '../../../constants/table-data-columns';
import useGetColumns from '../hooks/useGetColumns';
import useSearch from '../hooks/useSearch';

import controls from './controls';
import EmptyState from './EmptyState';
import styles from './styles.module.css';

function Shipment() {
	const [activeTab, setActiveTab] = useState('Shipments');
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
		<div className={styles.whole_page}>
			<div className={styles.left_container}>

				<div className={styles.search_container}>
					<InputController
						placeholder="Enter a product name or a HS Code"
						name="hs_code"
						control={control}
					/>
				</div>

				{controls[1].map((Item) => {
					const ele = { ...Item };

					return (
						<MultiselectController
							{...ele}
							placeholder={ele.placeholder}
							options={ele.options}
							isClearable
							style={{ width: ele.width }}
							control={control}
						/>
					);
				})}

				<div className={styles.right_container}>
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

			</div>
			<div className={styles.lower_half}>
				<div className={styles.filter_tab}>
					<div className={styles.left_padding}>
						<div className={styles.date_range}>
							DATE RANGE
						</div>

						<div className={styles.from_to}>
							<div>From</div>
							<div className={styles.to}>To</div>
						</div>

						<div style={{ margin: '0px' }}>
							<DateRangepicker
								isPreviousDaysAllowed
								name="date"
								onChange={setDate}
								value={date}
							/>
						</div>
					</div>

					<div className={styles.left_padding}>
						{controls[0].map((Item) => {
							const el = { ...Item };
							return (
								<>
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
								</>
							);
						})}
					</div>
				</div>

				<div className={styles.table_and_tabs}>
					<div>
						<div className={styles.tab_lower}>
							<Tabs
								activeTab={activeTab}
								themeType="secondary"
								onChange={setActiveTab}
							>
								<TabPanel name="Shipments" title="Shipments" />
							</Tabs>
						</div>

						<div className={styles.export_info}>
							<div className={styles.shipment_report}>
								Shipment Report
							</div>

							<div className={styles.export_results}>
								<IcMDownload style={{ 'padding-right': '3px' }} />
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

					</div>

					{!isEmpty(answer) && !loading
						&& (
							<div className={styles.table_div}>
								<Table
									id="hellotable"
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
						<div>
							<Placeholder height="850px" width="868px" margin="50px 20px 20px 0px" />
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Shipment;
