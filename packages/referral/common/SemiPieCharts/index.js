import { ResponsivePie } from '@cogoport/charts/pie';
import { cl } from '@cogoport/components';

import styles from './styles.module.css';

function SemiPieChart({ usersData = [] }) {
	const totalCount = usersData.reduce((total, item) => total + (item?.value || 0), 0);
	return (
		<div className={styles.wrapper}>

			{totalCount === 0 && (
				<div className={styles.bar_over_flow}>
					<div className={styles.bar} />
				</div>
			)}

			<div className={cl`${styles.view} ${totalCount === 0 ? styles.empty_count : styles.non_empty_count}`}>
				<div className={styles.total_count}>{totalCount}</div>
				<div className={styles.sub_text}>Total Users </div>
			</div>

			{totalCount !== 0 && (
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
			)}
		</div>

	);
}

export default SemiPieChart;
