import { IcCStar } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function ListItem(props) {
	const { data = {}, index } = props;

	const { badge_details = [], expertise_score = [] } = data || undefined;

	const router = useRouter();

	return (
		<div
			key={data?.id}
			className={styles.card}
		>
			<div className={styles.card_description}>
				<div className={styles.card_description_left}>
					<div className={styles.index}>
						{index + 1}
					</div>
					<div>
						<div className={styles.kam_name}>
							{data.name}
						</div>
						<div>
							Total:
							{' '}
							<b>{data.score}</b>
						</div>
					</div>
				</div>
				<div className={styles.badge_container}>
					<div className={styles.badges}>
						{
							badge_details.map((value) => (
								<div key={value.id} className={styles.badge_item}>
									<img src={value.image_url} alt="badge" />
									<div className={styles.star}>
										{Array(3).fill('').map(() => (
											<IcCStar width={10} stroke="#FFDF33" />
										))}
									</div>
								</div>
							))
						}
					</div>
					<span className={styles.link}>
						{data?.milestone_mappings?.length > 2
							? (
								<span
									role="presentation"
									style={{ cursor: 'pointer' }}
									onClick={() => router.push('/badges')}
								>
									View More
								</span>
							) : null}
					</span>
				</div>

				<div className={styles.card_description_right}>
					{
                        expertise_score.map((expertise) => (
	<div className={styles.exp}>
		<div className={styles.expertise}>{startCase(expertise.expertise_type)}</div>
		<div><b>{expertise.score}</b></div>
	</div>
                        ))
                    }
				</div>
			</div>
		</div>
	);
}

export default ListItem;
