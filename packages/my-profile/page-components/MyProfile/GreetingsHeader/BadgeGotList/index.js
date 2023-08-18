import { Tooltip, Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMStarfull } from '@cogoport/icons-react';
import { startCase, isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import BADGE_STARS_CLASSNAME_MAPPING from '../../../../constants/badge-stars-mapping';

import styles from './styles.module.css';

const ONE = 1;
const TWO = 2;
const THREE = 3;

const BADGE_COUNT = [ONE, TWO, THREE];

function BadgeGotList(props) {
	const { t } = useTranslation(['profile']);

	const { badgesGot = [], badgeListLoading } = props;

	if (badgeListLoading) {
		return (
			<div className={styles.badge_list}>
				{BADGE_COUNT.map((item) => (
					<div key={item} className={styles.badge_container}>
						<Placeholder height={60} width={60} style={{ borderRadius: '8px' }} />
					</div>
				))}
			</div>
		);
	}

	if (isEmpty(badgesGot)) {
		return (
			<div>
				<div className={styles.empty}>
					{BADGE_COUNT.map((item) => (
						<div key={item} className={styles.empty_boxes} />
					))}
				</div>

				<div className={styles.empty_text}>
					{t('profile:dont_have_badges')}
				</div>
			</div>
		);
	}

	return (
		<div className={styles.badge_list}>
			{badgesGot.slice(GLOBAL_CONSTANTS.zeroth_index, THREE).map((data) => (
				<Tooltip key={data.badge_name} content={`${data.badge_name} ${startCase(data.medal || '')}`}>
					<div key={data.id} className={styles.badge_container}>
						<div className={styles.badge}>
							<img src={data.image_url} alt="badge" />
						</div>

						<div className={styles.stars}>
							{BADGE_COUNT.map((item) => (
								<div key={item}>
									<IcMStarfull
										width={10}
										fill={item
													<= BADGE_STARS_CLASSNAME_MAPPING[data?.medal]?.upper_limit
											? '#FFDF33' : '#BDBDBD'}
									/>
								</div>
							))}
						</div>
					</div>
				</Tooltip>
			))}
		</div>
	);
}

export default BadgeGotList;
