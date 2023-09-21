import { ResponsivePie } from '@cogoport/charts/pie';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const DEFAULT_LENGTH = 1;

const GRAPH_TITLE = {
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
		let label = startCase(graphInfoKey);
		let id = label;

		if (key === 'weekly_forecasts') {
			const parsedGraphInfoKey = JSON.parse(graphInfoKey);
			id = getDateLabel(parsedGraphInfoKey);
			label = id;
		}

		if (key === 'container_size_forecasts') {
			label += ' ft';
		}

		if (key === 'container_type_forecasts' && graphInfoKey === 'refer') {
			label = 'Reefer';
		}

		if (key === 'persona_forecasts') {
			label = label.toUpperCase();
		}

		return {
			id,
			label,
			value: graphInfo[graphInfoKey],
		};
	});

	return graphData;
};

const GRAPH_COLOR_MAPPING = {
	weekly_forecasts         : ['#CFEAED', '#ACDADF', '#63BEC8', '#F3FAFA'],
	container_type_forecasts : ['#E8BE95', '#FBD1A6', '#A87441', '#C26D1A', '#F9AE64', '#FEF3E9'],
	container_size_forecasts : ['#DDEBC0', '#C4DC91', '#ABCD62', '#F7FAEF'],
	persona_forecasts        : ['#CED1ED', '#ABB0DE', '#9BA0CB', '#7278AD', '#F2F3FA'],
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
			Object.keys(GRAPH_TITLE).map((key) => {
				const graphicalData = getGraphData({ graphInfo: data[key], key });

				const colors = GRAPH_COLOR_MAPPING[key];

				return (
					<div key={graphicalData.id} className={styles.single_chart_container}>
						<div className={styles.title}>
							{GRAPH_TITLE[key]}
						</div>

						<div className={styles.graph}>
							<ResponsivePie
								loading={loading}
								data={graphicalData}
								innerRadius={0.8}
								margin={{ top: 20, bottom: 20, right: 20, left: 20 }}
								activeOuterRadiusOffset={6}
								enableArcLinkLabels={false}
								enableArcLabels={false}
								colors={colors}
								colorBy="index"
								layers={['arcs', 'arcLabels', 'arcLinkLabels', 'legends', CenteredMetric]}
							/>
						</div>

						<div className={styles.legends_container}>
							{graphicalData.map((legend, index) => (
								<div key={legend.key} className={styles.legend_info}>
									<div style={{ display: 'flex', alignItems: 'center' }}>
										<div
											className={styles.circle}
											style={{ background: `${colors[index]}` }}
										/>
										{legend?.label}
									</div>
									<div style={{ textAlign: 'center' }}>
										(
										{' '}
										{legend?.value}
										{' '}
										TEUs)
									</div>
								</div>

							))}
						</div>
					</div>
				);
			})
			}
		</div>
	);
}

export default Graph;
