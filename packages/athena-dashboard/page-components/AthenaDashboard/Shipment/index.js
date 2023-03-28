import {
	Placeholder, Loader,
	Input, Tabs, TabPanel, Button, Table, DateRangepicker,
} from '@cogoport/components';
import { MultiselectController, AsyncSelectController } from '@cogoport/forms';
import { IcMDownload } from '@cogoport/icons-react';
import { useState } from 'react';

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
		searchValue,
		setSearchValue,
		control,
		handleClick,
		handleSubmit,
	} = useSearch();

	const columns = [
		{ Header: 'Shipment Record ID', accessor: 'shipment_record_id' },
		{ Header: 'Importer Lead ID', accessor: 'importer_lead_id' },
		{ Header: 'Exporter Lead ID', accessor: 'exporter_lead_id' },
		{ Header: 'Shipment Mode', accessor: 'shipment_mode' },
		{ Header: 'Incoterm', accessor: 'incoterm' },
		{ Header: 'Origin Port', accessor: 'origin_port' },
		{ Header: 'Origin Country', accessor: 'origin_country' },
		{ Header: 'Destination Port', accessor: 'destination_port' },
		{ Header: 'Destination Country', accessor: 'destination_country' },
		{ Header: 'Shipment Date', accessor: 'shipment_date' },
		{ Header: 'Shipment Value', accessor: 'shipment_value' },
		{ Header: 'Importer Lead Segment', accessor: 'importer_lead_segment' },
		{ Header: 'Exporter Lead Segment', accessor: 'exporter_lead_segment' },
		{ Header: 'HS Code', accessor: 'hscode' },
	];

	const data = (answer || []).map((item) => ({
		shipment_record_id    : item.shipment_record_id,
		importer_lead_id      : item.importer_lead_id,
		exporter_lead_id      : item.exporter_lead_id,
		shipment_mode         : item.shipment_mode,
		incoterm              : item.incoterm,
		origin_port           : item.origin_port,
		origin_country        : item.origin_country,
		destination_port      : item.destination_port,
		destination_country   : item.destination_country,
		shipment_date         : item.shipment_date,
		shipment_value        : item.shipment_value,
		importer_lead_segment : item.importer_lead_segment,
		exporter_lead_segment : item.exporter_lead_segment,
		hscode                : item.hscodes.map((i) => `[${i.toString()}]`).join(', '),
	}));
	return (
		<div className={styles.wholepage}>
			<div className={styles.left_container}>

				<div className={styles.search_container}>
					<Input
						size="sm"
						placeholder="Enter a product name or a HS Code"
						onChange={setSearchValue}
						value={searchValue}
						style={{ height: '40px' }}
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
			<div className={styles.lowerhalf}>
				<div className={styles.tableandtabs}>
					<div>
						<div className={styles.tablower}>
							<Tabs
								activeTab={activeTab}
								themeType="secondary"
								onChange={setActiveTab}
							>
								<TabPanel name="Shipments" title="Shipments" />

								<TabPanel name="Consignee" title="Consignee" />
								<TabPanel name="Shipper" title="Shipper" />
							</Tabs>
						</div>
						<div className={styles.exportinfo}>
							<div className={styles.shipmentreport}>
								Shipment Report
							</div>
							<div className={styles.exportresults}>
								<IcMDownload style={{ 'padding-right': '3px' }} />
								Export Results
							</div>
						</div>
						<div className={styles.sortbybox}>
							<div className={styles.sortby}>
								Sort By
							</div>

							<select className={styles.selectbox}>
								<option value="Arrival date(newest first)">Shipment date(newest first)</option>
							</select>
						</div>
					</div>
					{data.length !== 0 ? (
						<div className={styles.tablediv}>
							<Table
								id="hellotable"
								className={styles.table}
								columns={columns}
								data={data}
							/>
							{/* <Pagination
								type="number"
								currentPage={responseData.page}
								totalItems={responseData.total}
								pageSize={100}
								onPageChange={onPageChange}
							/> */}
						</div>
					) : (!loading ? (
						<div>
							<EmptyState
								height={500}
								width={875}
								emptyText="Search for records above"
								textSize="24px"
								flexDirection="column"
								style={{ display: 'block' }}
							/>

						</div>
					) : (
						<Placeholder height="850px" width="1050px" margin="50px 0px 20px 0px" />
					)
					)}
				</div>

				<div className={styles.filtertab}>
					<div className={styles.leftpadding}>
						<div className={styles.daterange}>
							DATE RANGE
						</div>
						<div className={styles.fromto}>
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
					<div className={styles.leftpadding}>

						{controls[0].map((Item) => {
							const el = { ...Item };

							return (
								<>
									<div className={styles.microfilternames}>
										{' '}
										{el.label}
									</div>

									<AsyncSelectController
										{...el}
										placeholder={el.placeholder}
										key={el.name}
										control={control}
										id={`${el.name}_input`}
										className={styles.controller}
									/>
								</>

							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Shipment;
