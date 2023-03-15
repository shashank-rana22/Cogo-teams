import { IcCStar } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React from 'react';

import styles from './styles.module.css';

const EXPERTISE_MAPPING = {
	commodity_expertise : 'Commodity Expertise',
	customer_expertise  : 'Customer Expertise',
	trade_expertise     : 'Trade Expertise',
	miscellaneous       : 'Misc Exp.',
};

function ListItem(props) {
	const { data = {}, index } = props;

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
						<div className={styles.user_name}>
							{/* //! user name is not provided yet by the api */}
							{data.user_name}
						</div>
						<div>
							Total:
							{' '}
							<b>{data.score}</b>
						</div>
					</div>
				</div>
				{/* //! badges response structure needs to be changed */}
				<div className={styles.badge_container}>
					<div className={styles.badges}>
						{
                            data?.milestone_mappings?.length > 0 ? (data?.milestone_mappings?.map((value) => (
	<div key={value.badge_details?.url} className={styles.badge_item}>
		<img src={value.badge_details?.image_url} alt="badge" width={48} height={48} />
		<div className={styles.star}>
			{Array(3).fill('').map(() => (
				<IcCStar width={10} stroke="#FFDF33" />
			))}
		</div>
	</div>
                            ))
                            ) : null
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
                        data?.expertise_score?.map((expertise) => (
	<div className={styles.exp}>
		<div className={styles.expertise}>{EXPERTISE_MAPPING[expertise?.expertise_type]}</div>
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
