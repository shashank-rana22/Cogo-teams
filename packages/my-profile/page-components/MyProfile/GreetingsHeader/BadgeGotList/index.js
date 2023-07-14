import { Tooltip, Placeholder } from '@cogoport/components';
import { IcMStarfull } from '@cogoport/icons-react';
import { startCase, isEmpty } from '@cogoport/utils';

import BADGE_STARS_CLASSNAME_MAPPING from '../../../../constants/badge-stars-mapping';

import styles from './styles.module.css';

function BadgeGotList(props) {
	const { badgesGot = [], badgeListLoading } = props;

	if (badgeListLoading) {
		return (
			<div className={styles.badge_list}>
				{[1, 2, 3].map((item) => (
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
					{[1, 2, 3].map((item) => (
						<div key={item} className={styles.empty_boxes} />
					))}
				</div>

				<div className={styles.empty_text}>Sorry, you don&apos;t have any badges.</div>
			</div>
		);
	}

	return (
		<div className={styles.badge_list}>
			{badgesGot.slice(0, 3).map((data) => (
				<Tooltip content={`${data.badge_name} ${startCase(data.medal || '')}`}>
					<div key={data.id} className={styles.badge_container}>
						<div className={styles.badge}>
							<img src={data.image_url} alt="badge" />
						</div>

						<div className={styles.stars}>
							{[1, 2, 3].map((item) => (
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
