import { Tooltip, Placeholder } from '@cogoport/components';
import { IcCStar } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function BadgeGotList(props) {
	const { badgesGot = [], badgeListLoading } = props;

	if (badgeListLoading) {
		return (
			<div className={styles.badge_list}>
				{badgesGot.map((data, i) => ((i < 3) ? (
					<Tooltip content={data.medal}>
						<div key={data.id} className={styles.badge_container}>
							<Placeholder height={60} width={60} style={{ borderRadius: '8px' }} />
						</div>
					</Tooltip>
				) : null
				))}
			</div>
		);
	}

	if (isEmpty(badgesGot)) {
		return (
			<div>
				<div className={styles.empty}>
					{
					[1, 2, 3].map((item) => (
						<div key={item} className={styles.empty_boxes} />
					))
				}
				</div>

				<div className={styles.empty_text}>Sorry, you dont have any badges.</div>
			</div>
		);
	}

	return (
		<div className={styles.badge_list}>

			{badgesGot.map((data, i) => (
				(i < 3)
					? (
						<Tooltip content={data.medal}>
							<div key={data.id} className={styles.badge_container}>
								<div className={styles.badge}>
									<img src={data.image_url} alt="badge" />
								</div>

								<div className={styles.stars}>
									{[1, 2, 3].map((item) => (
										<div key={item}>
											<IcCStar width={10} stroke="#FFDF33" />
										</div>
									))}
								</div>
							</div>
						</Tooltip>
					)
					: null
			))}
		</div>
	);
}

export default BadgeGotList;
