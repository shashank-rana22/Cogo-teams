import {
	Loader,
	Pagination,
	Input, Tabs, TabPanel, MultiSelect, Button, Table, DateRangepicker,
} from '@cogoport/components';
import { AsyncSelectController, useForm } from '@cogoport/forms';
import { IcMDownload } from '@cogoport/icons-react';
import { useAthenaRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import destination_country from './destination_country_list';
import EmptyState from './EmptyState';
import origin_country from './origin_country_list';
import origin_port from './portlist';
import destination_port from './portlistdest';
import styles from './styles.module.css';

function formatDate(date) {
	const d = new Date(date);
	let month = `${d.getMonth() + 1}`;
	let day = `${d.getDate()}`;
	const year = d.getFullYear();
	if (month.length < 2) { month = `0${month}`; }
	if (day.length < 2) { day = `0${day}`; }
	return [year, month, day].join('-');
}

function Shipment() {
	const [shipmenttype, setShipmenttype] = useState([]);
	const [activeTab2, setActiveTab2] = useState('Shipments');
	const [date, setDate] = useState('');
	const [answer, setAnswer] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [shipmentmode, setShipmentmode] = useState([]);
	const [incotermvalue, setIncotermvalue] = useState([]);
	const [countryvalue, setCountryvalue] = useState([]);

	const formProps = useForm();

	const { control, watch } = formProps;

	const [{ loading = true, data: responseData = {} }, trigger] = useAthenaRequest({
		url    : 'shipments_by_hscode',
		method : 'post',
	}, { manual: true });

	const destinationCountry = watch('destination_country');
	const originCountry = watch('origin_country');
	const originPort = watch('origin_port');
	const destinationPort = watch('destination_port');
	const start_date = formatDate(date.startDate);
	const end_date = formatDate(date.endDate);

	const shipment_type_values = [
		{ label: 'Import', value: 'import' },
		{ label: 'Export', value: 'export' },
	];
	const shipment_mode_values = [
		{ label: 'SEA', value: 'SEA' },
		{ label: 'AIR', value: 'AIR' },
	];
	const incoterm_values = [
		{ label: 'CIF', value: 'CIF' },
		{ label: 'CF', value: 'CF' },
		{ label: 'CI', value: 'CI' },
		{ label: 'FOB', value: 'FOB' },
	];
	const country_values = [
		{ label: 'INDIA', value: 'INDIA' },
	];
	const showloader = () => {
		const l = document.getElementById('helloloader');
		if (l !== null) {
			l.style.display = 'block';
		}
	};

	const handleClick = async (x) => {
		await trigger({
			data: {
				page       : x,
				page_limit : 100,
				sort_type  : 'desc',
				sort_by    : 'shipment_date',
				filters    : {
					hs_code             : searchValue || undefined,
					shipment_type       : shipmenttype || undefined,
					shipment_mode       : shipmentmode || undefined,
					incoterm            : incotermvalue || undefined,
					origin_country      : originCountry.toString().toUpperCase() || undefined,
					destination_country : destinationCountry.toString().toUpperCase() || undefined,
					origin_port         : originPort.toString().toUpperCase() || undefined,
					destination_port    : destinationPort.toString().toUpperCase() || undefined,
				},
				start_date               : start_date || 'NaN-NaN-NaN',
				end_date                 : end_date || 'NaN-NaN-NaN',
				pagination_data_required : false,
			},
		});
	};

	useEffect(() => {
		if (!isEmpty(responseData)) {
			setAnswer(responseData.list);
			// if (!localStorage.getItem('total')) localStorage.setItem('total', responseData.total);
		}
	}, [responseData]);

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
					/>
				</div>
				<MultiSelect
					value={countryvalue}
					onChange={setCountryvalue}
					placeholder="Countries"
					options={country_values}
					isClearable
					style={{ width: '150px' }}
					size="sm"
				/>
				<MultiSelect
					value={shipmenttype}
					onChange={setShipmenttype}
					placeholder="Shipment Type"
					options={shipment_type_values}
					isClearable
					style={{ width: '200px' }}
					size="sm"
					className={styles.modeselect}
				/>
				<MultiSelect
					value={shipmentmode}
					onChange={setShipmentmode}
					placeholder="Shipment Mode"
					options={shipment_mode_values}
					isClearable
					style={{ width: '200px' }}
					size="sm"
				/>

				<MultiSelect
					value={incotermvalue}
					onChange={setIncotermvalue}
					placeholder="Incoterm"
					options={incoterm_values}
					isClearable
					style={{ width: '150px' }}
					size="sm"
				/>

				<div className={styles.right_container}>
					<Button
						size="md"
						themeType="primary"
						onClick={() => { handleClick(1); showloader(); }}
						disabled={loading}
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
								activeTab={activeTab2}
								themeType="secondary"
								onChange={setActiveTab2}
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
					) : (
						<div>
							<Loader id="helloloader" style={{ display: 'None' }} />
							<EmptyState
								height={500}
								width={875}
								emptyText="Search for records above"
								textSize="24px"
								flexDirection="column"
								style={{ display: 'block' }}
							/>

						</div>
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
						<div className={styles.microfilternames}> Origin country</div>
						{
					origin_country.map((Item) => {
						const el = { ...Item };

						return (
							<AsyncSelectController
								{...el}
								placeholder="Select country..."
								key={el.name}
								control={control}
								id={`${el.name}_input`}
								className={styles.controller}
							/>
						);
					})
				}
					</div>
					<div className={styles.leftpadding}>
						<div className={styles.microfilternames}> Destination Country</div>

						{
					destination_country.map((Item) => {
						const el = { ...Item };

						return (
							<AsyncSelectController
								{...el}
								placeholder="Select country..."
								key={el.name}
								control={control}
								id={`${el.name}_input`}
								className={styles.controller}
							/>
						);
					})
				}
					</div>
					<div className={styles.leftpadding}>
						<div className={styles.microfilternames}> Origin Port</div>

						{
					origin_port.map((Item) => {
						const el = { ...Item };

						return (
							<AsyncSelectController
								{...el}
								placeholder="Select Port..."
								key={el.name}
								control={control}
								id={`${el.name}_input`}
								className={styles.controller}
							/>
						);
					})
				}
					</div>
					<div className={styles.leftpadding}>
						<div className={styles.microfilternames}> Destination Port</div>

						{
					destination_port.map((Item) => {
						const el = { ...Item };

						return (
							<AsyncSelectController
								{...el}
								placeholder="Select Port..."
								key={el.name}
								control={control}
								id={`${el.name}_input`}
								className={styles.controller}
							/>
						);
					})
				}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Shipment;
