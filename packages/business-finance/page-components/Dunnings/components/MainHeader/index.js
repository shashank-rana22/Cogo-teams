import { Placeholder } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { useRouter } from '@cogoport/next';

import useGetTotalStats from '../../hooks/useGetTotalStats';

import styles from './styles.module.css';

function MainHeader({ activeTab = '', setActiveTab = null }) {
	const { push } = useRouter();

	const { statsLoading, statsData } = useGetTotalStats();
	const { totalCustomers = 0, totalOutstandingAmount, activeCycles = 0, ledgerCurrency } = statsData || {};

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
							</span>
							<span className={styles.stats_data}>
								{ !statsLoading ? formatAmount({
									amount   : totalOutstandingAmount,
									currency : ledgerCurrency,
									options  : {
										style                 : 'currency',
										currencyDisplay       : 'code',
										maximumFractionDigits : 0,
									},
								}) : <Placeholder width={100} height={16} />}

							</span>
						</div>
						<div className={styles.collection_rate}>
							<span>
								Customers:
								{' '}
							</span>
							<span className={styles.stats_data}>
								{!statsLoading
									? formatAmount({
										amount  : totalCustomers,
										options : {
											style                 : 'decimal',
											currencyDisplay       : 'code',
											maximumFractionDigits : 0,
										},
									})
									: <Placeholder width={100} height={16} />}
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
								<div style={{ marginTop: '8px' }}>
									{!statsLoading
										? formatAmount({
											amount  : activeCycles,
											options : {
												style                 : 'decimal',
												currencyDisplay       : 'code',
												maximumFractionDigits : 0,
											},
										})
										: <Placeholder width={100} height={16} />}
								</div>
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
