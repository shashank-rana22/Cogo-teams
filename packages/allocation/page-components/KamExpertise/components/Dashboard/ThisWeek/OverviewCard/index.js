import { Card, Placeholder, Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function OverviewCard(props) {
	const { data } = props;
	// ! loading state logic
	return (
		(false) ? (
			<Card
				key={data.title}
				themetype="primary"
				disabled={false}
				className={styles.inner_card_item}
			>
				<Card.Title title={(
					<div className={styles.overview_card_title}>
						<Placeholder width="200px" height="24px" />
					</div>
				)}
				/>
				<Card.Description className={styles.overview_card_content}>
					<div style={{
						display       : 'flex',
						flexDirection : 'column',
						paddingTop    : '20px',
					}}
					>
						<Placeholder width="60px" />
						<Placeholder style={{ marginTop: '8px' }} width="60px" />
					</div>
					<div style={{
						display       : 'flex',
						flexDirection : 'column',
						paddingTop    : '20px',
					}}
					>
						<Placeholder width="60px" />
						<Placeholder style={{ marginTop: '8px' }} width="60px" />
					</div>
				</Card.Description>
			</Card>
		) : (
			<Card
				key={data.title}
				themetype="primary"
				disabled={false}
				className={styles.inner_card_item}
			>
				<Card.Title title={(
					<div className={styles.overview_card_title}>
						<span>{data.icon}</span>
						<span style={{ padding: '0 10px' }}><h3>{data.title}</h3></span>
						<span style={{ paddingTop: '4px', width: '40px', height: '40px' }}>
							<Tooltip
								content={data.title}
								placement="top"
							>
								<IcMInfo
									width={16}
									height={16}
								/>
							</Tooltip>
						</span>
					</div>
				)}
				/>
				<Card.Description className={styles.overview_card_content}>
					<div style={{ display: 'flex', flexDirection: 'column' }}>
						<span
							style={{
								fontSize: '12px',
							}}
						>
							Avg Score
						</span>
						<span style={{ display: 'flex', fontWeight: 'bold' }}>
							{data.avg_score}
						</span>
					</div>
					<div style={{ display: 'flex', flexDirection: 'column' }}>
						<span
							style={{
								fontSize: '12px',
							}}
						>
							Most Points in
						</span>
						<span style={{ display: 'flex', fontWeight: 'bold' }}>
							{data.points_in}
						</span>
					</div>
				</Card.Description>
			</Card>
		)
	);
}

export default OverviewCard;
