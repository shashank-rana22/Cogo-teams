import { ResponsivePie } from '@cogoport/charts/pie';

import styles from './styles.module.css';

const BORDER_COLOR_MODIFIERS = 0.2;
const ARC_LABELS_TEXT_COLOR_MODIFIERS = 2;

function PieChart({ data = [], count = 0, heading = '', legendsData }) {
	const colors = data.map((item) => item.color);

	return (
		<div style={{
			display       : 'flex',
			flexDirection : 'column',
			flexBasis     : '33%',
			height        : '450px',
			background    : '#fff',
			padding       : '0',

		}}
		>
			<div style={{ fontWeight: 600, paddingLeft: '20px' }}>{heading}</div>

			<ResponsivePie
				colors={colors}
				data={data}
				margin={{
					top    : 0,
					right  : 110,
					bottom : 140,
					left   : 110,
				}}
				innerRadius={0.8}
				padAngle={0.7}
				cornerRadius={3}
				activeOuterRadiusOffset={8}
				borderWidth={1}
				borderColor={{
					from      : 'color',
					modifiers : [['darker', BORDER_COLOR_MODIFIERS]],
				}}
				enableArcLinkLabels={false}
				arcLinkLabelsSkipAngle={10}
				arcLinkLabelsTextColor="#333333"
				arcLinkLabelsThickness={2}
				arcLinkLabelsColor={{ from: 'color' }}
				arcLabelsSkipAngle={10}
				arcLabelsTextColor={{
					from      : 'color',
					modifiers : [['darker', ARC_LABELS_TEXT_COLOR_MODIFIERS]],
				}}
			/>

			{count
				? (
					<div style={{
						marginLeft    : '-3px',
						display       : 'flex',
						flexDirection : 'column',
						alignItems    : 'center',
						marginTop     : '-290px',
					}}
					>
						<div className={styles.predicted}>Predicted</div>
						<div className={styles.count}>
							{count}
							{' '}
							TEU
						</div>

					</div>
				) : null}
			<div style={{ marginTop: '100px', display: 'flex', flexWrap: 'wrap' }}>
				{legendsData.map((legend) => {
					const { color, label } = legend;
					return (
						<div key={label} style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
							<div style={{
								width        : '12px',
								height       : '12px',
								borderRadius : '50%',
								background   : `${color}`,
								marginRight  : '4px',
							}}
							/>
							{label}

						</div>
					);
				})}

			</div>
		</div>
	);
}

export default PieChart;
