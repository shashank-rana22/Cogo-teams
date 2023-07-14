import { Placeholder, Tooltip } from '@cogoport/components';
import { IcMStarfull } from '@cogoport/icons-react';
import { startCase, isEmpty } from '@cogoport/utils';

import EmptyState from '../../../common/EmptyState';
import BADGE_STARS_CLASSNAME_MAPPING from '../../../constants/badge-stars-mapping';

import styles from './styles.module.css';

function StarCollection({ badgeClassName }) {
	return (
		<div className={styles.stars_container}>
			{[1, 2, 3].map((item) => (
				<div key={item}>
					<IcMStarfull
						width={10}
						fill={item <= badgeClassName ? '#FFDF33' : '#BDBDBD'}
					/>
				</div>
			))}
		</div>
	);
}

function BadgeList(props) {
	const { listLoading = false, userBadges, showBadgeDetails } = props;

	const { badges_got: badgesGot = [], badges_not_got : badgesNotGot = [] } = userBadges || {};

	if (listLoading) {
		return (
			<div className={styles.badge_list_container}>
				<p className={styles.heading}>Badge List</p>

				<div className={styles.badges_container}>
					{[...Array(40).keys()].map((item) => (
						<div key={item} className={styles.container}>
							<Placeholder height={64} width={64} />
						</div>
					))}
				</div>
			</div>
		);
	}

	if (isEmpty(userBadges)) {
		return (
			<div className={styles.empty_container}>
				<EmptyState
					height={220}
					width={380}
					flexDirection="column"
					emptyText="Badges not found"
				/>
			</div>
		);
	}

	return (
		<div className={styles.badge_list_container}>
			<p className={styles.heading}>Badge List</p>

			<div className={styles.badges_container}>
				{badgesGot?.map((item) => {
					const badgeClassName = BADGE_STARS_CLASSNAME_MAPPING[item.medal]?.upper_limit;

					return (
						<Tooltip content={`${item.badge_name} ${startCase(item.medal || '')}`}>
							<div
								key={item.id}
								className={styles.container}
								role="presentation"
								style={{ cursor: 'pointer' }}
								onClick={() => showBadgeDetails(item)}
							>
								<div className={styles.image_container}>
									<img className={styles.badge} src={item?.image_url} alt="" />
								</div>

								<StarCollection badgeClassName={badgeClassName} />
							</div>
						</Tooltip>
					);
				})}

				{badgesNotGot?.map((item) => {
					const badgeClassName = BADGE_STARS_CLASSNAME_MAPPING[item.medal]?.upper_limit;

					return (
						<Tooltip content={`${item.badge_name} ${startCase(item.medal || '')}`}>
							<div
								key={item.id}
								style={{ opacity: 0.2 }}
								className={styles.container}
								role="presentation"
								onClick={() => showBadgeDetails(item)}
							>
								<div className={styles.image_container}>
									<img className={styles.badge} src={item?.image_url} alt="" />
								</div>

								<StarCollection badgeClassName={badgeClassName} />
							</div>
						</Tooltip>
					);
				})}
			</div>
		</div>
	);
}

export default BadgeList;
