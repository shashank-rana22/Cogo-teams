import { ResponsiveLine } from '@cogoport/charts/line/index';
import { Table, Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';

import Map from '../../../common/responsive-choropleth';
import tableDataColumns from '../../../constants/table-data-columns';
import useGetColumns from '../hooks/useGetColumns';
import useSetReport from '../hooks/useSetReport';

import styles from './styles.module.css';

function Report() {
	const {
		hsdesc,
		share,
		marketshare,
		globalsupply,
		linegraphdata,
		shipmentValueMapData,
		marketShareChangeMapData,
		shipment_type,
		loading,
	} = useSetReport();

	const hscodesToShow = tableDataColumns.hsCodesDescription;
	const globalSuppliersToShow = tableDataColumns.topGlobalSuppliers;

	const COLUMNS_HSCODE_DESCRIPTION = useGetColumns({ columnsToShow: hscodesToShow });
	const TOP_GLOBAL_SUPPLIER_MAPPING = useGetColumns({ columnsToShow: globalSuppliersToShow });

	return (
		<>
			<div className={styles.report_heading}>
				Trend Report
			</div>
			{!loading ? hsdesc
				&& <Table className={styles.hscode_table} columns={COLUMNS_HSCODE_DESCRIPTION} data={hsdesc} />
				: <Placeholder height="100px" width="100%" />}
			<>
				<div className={styles.trending_over_time}>
					Trending Over Time:
				</div>
				{!loading ? (
					<div className={styles.responsive_line}>
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
					<Placeholder height="400px" width="100%" />
				)}

			</>
			<div className={styles.value_of_goods}>
				{shipment_type === 'import' ? 'Value of Goods (INR) entering India last year:'
					: 'Value of Goods (INR) leaving India last year'}
			</div>

			{!loading ? (
				<div className={styles.country_share}>
					<div className={styles.stats_panel}>
						{(share || []).map((item) => (
							<div className={styles.individual_stats} key={item.country}>
								{item.country}
								<div>
									Rs.
									{' '}
									{formatAmount({ amount: item.total, currency: GLOBAL_CONSTANTS.currency_code.INR })}
									{' '}
									(
									{item.percent_share.toFixed(2)}
									%
									)
								</div>
								<hr />
							</div>
						))}
					</div>

					<div className={styles.map_panel}>
						<Map data={shipmentValueMapData} style={{ marginLeft: '12px' }} />
					</div>
				</div>
			) : (
				<Placeholder height="400px" width="100%" />
			)}

			<div className={styles.value_of_goods} style={{ 'margin-top': '50px' }}>
				Change in market share last year:
			</div>
			{
						!loading ? (
							<div className={styles.country_share}>
								<div className={styles.stats_panel}>
									{
									(marketshare || []).map((item) => (
										<div className={styles.individual_stats} key={item.country}>
											{item.country}
											<div>
												(
												{item.percent_share.toFixed(2)}
												%
												)
											</div>
											<hr />
										</div>
									))
									}
								</div>

								<div className={styles.map_panel}>
									<Map
										data={marketShareChangeMapData}
										unknownColor="silver"
										lowerlimit="-50"
										upperlimit="50"
									/>
								</div>
							</div>
						) : (
							<Placeholder height="400px" width="100%" />
						)
					}

			<div className={styles.top_global_suppliers}>
				Top Global Suppliers:
			</div>
			{!loading ? (
				<div className={styles.global_supplier_table}>
					<Table
						columns={TOP_GLOBAL_SUPPLIER_MAPPING}
						data={globalsupply}
					/>
				</div>
			) : (
				<Placeholder height="600px" width="100%" />
			)}

		</>
	);
}

export default Report;
