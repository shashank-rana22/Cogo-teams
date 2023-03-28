import { Tooltip } from '@cogoport/components';
import { IcCStar } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function ListItem(props) {
	const { data, index } = props;

	const { badge_details = [], expertise_score = [] } = data || {};

	const router = useRouter();

	const handleClick = (id) => {
		if (id) {
			router.push(
				'/my-profile/badges/[user_id]/?path=/allocation/kam-expertise',
				`/my-profile/badges/${id}/?path=/allocation/kam-expertise`,
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

						{badge_details?.slice(0, 3).map((value) => (
							<Tooltip key={value?.id} content={data.badge_name}>
								<div className={styles.badge_item}>
									<img src={value?.image_url} alt="badge" />
									<div className={styles.star}>
										{[1, 2, 3].map((it) => (
											<div key={it}>
												<IcCStar width={10} stroke="#FFDF33" />
											</div>
										))}
									</div>
								</div>
							</Tooltip>
						))}

					</div>

					<span className={styles.link}>
						{ badge_details?.length > 3
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

					{ expertise_score.map((expertise) => (
						<div className={styles.exp} key={expertise.expertise_type}>
							<div className={styles.expertise}>
								{startCase(expertise.expertise_type || '')}
								<div><b>{expertise.score}</b></div>
							</div>
						</div>
					))}

				</div>
			</div>
		</div>
	);
}

export default ListItem;
