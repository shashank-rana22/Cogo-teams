import { Placeholder, Tooltip } from '@cogoport/components';
import { IcMStarfull } from '@cogoport/icons-react';
import { startCase, isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import EmptyState from '../../../common/EmptyState';
import BADGE_STARS_CLASSNAME_MAPPING from '../../../constants/badge-stars-mapping';

import styles from './styles.module.css';

const FIRST_INDEX = 1;
const SECOND_INDEX = 2;
const THIRD_INDEX = 3;
const ARRAY_LENGTH = 40;

function StarCollection({ badgeClassName }) {
	return (
		<div className={styles.stars_container}>
			{[FIRST_INDEX, SECOND_INDEX, THIRD_INDEX].map((item) => (
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
	const { t } = useTranslation(['profile']);

	const { listLoading = false, userBadges, showBadgeDetails } = props;

	const { badges_got: badgesGot = [], badges_not_got : badgesNotGot = [] } = userBadges || {};

	if (listLoading) {
		return (
			<div className={styles.badge_list_container}>
				<p className={styles.heading}>{t('profile:badge_list')}</p>

				<div className={styles.badges_container}>
					{[...Array(ARRAY_LENGTH).keys()].map((item) => (
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
					emptyText={t('profile:badges_not_found')}
				/>
			</div>
		);
	}

	return (
		<div className={styles.badge_list_container}>
			<p className={styles.heading}>{t('profile:badge_list')}</p>

			<div className={styles.badges_container}>
				{badgesGot?.map((item) => {
					const badgeClassName = BADGE_STARS_CLASSNAME_MAPPING[item.medal]?.upper_limit;

					return (
						<Tooltip key={item.badge_name} content={`${item.badge_name} ${startCase(item.medal || '')}`}>
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
						<Tooltip key={item.badge_name} content={`${item.badge_name} ${startCase(item.medal || '')}`}>
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
