import { ResponsivePie } from '@cogoport/charts/pie';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const DEFAULT_LENGTH = 1;

const GRAPH_TTTLE = {
	container_size_forecasts : 'Container Size Distribution',
	container_type_forecasts : 'Container Type Distribution',
	persona_forecasts        : 'Persona Distribution',
	weekly_forecasts         : 'Weekly Distribution',
};
const getDateLabel = (dates = []) => {
	let label = '';

	dates.forEach((date, index) => {
		const dateValue = formatDate({
			date,
			dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM'],
			formatType : 'date',
		});

		label += dateValue;

		if (index < dates.length - DEFAULT_LENGTH) {
			label += ' - ';
		}
	});

	return label;
};

const getGraphData = ({ graphInfo = {}, key }) => {
	const graphData = Object.keys(graphInfo).map((graphInfoKey) => {
		if (key === 'weekly_forecasts') {
			return {
				id    : getDateLabel(JSON.parse(graphInfoKey)),
				label : getDateLabel(JSON.parse(graphInfoKey)),
				value : graphInfo[graphInfoKey],
			};
		}
		return {
			id    : startCase(graphInfoKey),
			label : startCase(graphInfoKey),
			value : graphInfo[graphInfoKey],
		};
	});
	return graphData;
};

const GRAPH_COLOR_MAPPING = {
	weekly_forecasts         : ['#ACDADF', '#F3FAFA', '#CFEAED', '#63BEC8', '#ACDADF'],
	container_type_forecasts : ['#C26D1A', '#E8BE95', '#A87441', '#F9AE64', '#FEF3E9', '#FBD1A6'],
	container_size_forecasts : ['#DDEBC0', '#C4DC91', '#ABCD62', '#F7FAEF'],
	persona_forecasts        : ['#ABB0DE', '#CED1ED', '#9BA0CB', '#7278AD', '#F2F3FA'],
};

function Graph({
	data = {},
	loading = true,
	total_estimated_demand = '',
}) {
	function CenteredMetric({ centerX = '', centerY = '' }) {
		return (
			<text
				x={centerX}
				y={centerY}
				textAnchor="middle"
				dominantBaseline="central"
				className={styles.style_component_text}
			>
				Predicted
				<tspan x={centerX} dy="1.2em">
					{total_estimated_demand}
				</tspan>
			</text>
		);
	}

	return (
		<div className={styles.container}>
			{
			Object.keys(GRAPH_TTTLE).map((key) => {
				const graphicalData = getGraphData({ graphInfo: data[key], key });

				const colors = GRAPH_COLOR_MAPPING[key];

				return (
					<div key={key} className={styles.single_chart_container}>
						<div className={styles.title}>
							{GRAPH_TTTLE[key]}
						</div>
						<div className={styles.parent_asd}>
							<div className={styles.graph}>
								<ResponsivePie
									loading={loading}
									data={graphicalData}
									innerRadius={0.6}
									activeOuterRadiusOffset={6}
									enableArcLinkLabels={false}
									enableArcLabels={false}
									colors={colors}
									colorBy="index"
									layers={['arcs', 'arcLabels', 'arcLinkLabels', 'legends', CenteredMetric]}
								/>
							</div>
						</div>
						<div className={styles.legends}>
							{
							graphicalData.map((legend, index) => (
								<div key="123" className={styles.legend_info}>
									<div className={styles.legend_title}>
										<Logo backgroundColor={colors[index]} />
										<div>{legend?.label}</div>
									</div>

									<div className={styles.legend_value}>
										{legend?.value}
										{' '}
										TEUs
									</div>
								</div>
							))
}
						</div>
					</div>
				);
			})
			}

		</div>
	);
}

export default Graph;

function Logo({ backgroundColor = '' }) {
	const logoStyle = {
		width        : '16px',
		height       : '16px',
		marginRight  : '8px',
		backgroundColor,
		borderRadius : '50%',
	};

	return <div className={styles.logo} style={logoStyle} />;
}
