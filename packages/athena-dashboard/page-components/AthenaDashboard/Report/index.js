import { ResponsiveLine } from '@cogoport/charts/line/index';
import { Loader, Table } from '@cogoport/components';
import { useAthenaRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { ResponsiveChoropleth } from '@nivo/geo';
import { useState, useEffect } from 'react';

import styles from './styles.module.css';
import countries from './world_countries.json';

function Report() {
	const { general } = useSelector((state) => state);
	const [answer, setAnswer] = useState([]);
	const [hsdesc, setHsdesc] = useState([]);
	const [optn, setOptn] = useState([]);
	const [optn2, setOptn2] = useState([]);
	const [info, setInfo] = useState([]);
	// const [firstRender, setFirstRender] = useState(false);
	// console.log(general.query.hscodes.split(','));
	console.log(info);
	// info.sort((a, b) => b.share - a.share);

	// setHscodearr(general.query.hscodes.split(','));

	const [{ loading = false, data: responseData = {} }, trigger] = useAthenaRequest({
		url    : 'commodity_trend_report',
		method : 'post',
		data   : {
			filters: { hs_code: general.query.hscodes !== undefined ? general.query.hscodes.split(',') : '', shipment_type: general.query.shipment_type !== undefined ? general.query.shipment_type : '' },
		},
	}, { manual: false });

	// const handleClick = async () => {
	// 	await trigger({
	// 		data: {
	// 			filters: { hs_code: general.query.hscodes.split(','), shipment_type: 'import' },
	// 		},
	// 	});
	// };

	// const callAPI = async () => {
	// 	await trigger({
	// 		data: {
	// 			filters: { commodity_name: general.query.hscodes.split(','), shipment_type: 'import' },
	// 		},
	// 	});
	// };

	useEffect(() => {
		if (!isEmpty(responseData)) {
			setAnswer(responseData.list);
			setHsdesc(responseData.description);
			setOptn(responseData.share);
			setOptn2(responseData.market_share);
			setInfo(responseData.global_supply);
		}
	}, [responseData]);

	const linedata = [
		{
			id    : 'India',
			color : 'hsl(1, 100%, 50%)',
			data  : (answer || []).map((Item) => ({
				x : Item.month_name,
				y : Item.total,
			})),
		},
	];
	const mapdata = (optn || []).map((Item) => ({
		id    : Item.country_code,
		value : Item.total,
	}));

	const mapdata2 = (optn2 || []).map((Item) => ({
		id    : Item.country_code,
		value : Item.percent_share.toFixed(2),
	}));

	// console.log(mapdata);

	const columns = [
		{ Header: 'HS CODE', accessor: 'hscode' },
		{ Header: 'Description', accessor: 'description' },
	];

	const columnstable2 = [
		{ Header: 'Country', accessor: 'country' },
		{ Header: 'Share', accessor: 'share' },
		{ Header: 'Trend', accessor: 'trend' },
		{ Header: 'Jan', accessor: 'january' },
		{ Header: 'Feb', accessor: 'february' },
		{ Header: 'Mar', accessor: 'march' },
		{ Header: 'Apr', accessor: 'april' },
		{ Header: 'May', accessor: 'may' },
		{ Header: 'Jun', accessor: 'june' },
		{ Header: 'July', accessor: 'july' },
		{ Header: 'Aug', accessor: 'august' },
		{ Header: 'Sept', accessor: 'september' },
		{ Header: 'Oct', accessor: 'october' },
		{ Header: 'Nov', accessor: 'november' },
		{ Header: 'Dec', accessor: 'december' },
	];
	const data2 = (info || []).map((item) => ({
		country : item.country,
		share   : `${item.percent_share.toFixed(2)}%`,
		trend   : <div style={{ height: '50px', width: '70px' }}>
			{/* <ResponsiveLine data={linedata2} /> */}
			<ResponsiveLine data={[
				{
					id   : item.country,
					data : [
						{
							x : 'January',
							y : item.January || 0,
						},
						{
							x : 'February',
							y : item.February || 0,
						},
						{
							x : 'March',
							y : item.March || 0,
						},
						{
							x : 'April',
							y : item.April || 0,
						},
						{
							x : 'May',
							y : item.May || 0,
						},
						{
							x : 'June',
							y : item.June || 0,
						},
						{
							x : 'July',
							y : item.July || 0,
						},
						{
							x : 'August',
							y : item.August || 0,
						},
						{
							x : 'September',
							y : item.September || 0,
						},
						{
							x : 'October',
							y : item.October || 0,
						},
						{
							x : 'November',
							y : item.November || 0,
						},
						{
							x : 'December',
							y : item.December || 0,
						},

					],
				},
			]}
			/>
		</div>,
		january   : (item.January !== undefined) ? item.January.toLocaleString('en-IN') : 0,
		february  : (item.February !== undefined) ? item.February.toLocaleString('en-IN') : 0,
		march     : (item.March !== undefined) ? item.March.toLocaleString('en-IN') : 0,
		april     : (item.April !== undefined) ? item.April.toLocaleString('en-IN') : 0,
		may       : (item.May !== undefined) ? item.May.toLocaleString('en-IN') : 0,
		june      : (item.June !== undefined) ? item.June.toLocaleString('en-IN') : 0,
		july      : (item.July !== undefined) ? item.July.toLocaleString('en-IN') : 0,
		august    : (item.August !== undefined) ? item.August.toLocaleString('en-IN') : 0,
		september : (item.September !== undefined) ? item.September.toLocaleString('en-IN') : 0,
		october   : (item.October !== undefined) ? item.October.toLocaleString('en-IN') : 0,
		november  : (item.November !== undefined) ? item.November.toLocaleString('en-IN') : 0,
		december  : (item.December !== undefined) ? item.December.toLocaleString('en-IN') : 0,
	}));
	console.log(data2);

	const data = (hsdesc || []).map((item) => ({
		hscode      : item.hs_code,
		description : item.category,
	}));
	return (
		(!responseData) ? <Loader className={styles.loader} />
			: (
				<div>
					{/* {arr.map((Item) => (
				<div>
					<h1>{Item}</h1>
				</div>
			))} */}
					{/* {callAPI()} */}
					<div className={styles.toptext}>
						Trend Report
					</div>
					<div>
						{hsdesc
				&& <Table className={styles.table} columns={columns} data={data} />}
					</div>
					<div>
						<div className={styles.trendingovertime}>
							Trending Over Time:
						</div>
						<div style={{ height: '400px', boxShadow: '10px 5px 5px rgb(239, 233, 233)' }}>
							<ResponsiveLine
								data={linedata}
								margin={{ top: 50, right: 110, bottom: 50, left: 100 }}
								xScale={{ type: 'point' }}
								yScale={{
									type    : 'linear',
									min     : 'auto',
									max     : 'auto',
									stacked : true,
									reverse : false,
								}}
								yFormat=" >-.2f"
								axisTop={null}
								axisRight={null}
								axisBottom={{
									orient         : 'bottom',
									tickSize       : 5,
									tickPadding    : 5,
									tickRotation   : 0,
									legend         : 'Month',
									legendOffset   : 36,
									legendPosition : 'middle',
								}}
								axisLeft={{
									orient         : 'left',
									tickSize       : 5,
									tickPadding    : 5,
									tickRotation   : 0,
									legend         : 'INR',
									legendOffset   : -80,
									legendPosition : 'middle',
								}}
								pointSize={10}
								pointColor={{ theme: 'background' }}
								pointBorderWidth={2}
								pointBorderColor={{ from: 'serieColor' }}
								pointLabelYOffset={-12}
								useMesh
								legends={[
									{
										anchor            : 'bottom-right',
										direction         : 'column',
										justify           : false,
										translateX        : 100,
										translateY        : 0,
										itemsSpacing      : 0,
										itemDirection     : 'left-to-right',
										itemWidth         : 80,
										itemHeight        : 20,
										itemOpacity       : 0.75,
										symbolSize        : 12,
										symbolShape       : 'circle',
										symbolBorderColor : 'rgba(0, 0, 0, .5)',
										effects           : [
											{
												on    : 'hover',
												style : {
													itemBackground : 'rgba(0, 0, 0, .03)',
													itemOpacity    : 1,
												},
											},
										],
									},
								]}
							/>
						</div>
					</div>
					<div className={styles.valueofgoods}>
						{general.query.shipment_type === 'import' ? 'Value of Goods (INR) entering India last year:' : 'Value of Goods (INR) leaving India last year'}
					</div>
					<div className={styles.secondtrend}>
						<div className={styles.wholecontainer}>
							{
				(optn || []).map((Item) => (
					<div className={styles.leftcontainer}>
						<div>{Item.country}</div>
						<div>
							Rs.
							{' '}
							{Item.total.toLocaleString('en-IN')}
							{' '}
							(
							{Item.percent_share.toFixed(2)}
							%
							)
						</div>
						<hr />
					</div>
				))
				}
						</div>

						<div style={{ height: '500px', width: '80%' }}>
							<ResponsiveChoropleth
								data={mapdata}
								features={countries.features}
								margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
								colors="nivo"
								domain={[0, 100000000]}
								unknownColor="white"
								label="properties.name"
								valueFormat=".2s"
								projectionTranslation={[0.5, 0.5]}
								projectionRotation={[0, 0, 0]}
								enableGraticule
								graticuleLineColor="#dddddd"
								borderWidth={0.5}
								borderColor="#152538"
								defs={[
									{
										id         : 'dots',
										type       : 'patternDots',
										background : 'inherit',
										color      : '#38bcb2',
										size       : 4,
										padding    : 1,
										stagger    : true,
									},
									{
										id         : 'lines',
										type       : 'patternLines',
										background : 'inherit',
										color      : '#eed312',
										rotation   : -45,
										lineWidth  : 6,
										spacing    : 10,
									},
									{
										id     : 'gradient',
										type   : 'linearGradient',
										colors : [
											{
												offset : 0,
												color  : '#000',
											},
											{
												offset : 100,
												color  : 'inherit',
											},
										],
									},
								]}
								fill={[
									{
										match: {
											id: 'CA',
										},
										id: 'dots',
									},
									{
										match: {
											id: 'CN',
										},
										id: 'lines',
									},
									{
										match: {
											id: 'AQ',
										},
										id: 'gradient',
									},
								]}
								legends={[
									{
										anchor        : 'bottom-left',
										direction     : 'column',
										justify       : true,
										translateX    : 20,
										translateY    : -100,
										itemsSpacing  : 0,
										itemWidth     : 94,
										itemHeight    : 18,
										itemDirection : 'left-to-right',
										itemTextColor : '#444444',
										itemOpacity   : 0.85,
										symbolSize    : 18,
										effects       : [
											{
												on    : 'hover',
												style : {
													itemTextColor : '#000000',
													itemOpacity   : 1,
												},
											},
										],
									},
								]}
							/>
						</div>
					</div>
					<div className={styles.valueofgoods} style={{ 'margin-top': '50px' }}>
						Change in market share last year:
					</div>
					<div className={styles.secondtrend}>
						<div className={styles.wholecontainer}>
							{
				(optn2 || []).map((Item) => (
					<div className={styles.leftcontainer}>
						<div>{Item.country}</div>
						<div>
							{Item.country}
							{' '}
							(
							{Item.percent_share.toFixed(2)}
							%
							)
						</div>
						<hr />
					</div>
				))
				}
						</div>

						<div style={{ height: '500px', width: '80%' }}>
							<ResponsiveChoropleth
								data={mapdata2}
								features={countries.features}
								margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
								colors="nivo"
								domain={[-50, 50]}
								unknownColor="silver"
								label="properties.name"
								valueFormat=".2s"
								projectionTranslation={[0.5, 0.5]}
								projectionRotation={[0, 0, 0]}
								enableGraticule
								graticuleLineColor="#dddddd"
								borderWidth={0.5}
								borderColor="#152538"
								defs={[
									{
										id         : 'dots',
										type       : 'patternDots',
										background : 'inherit',
										color      : '#38bcb2',
										size       : 4,
										padding    : 1,
										stagger    : true,
									},
									{
										id         : 'lines',
										type       : 'patternLines',
										background : 'inherit',
										color      : '#eed312',
										rotation   : -45,
										lineWidth  : 6,
										spacing    : 10,
									},
									{
										id     : 'gradient',
										type   : 'linearGradient',
										colors : [
											{
												offset : 0,
												color  : '#000',
											},
											{
												offset : 100,
												color  : 'inherit',
											},
										],
									},
								]}
								fill={[
									{
										match: {
											id: 'CA',
										},
										id: 'dots',
									},
									{
										match: {
											id: 'CN',
										},
										id: 'lines',
									},
									{
										match: {
											id: 'AQ',
										},
										id: 'gradient',
									},
								]}
								legends={[
									{
										anchor        : 'bottom-left',
										direction     : 'column',
										justify       : true,
										translateX    : 20,
										translateY    : -100,
										itemsSpacing  : 0,
										itemWidth     : 94,
										itemHeight    : 18,
										itemDirection : 'left-to-right',
										itemTextColor : '#444444',
										itemOpacity   : 0.85,
										symbolSize    : 18,
										effects       : [
											{
												on    : 'hover',
												style : {
													itemTextColor : '#000000',
													itemOpacity   : 1,
												},
											},
										],
									},
								]}
							/>
						</div>
					</div>
					<div className={styles.topglobalsuppliers}>
						Top Global Suppliers:
					</div>
					<div className={styles.tablecontainer}>
						<Table className={styles.table2} columns={columnstable2} data={data2} />
					</div>
				</div>
			)
	);
}

export default Report;
