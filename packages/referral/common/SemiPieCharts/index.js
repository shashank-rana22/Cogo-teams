import { ResponsivePie } from '@cogoport/charts/pie';

import styles from './styles.module.css';

function SemiPieChart({ usersData = [] }) {
	return (
		<div className={styles.wrapper}>
			<div className={styles.view}>

				<div className={styles.number}>4000</div>

				<div className={styles.sub_text}>Total Users </div>

			</div>

			<div className={styles.chart_styles}>
				<ResponsivePie
					data={usersData}
					margin={{ top: 0, right: 0, bottom: 60, left: 0 }}
					startAngle={-103}
					endAngle={103}
					innerRadius={0.85}
					padAngle={2}
					cornerRadius={36}
					activeInnerRadiusOffset={13}
					activeOuterRadiusOffset={28}
					enableArcLinkLabels={false}
					arcLinkLabelsTextOffset={9}
					arcLinkLabelsOffset={-2}
					arcLinkLabelsDiagonalLength={18}
					arcLinkLabelsStraightLength={16}
					arcLinkLabelsThickness={3}
					enableArcLabels={false}
					arcLabelsRadiusOffset={0.35}
					arcLabelsSkipAngle={15}
					colors={{ datum: 'data.color' }}
					isInteractive={false}
				/>
			</div>

		</div>

	);
}

export default SemiPieChart;
