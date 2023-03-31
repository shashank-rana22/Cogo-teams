import { ResponsiveLine } from '@cogoport/charts/line/index';
import { Loader, Table, Placeholder } from '@cogoport/components';
import { ResponsiveChoropleth } from '@nivo/geo';

import tableDataColumns from '../../../constants/table-data-columns';
import useGetColumns from '../hooks/useGetColumns';
import useSetReport from '../hooks/useSetReport';

import styles from './styles.module.css';
import countries from './world_countries.json';

function Report() {
	const {
		hsdesc,
		share,
		marketshare,
		globalsupply,
		linegraphdata,
		shipmentValueMapData,
		marketShareChangeMapData,
		responseData,
		shipment_type,
		loading,
	} = useSetReport();
	const hscodesToShow = tableDataColumns.hsCodesDescription;
	const globalSuppliersToShow = tableDataColumns.topGlobalSuppliers;

	const columns_hscode_description = useGetColumns({ columnsToShow: hscodesToShow });
	const top_global_supplier_mapping = useGetColumns({ columnsToShow: globalSuppliersToShow });

	return (
		(!responseData) ? <Loader className={styles.loader} />
			: (
				<div>
					<div className={styles.top_text}>
						Trend Report
					</div>
					<div>
						{!loading ? hsdesc
				&& <Table className={styles.table} columns={columns_hscode_description} data={hsdesc} />
							: <Placeholder height="100px" width="100%" />}
					</div>
					<div>
						<div className={styles.trending_over_time}>
							Trending Over Time:
						</div>
						{!loading ? (
							<div style={{ height: '400px', boxShadow: '10px 5px 5px rgb(239, 233, 233)' }}>
								<ResponsiveLine
									data={linegraphdata}
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
						) : (
							<div>
								<Placeholder height="400px" width="100%" />
							</div>
						)}

					</div>
					<div className={styles.value_of_goods}>
						{shipment_type === 'import' ? 'Value of Goods (INR) entering India last year:'
							: 'Value of Goods (INR) leaving India last year'}
					</div>

					{!loading ? (
						<div className={styles.second_trend}>
							<div className={styles.whole_container}>
								{
								(share || []).map((Item) => (
									<div className={styles.left_container}>
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
									data={shipmentValueMapData}
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
					) : (
						<div>
							<Placeholder height="400px" width="100%" />
						</div>
					)}

					<div className={styles.value_of_goods} style={{ 'margin-top': '50px' }}>
						Change in market share last year:
					</div>
					{
						!loading ? (
							<div className={styles.second_trend}>
								<div className={styles.whole_container}>
									{
									(marketshare || []).map((Item) => (
										<div className={styles.left_container}>
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
										data={marketShareChangeMapData}
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
						) : (
							<div>
								<Placeholder height="400px" width="100%" />
							</div>
						)
					}

					<div className={styles.top_global_suppliers}>
						Top Global Suppliers:
					</div>
					{!loading ? (
						<div className={styles.tablecontainer}>
							<Table
								className={styles.global_supplier_table}
								columns={top_global_supplier_mapping}
								data={globalsupply}
							/>
						</div>
					) : (
						<div>
							<Placeholder height="600px" width="100%" />
						</div>
					)}

				</div>
			)
	);
}

export default Report;
