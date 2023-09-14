import { ResponsiveBar } from '@cogoport/charts/bar';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import getData from '../../../constants/get-default-graph-data';

import styles from './styles.module.css';

function ScoreDistributionGraph(props) {
	const { t } = useTranslation(['allocation']);

	const { graphData } = props;

	if (isEmpty(graphData)) {
		return null;
	}

	const data = getData({ t });

	const newData = (data || []).map((element) => {
		const datum = graphData.find((item) => element.warmth === item.warmth);

		return { ...element, ...(datum && { count: datum.count }) };
	});

	return (
		<div className={styles.container}>
			<ResponsiveBar
				data={newData}
				keys={['count']}
				indexBy="label"
				margin={{ top: 90, right: 60, bottom: 90, left: 150 }}
				padding={0.5}
				valueScale={{
					type: 'symlog', base: 10,
				}}
				colors={['#888FD1']}
				axisBottom={{
					tickSize       : 0,
					tickPadding    : 5,
					tickRotation   : 0,
					legend         : t('allocation:warmth_legend'),
					legendPosition : 'middle',
					legendOffset   : 60,
				}}
				axisLeft={{
					tickSize       : 0,
					tickPadding    : 5,
					tickRotation   : 0,
					legend         : t('allocation:accounts_legend'),
					legendPosition : 'middle',
					legendOffset   : -80,
					tickValues     : 1,
				}}
				enableGridX={false}
				enableLabel={false}
			/>
		</div>
	);
}

export default ScoreDistributionGraph;
