import { IcMArrowBack } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function CardContent({ listData, value }) {
	const { percentage_count_change, percentage_score_change } = listData || {};

	const PERCENTAGE_CHANGE = {
		count         : percentage_count_change,
		average_score : percentage_score_change,
	};

	const percentage_change = PERCENTAGE_CHANGE[value] || 0;

	return (
		<div className={styles.container}>
			<span className={styles.lable}>{startCase(value) || ''}</span>

			<div className={styles.value_container}>
				<span className={styles.value}>
					{listData?.[value] || ''}
				</span>

				<div style={{ display: 'flex' }}>
					{ percentage_change !== 0 ? (
						<IcMArrowBack
							width={20}
							height={20}
							style={{
								color: percentage_change > 0
									? '#34C759' : '#ED3726',
								transform: percentage_change > 0
									? 'rotate(135deg)' : 'rotate(-45deg)',
							}}
						/>
					) : null}

					<div style={{ marginLeft: '4px' }}>
						{Math.abs(percentage_change)}
						%
					</div>
				</div>

			</div>
		</div>
	);
}

export default CardContent;
