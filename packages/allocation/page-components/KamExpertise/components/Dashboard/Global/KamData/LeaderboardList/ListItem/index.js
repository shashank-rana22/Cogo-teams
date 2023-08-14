import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMStarfull } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { startCase } from '@cogoport/utils';

import BADGE_STARS_CLASSNAME_MAPPING from '../../../../../../constants/badge-stars-mapping';

import styles from './styles.module.css';

const ONE = 1;
const TWO = 2;
const THREE = 3;

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
						{index + ONE}
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
						{badge_details?.slice(GLOBAL_CONSTANTS.zeroth_index, THREE).map((value) => {
							const badgeClassName = BADGE_STARS_CLASSNAME_MAPPING[value?.medal]?.upper_limit;

							return (
								<Tooltip
									key={value?.id}
									content={`${data.badge_name || ''} ${startCase(value?.medal || '')}`}
								>
									<div className={styles.badge_item}>
										<img src={value?.image_url} alt="badge" />

										<div className={styles.star}>
											{[ONE, TWO, THREE].map((it) => (
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
						{badge_details?.length > THREE
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
