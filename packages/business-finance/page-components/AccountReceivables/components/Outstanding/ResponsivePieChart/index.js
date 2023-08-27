import { ResponsivePie } from '@cogoport/charts/pie/index';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
// import { useState } from 'react';

import { SERVICE_WISE_COLORS, KAM_WISE_COLORS } from '../../../constants/color';
// import EmptyState from '../EmptyState';
// import GraphListView from '../GraphListView';
// import PopoverLoader from '../PopoverLoader';

import PieChartLegends from './PieChartLegends';
import styles from './styles.module.css';

const TWO = 2;
const POINT_TWO = 0.2;
function ResponsivePieChart({
	data,
	heading,
	isKamWise,
	graphStyles,
	listTitle,
}) {
	const { legendPaddingTop } = graphStyles || {};
	// const [showListView, setShowListView] = useState(false);
	// const [isSortBy, setIsSortBy] = useState('');
	// const isEmpty = (data || []).every((el) => el.value === 0);
	const colors = isKamWise ? KAM_WISE_COLORS : SERVICE_WISE_COLORS;

	// const sortedData = [...data];

	// if (isSortBy === 'asc') {
	// 	(sortedData || []).sort((p1, p2) => Number(p1.value) - Number(p2.value));
	// } else if (isSortBy === 'desc') {
	// 	(sortedData || []).sort((p1, p2) => Number(p2.value) - Number(p1.value));
	// }

	function RenderBody() {
		return (
			<>
				<div className={styles.graph_wrapper}>
					<ResponsivePie
						data={data}
						margin={{
							top    : 20,
							right  : 0,
							bottom : 20,
							left   : 0,
						}}
						endAngle={-360}
						cornerRadius={3}
						activeOuterRadiusOffset={8}
						colors={colors}
						borderWidth={1}
						borderColor={{
							from      : 'color',
							modifiers : [['darker', POINT_TWO]],
						}}
						enableArcLinkLabels={false}
						enableArcLabels={false}
						arcLinkLabelsTextColor="#333333"
						arcLinkLabelsThickness={2}
						arcLinkLabelsColor="black"
						arcLabel="value"
						arcLabelsRadiusOffset={0.55}
						arcLabelsSkipAngle={5}
						arcLabelsTextColor={{
							from      : 'color',
							modifiers : [['darker', TWO]],
						}}
						tooltip={({ datum: { label, value, color } }) => (
							<div className={styles.tool_tip_div}>
								<div className={styles.tool_tip_title}>
									<div className={styles.color_dot} style={{ background: color || '#5936f0' }}> </div>
									{label}
									:
									<div className={styles.tool_tip_amount}>
										{formatAmount({
											amount   : value,
											currency : 'INR',
											options  : {
												style                 : 'currency',
												currencyDisplay       : 'symbol',
												maximumFractionDigits : 0,
											},
										})}
									</div>
								</div>
							</div>
						)}
					/>
				</div>
				<PieChartLegends
					data={data}
					colors={colors}
					legendPaddingTop={legendPaddingTop}
					listTitle={listTitle}
				/>
			</>
		);
	}
	return (
		<div>
			<div className={styles.flex}>
				<div className={styles.heading}>{heading}</div>
				{/* <Button
					className="secondary sm"
					onClick={() => setShowListView(!showListView)}
				>
					{showListView ? 'Graph View' : 'List View'}
				</Button> */}
			</div>
			<div className={styles.container}>{RenderBody()}</div>
		</div>
	);
}

export default ResponsivePieChart;
