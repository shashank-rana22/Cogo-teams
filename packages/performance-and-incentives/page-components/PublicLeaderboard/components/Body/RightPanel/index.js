import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';

import LoadingState from '../../../../../common/LoadingState';

import Block from './Block';
import styles from './styles.module.css';
import useGetActivityCount from './useGetActivityCount';

function RightPanel(props) {
	const { view, dateRange } = props;

	const { data, loading } = useGetActivityCount({ view, dateRange });

	const { block_wise_stats: activityData } = data || {};

	if (loading) {
		return <div className={styles.container}><LoadingState /></div>;
	}

	if (isEmpty(activityData)) {
		return (
			<Image
				src={GLOBAL_CONSTANTS.image_url.empty_chart}
				width={300}
				height={300}
				alt="Empty Chart"
				className={styles.empty_img}
			/>
		);
	}

	return (
		<div className={styles.container}>
			{/* <p className={styles.heading}>ACTIVITY COUNT</p> */}

			<div className={styles.blocks}>
				{Object.entries(activityData || {}).map(([activity, block_data]) => (
					<Block
						key={activity}
						activity={activity}
						data={block_data}
					/>
				))}
			</div>
		</div>
	);
}

export default RightPanel;
