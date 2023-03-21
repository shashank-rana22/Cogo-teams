// import SearchInput from '@cogoport/../../../allocation/common/SearchInput';
import {
	Pagination,
	Input, Tabs, TabPanel, MultiSelect, Button, Table, IcMProfile, DateRangepicker,
} from '@cogoport/components';
import { AsyncSelectController, useForm } from '@cogoport/forms';
import { IcMDownload, IcMArrowRotateLeft, IcMArrowRotateRight } from '@cogoport/icons-react';
import { useAthenaRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import SearchInput from '../../../common/SearchInput';
import useSearch from '../hooks/useSearch';

import controls from './controls';
import useGetCountrylist from './countrylist';
import useGetCountrylistdest from './countrylistdest';
import EmptyState from './EmptyState';
import useGetports from './portlist';
import useGetportsdest from './portlistdest';
// import { IcMProfile } from '@cogoport/icons-react';

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
	const [value2, setValue2] = useState([]);
	const [activeTab2, setActiveTab2] = useState('Shipments');
	const [date, setDate] = useState('');
	const [answer, setAnswer] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [value3, setValue3] = useState([]);
	const [value4, setValue4] = useState([]);
	const [value5, setValue5] = useState([]);
	const [checked1, setChecked1] = useState([]);
	const [checked2, setChecked2] = useState([]);
	const [checked3, setChecked3] = useState([]);
	const [checked4, setChecked4] = useState([]);

	const formProps = useForm();

	const { control, watch } = formProps;

	const [{ loading = false, data: responseData = {} }, trigger] = useAthenaRequest({
		url    : 'shipments_by_hscode',
		method : 'post',
	}, { manual: true });

	const countryName = watch('country');
	const start_date = formatDate(date.startDate);
	const end_date = formatDate(date.endDate);

	const options2 = [
		{ label: 'Import', value: 'import' },
		{ label: 'Export', value: 'export' },
	];
	const options3 = [
		{ label: 'SEA', value: 'SEA' },
		{ label: 'AIR', value: 'AIR' },
	];
	const options4 = [
		{ label: 'CIF', value: 'CIF' },
		{ label: 'CF', value: 'CF' },
		{ label: 'CI', value: 'CI' },
		{ label: 'FOB', value: 'FOB' },
	];
	const options5 = [
		{ label: 'INDIA', value: 'INDIA' },
	];

	const handleClick = async (x) => {
		await trigger({
			data: {
				page       : x,
				page_limit : 100,
				sort_type  : 'desc',
				sort_by    : 'shipment_date',
				filters    : {
					hs_code             : searchValue || undefined,
					// origin_country      : !isEmpty(countryName) ? countryName : undefined,
					shipment_type       : value2 || undefined,
					shipment_mode       : value3 || undefined,
					incoterm            : value4 || undefined,
					origin_country      : checked1 || undefined,
					destination_country : checked2 || undefined,
					origin_port         : checked3 || undefined,
					destination_port    : checked4 || undefined,
				},
				start_date               : start_date || 'NaN-NaN-NaN',
				end_date                 : end_date || 'NaN-NaN-NaN',
				// total                    : localStorage.getItem('total') || 0,
				pagination_data_required : true,
			},
		});
	};
	const onPageChange = (pageNumber) => {
		handleClick(pageNumber);
	};

	const handleCheck1 = (e) => {
		let arr = [...checked1];
		if (e.target.checked) {
			arr = [...checked1, e.target.value];
		} else {
			arr.splice(checked1.indexOf(e.target.value), 1);
		}
		setChecked1(arr);
	};

	const handleCheck2 = (e) => {
		let arr = [...checked2];
		if (e.target.checked) {
			arr = [...checked2, e.target.value];
		} else {
			arr.splice(checked2.indexOf(e.target.value), 1);
		}
		setChecked2(arr);
	};

	const handleCheck3 = (e) => {
		let arr = [...checked3];
		if (e.target.checked) {
			arr = [...checked3, e.target.value];
		} else {
			arr.splice(checked3.indexOf(e.target.value), 1);
		}
		setChecked3(arr);
	};

	const handleCheck4 = (e) => {
		let arr = [...checked4];
		if (e.target.checked) {
			arr = [...checked4, e.target.value];
		} else {
			arr.splice(checked4.indexOf(e.target.value), 1);
		}
		setChecked4(arr);
	};

	const { params, pagination, setPagination } = useGetCountrylist();

	const handleCountryList = async (pageNumber) => {
		setPagination(pageNumber);
	};

	const { paramsdest, paginationdest, setPaginationdest } = useGetCountrylistdest();

	const handleCountryListDest = async (pageNumber) => {
		setPaginationdest(pageNumber);
	};

	const { ans, pg, setPg } = useGetports();
	const handlePorts = async (pageNumber) => {
		setPg(pageNumber);
	};

	const { ansdest, pgdest, setPgdest } = useGetportsdest();
	const handlePortsDest = async (pageNumber) => {
		setPgdest(pageNumber);
	};

	useEffect(() => {
		if (!isEmpty(responseData)) {
			setAnswer(responseData.list);
			// if (!localStorage.getItem('total')) localStorage.setItem('total', responseData.total);
		}
	}, [responseData]);

	// const [{ data: res = {} }] = useAthenaRequest({
	// 	url    : 'list_countries',
	// 	method : 'get',
	// }, { manual: true });

	// const [res = {}, triggerr] = useAthenaRequest({
	// 	url    : '/list_countries',
	// 	method : 'get',
	// }, { manual: true });
	// const list_countries = async () => {
	// 	const res = await triggerr();
	// };

	// useEffect(() => {
	// 	list_countries();
	// 	if (!isEmpty(res)) { setOptional(res.list); }
	// }, [res]);

	// const printhello = () => (
	// 	axios.get("urlname",
	// 	name: value1)
	// );

	// useEffect(() => {
	//   console.log(date);
	// }, [date]);

	// const options1 = (optional || []).map((item) => ({
	// 	label : item.origin_country,
	// 	value : item.origin_country,
	// }));

	const columns = [
		{ Header: 'Shipment Record ID', accessor: 'firstName' },
		{ Header: 'Importer Lead ID', accessor: 'secondName' },
		{ Header: 'Exporter Lead ID', accessor: 'thirdName' },
		{ Header: 'Shipment Mode', accessor: 'fourthName' },
		{ Header: 'Incoterm', accessor: 'fifthName' },
		{ Header: 'Origin Port', accessor: 'sixthName' },
		{ Header: 'Origin Country', accessor: 'seventhName' },
		{ Header: 'Destination Port', accessor: 'eighthName' },
		{ Header: 'Destination Country', accessor: 'ninthName' },
		{ Header: 'Shipment Date', accessor: 'tenthName' },
		{ Header: 'Shipment Value', accessor: 'eleventhName' },
		{ Header: 'Importer Lead Segment', accessor: 'twelvethName' },
		{ Header: 'Exporter Lead Segment', accessor: 'thirteenthName' },
		{ Header: 'HS Code', accessor: 'fourteenthName' },
	];

	const data = (answer || []).map((item) => ({
		firstName      : item.shipment_record_id,
		secondName     : item.importer_lead_id,
		thirdName      : item.exporter_lead_id,
		fourthName     : item.shipment_mode,
		fifthName      : item.incoterm,
		sixthName      : item.origin_port,
		seventhName    : item.origin_country,
		eighthName     : item.destination_port,
		ninthName      : item.destination_country,
		tenthName      : item.shipment_date,
		eleventhName   : item.shipment_value,
		twelvethName   : item.importer_lead_segment,
		thirteenthName : item.exporter_lead_segment,
		fourteenthName : item.hscodes.map((i) => `[${i.toString()}]`).join(', '),
	}));
	// 	{
	// 		firstName    : 'tandy',
	// 		secondName   : 'linsley',
	// 		thirdName    : 'Aryan',
	// 		fourthName   : 'Nitish',
	// 		fifthName    : 'sanjuli',
	// 		sixthName    : 'fdgfcgfg',
	// 		seventhName  : 'gfdgdfgc',
	// 		eighthName   : 'gfgfgf',
	// 		ninthName    : 'gdtfrdsdesa',
	// 		tenthName    : 'hghvgvgvgv',
	// 		eleventhName : 'xbdgvxchgdhxc',
	// 		twelvethName : 'vgsgxsgcxgvscx',
	// 	},
	// 	{
	// 		firstName    : 'joe',
	// 		secondName   : 'linsley',
	// 		thirdName    : 'Aryan',
	// 		fourthName   : 'Nitish',
	// 		fifthName    : 'sanjuli',
	// 		sixthName    : 'fdgfcgfg',
	// 		seventhName  : 'gfdgdfgc',
	// 		eighthName   : 'gfgfgf',
	// 		ninthName    : 'gdtfrdsdesa',
	// 		tenthName    : 'hghvgvgvgv',
	// 		eleventhName : 'xbdgvxchgdhxc',
	// 		twelvethName : 'vgsgxsgcxgvscx',

	// 	},
	// 	{
	// 		firstName    : 'joe',
	// 		secondName   : 'linsley',
	// 		thirdName    : 'Aryan',
	// 		fourthName   : 'Nitish',
	// 		fifthName    : 'sanjuli',
	// 		sixthName    : 'fdgfcgfg',
	// 		seventhName  : 'gfdgdfgc',
	// 		eighthName   : 'gfgfgf',
	// 		ninthName    : 'gdtfrdsdesa',
	// 		tenthName    : 'hghvgvgvgv',
	// 		eleventhName : 'xbdgvxchgdhxc',
	// 		twelvethName : 'vgsgxsgcxgvscx',

	// 	},
	// 	{
	// 		firstName    : 'joe',
	// 		secondName   : 'linsley',
	// 		thirdName    : 'Aryan',
	// 		fourthName   : 'Nitish',
	// 		fifthName    : 'sanjuli',
	// 		sixthName    : 'fdgfcgfg',
	// 		seventhName  : 'gfdgdfgc',
	// 		eighthName   : 'gfgfgf',
	// 		ninthName    : 'gdtfrdsdesa',
	// 		tenthName    : 'hghvgvgvgv',
	// 		eleventhName : 'xbdgvxchgdhxc',
	// 		twelvethName : 'vgsgxsgcxgvscx',

	// 	},
	// 	{
	// 		firstName    : 'joe',
	// 		secondName   : 'linsley',
	// 		thirdName    : 'Aryan',
	// 		fourthName   : 'Nitish',
	// 		fifthName    : 'sanjuli',
	// 		sixthName    : 'fdgfcgfg',
	// 		seventhName  : 'gfdgdfgc',
	// 		eighthName   : 'gfgfgf',
	// 		ninthName    : 'gdtfrdsdesa',
	// 		tenthName    : 'hghvgvgvgv',
	// 		eleventhName : 'xbdgvxchgdhxc',
	// 		twelvethName : 'vgsgxsgcxgvscx',

	// 	},
	// 	{
	// 		firstName    : 'joe',
	// 		secondName   : 'linsley',
	// 		thirdName    : 'Aryan',
	// 		fourthName   : 'Nitish',
	// 		fifthName    : 'sanjuli',
	// 		sixthName    : 'fdgfcgfg',
	// 		seventhName  : 'gfdgdfgc',
	// 		eighthName   : 'gfgfgf',
	// 		ninthName    : 'gdtfrdsdesa',
	// 		tenthName    : 'hghvgvgvgv',
	// 		eleventhName : 'xbdgvxchgdhxc',
	// 		twelvethName : 'vgsgxsgcxgvscx',

	// 	},
	// 	{
	// 		firstName    : 'joe',
	// 		secondName   : 'linsley',
	// 		thirdName    : 'Aryan',
	// 		fourthName   : 'Nitish',
	// 		fifthName    : 'sanjuli',
	// 		sixthName    : 'fdgfcgfg',
	// 		seventhName  : 'gfdgdfgc',
	// 		eighthName   : 'gfgfgf',
	// 		ninthName    : 'gdtfrdsdesa',
	// 		tenthName    : 'hghvgvgvgv',
	// 		eleventhName : 'xbdgvxchgdhxc',
	// 		twelvethName : 'vgsgxsgcxgvscx',

	// 	},
	// 	{
	// 		firstName    : 'joe',
	// 		secondName   : 'linsley',
	// 		thirdName    : 'Aryan',
	// 		fourthName   : 'Nitish',
	// 		fifthName    : 'sanjuli',
	// 		sixthName    : 'fdgfcgfg',
	// 		seventhName  : 'gfdgdfgc',
	// 		eighthName   : 'gfgfgf',
	// 		ninthName    : 'gdtfrdsdesa',
	// 		tenthName    : 'hghvgvgvgv',
	// 		eleventhName : 'xbdgvxchgdhxc',
	// 		twelvethName : 'vgsgxsgcxgvscx',

	// 	},
	// ];
	return (
		<div className={styles.wholepage}>
			<div className={styles.left_container}>
				{/* <input
					className={styles.search_bar}
					type="text"
					placeholder="Enter a product or a company name"
				/> */}

				<div className={styles.search_container}>
					<Input
						size="sm"
						placeholder="Enter a product name or a HS Code"
						onChange={setSearchValue}
						value={searchValue}
					/>
				</div>
				{/* very very important--- async select
				we do not have the lead source data from any country that is not India, which is why I'm commenting the async select and replacing it with just a dropdown having India as the only option. But if we get more data/ data from other countries in the future. Just remove the comment and async select should work fine. */}
				{/* {
					controls.map((controlItem) => {
						const el = { ...controlItem };

						return (
							<AsyncSelectController
								{...el}
								key={el.name}
								control={control}
								id={`${el.name}_input`}
								className={styles.asynccontroller}
							/>
						);
					})
				} */}
				<MultiSelect
					value={value5}
					onChange={setValue5}
					placeholder="Countries"
					options={options5}
					isClearable
					style={{ width: '150px' }}
					size="sm"
				/>
				{/* <MultiSelect
					value={value1}
					onChange={setValue1}
					placeholder="Select Countries"
					options={options1}
					isClearable
					style={{ width: '250px' }}
					size="sm"
				/> */}
				<MultiSelect
					value={value2}
					onChange={setValue2}
					placeholder="Shipment Type"
					options={options2}
					isClearable
					style={{ width: '200px' }}
					size="sm"
					className={styles.modeselect}
				/>
				<MultiSelect
					value={value3}
					onChange={setValue3}
					placeholder="Shipment Mode"
					options={options3}
					isClearable
					style={{ width: '200px' }}
					size="sm"
				/>

				<MultiSelect
					value={value4}
					onChange={setValue4}
					placeholder="Incoterm"
					options={options4}
					isClearable
					style={{ width: '150px' }}
					size="sm"
				/>

				{/* <button onClick={printhello}> B</button> */}

				<div className={styles.right_container}>
					<Button
						size="md"
						themeType="primary"
						onClick={() => handleClick(1)}
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
						<div>
							<Table
								className={styles.table}
								columns={columns}
								data={data}
							/>
							<Pagination
								type="number"
								currentPage={responseData.page}
								totalItems={responseData.total}
								pageSize={100}
								onPageChange={onPageChange}
							/>
						</div>
					) : (
						<EmptyState
							height={500}
							width={875}
							emptyText="Search for records above"
							textSize="24px"
							flexDirection="column"
						/>
					)}
					{/* {data && (
						<Pagination
							type="number"
							currentPage={responseData.page}
							totalItems={responseData.total}
							pageSize={100}
							onPageChange={onPageChange}
						/>
					)} */}
				</div>

				{/* <div className={styles.list_container}>
					<div className={styles.table_container}>
						<Table
							className={styles.request_table}
							data={list}
							loading={loading}
						/>
					</div>
				</div> */}

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
					{/* {
					controls.map((controlItem) => {
						const el = { ...controlItem };

						return (
							<AsyncSelectController
								{...el}
								key={el.name}
								control={control}
								id={`${el.name}_input`}
								className={styles.asynccontroller}
							/>
						);
					})
				} */}
					<div className={styles.leftpadding}>
						<div className={styles.microfilternames}> Origin country</div>
						<ul className={styles.ul}>
							{(params.list || []).map((CountryItem) => (
								<li className={styles.textalign}>
									<input key={CountryItem.id} type="checkbox" onChange={(e) => handleCheck1(e)} value={CountryItem.name.toUpperCase()} checked={checked1.includes(CountryItem.name.toUpperCase()) === true} />
									{' '}
									{CountryItem.name}
								</li>
							))}
						</ul>
						<Pagination
							type="compact"
							currentPage={pagination}
							totalItems={233}
							pageSize={10}
							onPageChange={handleCountryList}
						/>
						{/* <button type="button" className={styles.collapsible}>Show more...</button> */}
						{/* <div>
							<IcMArrowRotateLeft
								className={styles.rotatearrow}
								style={{ 'margin-right': '10px' }}
								onClick={() => handleCountryList()}
							/>
							<IcMArrowRotateRight className={styles.rotatearrow} />
						</div> */}
					</div>
					<div className={styles.leftpadding}>
						<div className={styles.microfilternames}> Destination Country</div>
						<ul className={styles.ul}>
							{(paramsdest.list || []).map((Item) => (
								<li className={styles.textalign}>
									<input key={Item.id} type="checkbox" onChange={(e) => handleCheck2(e)} value={Item.name.toUpperCase()} checked={checked2.includes(Item.name.toUpperCase()) === true} />
									{' '}
									{Item.name}
								</li>
							))}
						</ul>
						<Pagination
							type="compact"
							currentPage={paginationdest}
							totalItems={233}
							pageSize={10}
							onPageChange={handleCountryListDest}
						/>
					</div>
					<div className={styles.leftpadding}>
						<div className={styles.microfilternames}> Origin Port</div>
						<ul className={styles.ul}>
							{(ans.list || []).map((newItem) => (
								<li>
									<input key={newItem.id} type="checkbox" onChange={(e) => handleCheck3(e)} value={newItem.name.toUpperCase()} checked={checked3.includes(newItem.name.toUpperCase()) === true} />
									{' '}
									{newItem.name}
								</li>
							))}
						</ul>
						<Pagination
							type="compact"
							currentPage={pg}
							totalItems={7015}
							pageSize={10}
							onPageChange={handlePorts}
						/>
					</div>
					<div className={styles.leftpadding}>
						<div className={styles.microfilternames}> Destination Port</div>
						<ul className={styles.ul}>
							{(ansdest.list || []).map((Item) => (
								<li>
									<input key={Item.id} type="checkbox" onChange={(e) => handleCheck4(e)} value={Item.name.toUpperCase()} checked={checked4.includes(Item.name.toUpperCase()) === true} />
									{' '}
									{Item.name}
								</li>
							))}
						</ul>
						<Pagination
							type="compact"
							currentPage={pgdest}
							totalItems={7015}
							pageSize={10}
							onPageChange={handlePortsDest}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Shipment;
