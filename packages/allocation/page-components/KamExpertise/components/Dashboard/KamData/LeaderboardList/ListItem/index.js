import { Tooltip } from '@cogoport/components';
import { IcMStarfull } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { startCase } from '@cogoport/utils';

import BADGE_STARS_CLASSNAME_MAPPING from '../../../../../constants/badge-stars-mapping';

import styles from './styles.module.css';

function ListItem(props) {
	const { data, index } = props;

	const {
		name = '',
		score = '',
		partner_user_id = '',
		badge_details = [],
		expertise_score = [],
	} = data || {};

	const router = useRouter();

	const onClickViewMoreBadges = (id) => {
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
							{name}
						</div>

						<div>
							Total:
							{' '}
							<b>{score}</b>
						</div>
					</div>
				</div>

				<div className={styles.badge_container}>
					<div className={styles.badges}>
						{badge_details?.slice(0, 3).map((value) => {
							const badgeClassName = BADGE_STARS_CLASSNAME_MAPPING[value?.medal]?.upper_limit;

							return (
								<Tooltip
									key={value?.id}
									content={`${data.badge_name || ''} ${startCase(value?.medal || '')}`}
								>
									<div className={styles.badge_item}>
										<img src={value?.image_url} alt="badge" />

										<div className={styles.star}>
											{[1, 2, 3].map((it) => (
												<div key={it}>
													<IcMStarfull
														width={10}
														fill={it <= badgeClassName ? '#FFDF33' : '#BDBDBD'}
													/>
												</div>
											))}
										</div>
									</div>
								</Tooltip>
							);
						})}
					</div>

					<span className={styles.link}>
						{badge_details?.length > 3
						&& (
							<span
								role="presentation"
								style={{ cursor: 'pointer' }}
								onClick={() => {
									onClickViewMoreBadges(partner_user_id);
								}}
							>
								View More
							</span>
						)}
					</span>
				</div>

				<div className={styles.card_description_right}>
					{expertise_score.map((expertise) => (
						<div className={styles.exp} key={expertise?.expertise_type}>
							{startCase(expertise?.expertise_type || '')}

							<b>{expertise?.score}</b>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default ListItem;
