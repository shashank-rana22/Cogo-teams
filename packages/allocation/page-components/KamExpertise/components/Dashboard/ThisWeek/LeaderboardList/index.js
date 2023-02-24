import { Card } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function LeaderboardList() {
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
			user_name     : 'John Appleseed',
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
			user_name     : 'John Appleseed',
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

	return (
		<div className={styles.container}>

			{list_data.map((data, index) => (
				<Card
					themetype="primary"
					disabled={false}
					className={styles.card}
				>
					<Card.Description className={styles.card_description}>
						<div className={styles.card_description_left}>
							<div className={styles.index}>
								{index + 1}
							</div>
							<div>
								<div
									style={{
										fontSize      : '16px',
										fontWeight    : 'bold',
										color         : '#ED3726',
										paddingBottom : '8px',
									}}
								>
									{data.user_name}
								</div>
								<div>
									Total:&nbsp;
									<b>{data.total}</b>
								</div>
							</div>
						</div>
						<div className={styles.badges}>
							{
                                data.badges.length > 0 ? (data.badges.map((value) => (
	<div>
		<img src={value.url} alt="badge" width={48} height={48} />
	</div>
                                ))) : ''
                            }
						</div>
						<div className={styles.card_description_right}>
							<div>
								<div style={{ color: '#333333', paddingBottom: '8px' }}>Customer Exp.</div>
								<div><b>{data.customer_exp}</b></div>
							</div>
							<div>
								<div style={{ color: '#333333', paddingBottom: '8px' }}>Trade Exp.</div>
								<div><b>{data.trade_exp}</b></div>
							</div>
							<div>
								<div style={{ color: '#333333', paddingBottom: '8px' }}>Commodity Exp.</div>
								<div><b>{data.commodity_exp}</b></div>
							</div>
							<div>
								<div style={{ color: '#333333', paddingBottom: '8px' }}>Misc Exp.</div>
								<div><b>{data.misc_exp}</b></div>
							</div>
						</div>
					</Card.Description>
				</Card>
			))}
		</div>
	);
}

export default LeaderboardList;
