import { IcMArrowBack } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function CardContent({ listData = {}, value }) {
	const PERCENTAGE_CHANGE = {
		count         : listData.percentage_count_change,
		average_score : listData.percentage_score_change,
	};

	const percentage_change = PERCENTAGE_CHANGE[value] || 0;

	return (
		<div className={styles.container}>
			<span className={styles.lable}>{startCase(value) || ''}</span>

			<div className={styles.value_container}>
				<span className={styles.value}>
					{listData?.[value] || ''}
				</span>

				<span style={{ display: 'flex' }}>
					{ percentage_change !== 0 ? (
						<IcMArrowBack
							width={20}
							height={20}
							style={{
								color: `${percentage_change > 0
									? '#34C759' : '#ED3726'}`,

								transform: `${percentage_change > 0
									? 'rotate(135deg)' : 'rotate(-45deg)'}`,
							}}
						/>
					) : null}

					<span style={{ marginLeft: '4px' }}>
						{Math.abs(percentage_change) || 0}
						%
					</span>
				</span>

			</div>
		</div>
	);
}

export default CardContent;
