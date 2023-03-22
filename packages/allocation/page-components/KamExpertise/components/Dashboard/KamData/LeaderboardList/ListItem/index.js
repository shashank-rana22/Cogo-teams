import { IcCStar } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { isEmpty, startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function ListItem(props) {
	const { data, index } = props;

	const { badge_details = [], expertise_score = [] } = data || {};

	const router = useRouter();

	const handleClick = (id) => {
		if (id) {
			router.push(
				'/badges/[user_id]/?path=/allocation/kam-expertise',
				`/badges/${id}/?path=/allocation/kam-expertise`,
			);
		}
	};

	return (
		<div className={styles.card}>
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
							badge_details.map((value, i) => (
								i < 3
									? (
										<div key={value.id} className={styles.badge_item}>
											<img src={value.image_url} alt="badge" />
											<div className={styles.star}>
												{[1, 2, 3].map((i) => (
													<div key={i}>
														<IcCStar width={10} stroke="#FFDF33" />
													</div>
												))}
											</div>
										</div>
									)
									: null
							))
						}
					</div>
					<span className={styles.link}>
						{!isEmpty(badge_details)
						&& (
							<span
								role="presentation"
								style={{ cursor: 'pointer' }}
								onClick={() => {
									handleClick(data.partner_user_id);
								}}
							>
								View More
							</span>
						)}
					</span>
				</div>

				<div className={styles.card_description_right}>
					{
                        expertise_score.map((expertise) => (
	<div className={styles.exp} key={expertise.expertise_type}>
		<div className={styles.expertise}>
			{startCase(expertise.expertise_type || '')}
			<b>{expertise.score}</b>
		</div>
	</div>
                        ))
                    }
				</div>
			</div>
		</div>
	);
}

export default ListItem;
