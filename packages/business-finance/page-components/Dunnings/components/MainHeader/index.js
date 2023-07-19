import { useRouter } from '@cogoport/next';

import styles from './styles.module.css';

function MainHeader({ activeTab = '', setActiveTab = null }) {
	const { push } = useRouter();

	const handleTabChange = (tab) => {
		if (activeTab !== tab) {
			setActiveTab(tab);
			push(
				'/business-finance/dunnings/[active_tab]',
				`/business-finance/dunnings/${tab}`,
			);
		}
	};

	const cardsData = [
		{
			id      : 'dashboard',
			content : (
				<div className={styles.campaign_card}>
					<div style={{ textAlign: 'left' }}>
						<h3>Financial</h3>
						<h3>Summary</h3>
					</div>
					<div className={styles.vertical_border} />
					<div className={styles.campaign_card_data}>
						<div style={{ display: 'flex' }}>
							<span>
								Total Due:
								{' '}
							</span>
						</div>
						<div className={styles.collection_rate}>
							<span>
								Customers:
								{' '}
							</span>
						</div>
					</div>
				</div>
			),
		},
		{
			id      : 'campaign-management',
			content : (
				<div className={styles.campaign_card}>
					<div style={{ textAlign: 'left' }}>
						<h3>Campaign</h3>
						<h3>Management</h3>
					</div>
					<div className={styles.vertical_border} />
					<div className={styles.campaign_card_data}>
						<div>
							<div>
								<span>
									Ongoing Campaigns:
									{' '}
								</span>

							</div>
						</div>
					</div>
				</div>
			),
		},
		{
			id      : 'exceptions-management',
			content : <h3 className={styles.heading_text}>Exceptions Management</h3>,
		},
	];

	return (
		<div className={styles.container}>
			{
				cardsData.map(({ id, content }) => (
					<button
						key={id}
						className={activeTab === id ? styles.active_card : styles.card}
						onClick={() => handleTabChange(id)}
					>
						{content}
					</button>
				))
			}
		</div>
	);
}

export default MainHeader;
