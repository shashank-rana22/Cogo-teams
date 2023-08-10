import { ResponsiveLine } from '@cogoport/charts/line';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcCFtick } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

import useGetRfqGraph from '../../../hooks/useGetRfqGraph';

import EmptyLineChart from './EmptyStateLineChart';
import LineChartLoader from './LoaderGraph';
import styles from './styles.module.css';

function Graph({ rfq_id = '' }) {
	const { getRfqGraph, data = {}, loading } = useGetRfqGraph();

	useEffect(() => {
		getRfqGraph({ rfq_id });
	}, [getRfqGraph, rfq_id]);

	const { graph_data = {}, shipment_booked = 0, contracts_created = '', revenue_generated = '' } = data;
	const { y_axis = [] } = graph_data;
	const { revenue_currency = '', revenue = '' } = revenue_generated || {};

	const legendsData = [
		{
			label: `${shipment_booked} Shipment Booked`,
		},
		{
			label: `${contracts_created} Contracts`,
		},
		{
			label: `${formatAmount({
				amount   : revenue,
				currency : revenue_currency,
				options  : {
					style                 : 'currency',
					currencyDisplay       : 'code',
					maximumFractionDigits : 0,
				},
			})} Revenue`,
		},
	];

	let graphPastMonthDatas = [];
	if (y_axis?.length > 0 && !loading) {
		graphPastMonthDatas = (y_axis || []).map((item) => ({
			x : item?.month,
			y : item?.count,
		}));
	}

	const graphValue = [{ id: 'shipment', data: graphPastMonthDatas }];

	return (
		<div className={styles.container}>
			{(isEmpty(graphPastMonthDatas) && !loading)
				? <EmptyLineChart />
				:			(
					<>
						<div className={styles.heading}>Past 12 Months Data</div>
						{loading ? <LineChartLoader /> : (
							<div className={styles.graph_container}>
								<ResponsiveLine
									width={380}
									height={120}
									data={graphValue}
									colors={['#FFEBAD']}
									margin={{ top: 15, right: 10, bottom: 35, left: 35 }}
									xScale={{ type: 'point' }}
									yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
									yFormat=" >-.2f"
									axisTop={null}
									axisRight={null}
									axisBottom={{
										tickSize    : 0,
										tickPadding : 20,
									}}
									axisLeft={{
										tickSize     : 0,
										orient       : 'left',
										tickValues   : 0,
										legend       : 'Volume',
										legendOffset : -25,

									}}
									pointSize={0}
									pointBorderWidth={2}
									pointBorderColor={{ from: 'serieColor' }}
									pointLabelYOffset={-12}
									enableArea
									areaOpacity={2}
									useMesh
									enableGridX={false}
									enableGridY={false}
									enablePoints={false}
									defs={[{
										id     : 'gradientC',
										type   : 'linearGradient',
										colors : [
											{ offset: 0, color: '#FFEBAD' },
											{ offset: 27, color: '#FFEBAD' },
											{ offset: 100, color: '#FFFFFF45' },
										],
									}]}
									fill={[
										{ match: '*', id: 'gradientC' },
									]}
									animate
									colorBy="id"
								/>
								<div className={styles.legend_sections}>
									{(legendsData || []).map((item) => (
										<div
											key={item?.label}
											className={styles.legends_section_part}
										>
											<IcCFtick fill="#C4DC91" />
											<p className={styles.legend_name}>{item.label}</p>
										</div>
									))}
								</div>
							</div>
						)}
					</>
				)}

		</div>
	);
}
export default Graph;
