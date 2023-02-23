import { Pill, Button } from '@cogoport/components';
import { format } from '@cogoport/utils';

import CardItem from './CardItem';
import styles from './styles.module.css';

const CARD_DATA = [
	{
		event             : 'Customer Expertise',
		items             : 9,
		min_score         : 800,
		high_impact_rules : 20,
	},
	{
		event             : 'Trade Expertise',
		items             : 9,
		min_score         : 800,
		high_impact_rules : 20,
	},
	{
		event             : 'Commodity Expertise',
		items             : 9,
		min_score         : 800,
		high_impact_rules : 20,
	},
	{
		event             : 'Misc Expertise',
		items             : 9,
		min_score         : 800,
		high_impact_rules : 20,
	},
];

function ConfigurationCard() {
	return (
		<div className={styles.card_container}>
			<div className={styles.card_header}>
				<div className={styles.left_header}>
					<div className={styles.heading}>Version 3</div>

					<Pill size="lg" color="green" style={{ marginRight: '28px' }}>Live</Pill>

					<div style={{ marginRight: '28px' }}>
						Last Edit by&nbsp;:&nbsp;
						<strong>CogoParth</strong>
					</div>

					<div>
						Last Modified&nbsp;:&nbsp;
						<strong>{format(new Date(), 'dd-MM-yyyy')}</strong>
					</div>
				</div>
				<Button themeType="secondary">Edit</Button>
			</div>

			<div className={styles.cards}>
				{CARD_DATA.map((item) => <CardItem {...item} />)}
			</div>
		</div>
	);
}

export default ConfigurationCard;
