import { Placeholder } from '@cogoport/components';
import { IcCStar } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React from 'react';

import styles from './styles.module.css';

const list_data = [
	{
		id            : 1,
		user_name     : 'John Appleseed',
		total         : 12000,
		customer_exp  : 12000,
		trade_exp     : 12000,
		commodity_exp : 12000,
		misc_exp      : 12000,
		badges        : [
			{
				url: 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/gold_ninja_badge.svg',
			},
			{
				url: 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/silver_badge.svg',
			},
			{
				url: 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/nautical_ninja_bronze.svg',
			},
		],
	},
	{
		id            : 2,
		user_name     : 'Beatrice Needlespoon',
		total         : 12000,
		customer_exp  : 12000,
		trade_exp     : 12000,
		commodity_exp : 12000,
		misc_exp      : 12000,
		badges        : [],

	},
	{
		id            : 3,
		user_name     : 'John Appleseed',
		total         : 12000,
		customer_exp  : 12000,
		trade_exp     : 12000,
		commodity_exp : 12000,
		misc_exp      : 12000,
		badges        : [
			{
				url: 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/gold_ninja_badge.svg',
			},
		],
	},
	{
		id            : 4,
		user_name     : 'Beatrice Needlespoon',
		total         : 12000,
		customer_exp  : 12000,
		trade_exp     : 12000,
		commodity_exp : 12000,
		misc_exp      : 12000,
		badges        : [],

	},
	{
		id            : 5,
		user_name     : 'John Appleseed',
		total         : 12000,
		customer_exp  : 12000,
		trade_exp     : 12000,
		commodity_exp : 12000,
		misc_exp      : 12000,
		badges        : [],
	},
];

function LeaderboardList() {
	const router = useRouter();
	return (
		<div className={styles.container}>

			{list_data.map((data, index) => (
				// ! loading state logic

				false
					? (
						<div
							key={data.id}
							className={styles.card}
						>
							<div className={styles.card_description}>
								<div className={styles.card_description_left}>
									<div>
										<div
											className={styles.user_name}
										>
											<Placeholder width="100px" height="16px" />
										</div>
										<div>
											<Placeholder width="100px" height="16px" />
										</div>
									</div>
								</div>
								<div className={styles.badge_container}>
									<div className={styles.badges_loading}>
										{
											data.badges.length > 0 ? (data.badges.map(() => (
												<div key={data.badges.url} style={{ marginBottom: '4px' }}>
													<Placeholder width="48px" height="48px" style={{ marginRight: '28px' }} />
												</div>
											))) : ''
										}
									</div>
								</div>

								<div className={styles.card_description_right}>
									<div>
										<div style={{ color: '#333333', paddingBottom: '8px' }}>
											<Placeholder width="100px" height="16px" />

										</div>
										<div><b><Placeholder width="100px" height="16px" /></b></div>
									</div>
									<div>
										<div style={{ color: '#333333', paddingBottom: '8px' }}>
											<Placeholder width="100px" height="16px" />

										</div>
										<div><b><Placeholder width="100px" height="16px" /></b></div>
									</div>
									<div>
										<div style={{ color: '#333333', paddingBottom: '8px' }}>
											<Placeholder width="100px" height="16px" />

										</div>
										<div><b><Placeholder width="100px" height="16px" /></b></div>
									</div>
									<div>
										<div style={{ color: '#333333', paddingBottom: '8px' }}>
											<Placeholder width="100px" height="16px" />

										</div>
										<div><b><Placeholder width="100px" height="16px" /></b></div>
									</div>
								</div>
							</div>
						</div>
					)
					: (
						<div
							key={data.id}
							className={styles.card}
						>
							<div className={styles.card_description}>
								<div className={styles.card_description_left}>
									<div className={styles.index}>
										{index + 1}
									</div>
									<div>
										<div
											className={styles.user_name}
										>
											{data.user_name}
										</div>
										<div>
											Total:&nbsp;
											<b>{data.total}</b>
										</div>
									</div>
								</div>
								<div className={styles.badge_container}>
									<div className={styles.badges}>
										{
                                data.badges.length > 0 ? (data.badges.map((value) => (
	<div key={data.badges.url} className={styles.badge_item}>
		<img src={value.url} alt="badge" width={48} height={48} />
		<div className={styles.star}>
			{Array(3).fill('').map(() => (
				<IcCStar width={10} stroke="#FFDF33" />
			))}
		</div>
	</div>
                                ))) : ''
                            }
									</div>
									<span className={styles.link}>
										{data.badges.length > 1
											? (
												<span
													role="presentation"
													style={{ cursor: 'pointer' }}
													onClick={() => router.push('/badges')}
												>
													View More
												</span>
											) : ''}
									</span>
								</div>

								<div className={styles.card_description_right}>
									<div className={styles.exp}>
										<div style={{ color: '#333333', paddingBottom: '8px' }}>Customer Exp.</div>
										<div><b>{data.customer_exp}</b></div>
									</div>
									<div className={styles.exp}>
										<div style={{ color: '#333333', paddingBottom: '8px' }}>Trade Exp.</div>
										<div><b>{data.trade_exp}</b></div>
									</div>
									<div className={styles.exp}>
										<div style={{ color: '#333333', paddingBottom: '8px' }}>Commodity Exp.</div>
										<div><b>{data.commodity_exp}</b></div>
									</div>
									<div className={styles.exp}>
										<div style={{ color: '#333333', paddingBottom: '8px' }}>Misc Exp.</div>
										<div><b>{data.misc_exp}</b></div>
									</div>
								</div>
							</div>
						</div>
					)
			))}
		</div>
	);
}

export default LeaderboardList;
