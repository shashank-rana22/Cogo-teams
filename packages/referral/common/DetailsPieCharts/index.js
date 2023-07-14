import { ResponsivePie } from '@cogoport/charts/pie';
import { IcCCogoCoin } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function DetailsPieCharts({
	title,
	data,
	totalCount,
}) {
	const isMilestonesEmpty = data?.every((item) => item.value === 0);

	return (
		<div className={styles.wrapper}>
			<div className={styles.view}>
				<div className={styles.count_container}>
					<IcCCogoCoin className={styles.coin_icon} />
					<div className={styles.chart_total_count}>{totalCount}</div>
				</div>

				<div className={styles.sub_text}>{title}</div>

			</div>
			{totalCount !== 0 && !isEmpty(data) && !isMilestonesEmpty ? (
				<div className={styles.chart_styles}>
					<ResponsivePie
						data={data}
						innerRadius={0.85}
						justify
						cornerRadius={1}
						enableArcLabels={false}
						enableArcLinkLabels={false}
						isInteractive={false}
						animate
						colors={{ datum: 'data.color' }}
					/>
				</div>

			) : (
				<div className={styles.styled_circle} />
			)}
		</div>
	);
}

export default DetailsPieCharts;
