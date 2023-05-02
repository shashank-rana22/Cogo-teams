import { Button } from '@cogoport/components';

import { getFormattedAmount } from '../../../../../../common/helpers/getFormattedSum';

import styles from './styles.module.css';

function FooterPriceBreakUpCard({ saveChanges = () => {}, individualTotal = [] }) {
	const ctrProfitabilityRevenue = [
		{
			key   : 'revenue',
			label : 'Projected Revenue :',
			// value : '$1,80,000',
			color : 'revenue',
		},
		{
			key   : 'profitability',
			label : 'Projected Profitability :',
			value : '2.6',
			color : 'profitability',
		},
		{
			key   : 'pricectr',
			label : 'Price / Ctr :',
			value : '160000',
			color : 'pricectr',
		},
	];

	const renderItem = (item) => {
		if (item.key === 'revenue') {
			return getFormattedAmount(individualTotal.reduce(((total, val) => total + val), 0), 'INR');
		}
		if (item.key === 'profitability') {
			return `${item.value}%`;
		}
		return getFormattedAmount(item.value, 'INR');
	};

	return (
		<div className={styles.container}>
			{
				ctrProfitabilityRevenue.map((item) => (
					<div className={styles.projected_section}>
						<div className={styles.text_projexted}>{item.label}</div>
						<div className={`${styles.value_projected} ${styles[item.color]}`}>
							{renderItem(item)}
						</div>
					</div>
				))
			}
			<Button size="md" themeType="secondary" onClick={saveChanges}>Save Changes</Button>
		</div>
	);
}
export default FooterPriceBreakUpCard;
