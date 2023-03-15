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

const STATUS_COLOR_MAPPING = {
	draft   : 'yellow',
	live    : 'green',
	expired : 'red',
};

const HEADING_MAPPING = {
	draft: () => (
		<div className={styles.heading}>
			Saved Draft
		</div>
	),
	live: (version) => (
		<div className={styles.heading}>
			Version
			{' '}
			{' '}
			{version}
		</div>
	),
	expired: (version) => (
		<div className={styles.heading}>
			Version
			{' '}
			{' '}
			{version}
		</div>
	),
};

function ConfigurationCard(props) {
	const { version, last_edit_by, last_modified, status } = props;

	return (
		<div className={styles.card_container}>
			<div className={styles.card_header}>
				<div className={styles.left_header}>
					{HEADING_MAPPING[status](version)}

					<Pill size="lg" color={STATUS_COLOR_MAPPING[status]} style={{ marginRight: '28px' }}>{status}</Pill>

					<div style={{ marginRight: '28px' }}>
						Last Edit by&nbsp;:&nbsp;
						<strong>{last_edit_by}</strong>
					</div>

					<div>
						Last Modified&nbsp;:&nbsp;
						<strong>{format(last_modified, 'dd-MM-yyyy')}</strong>
					</div>
				</div>

				<Button themeType="secondary">Edit</Button>
			</div>

			<div className={styles.cards}>
				{CARD_DATA.map((item) => <CardItem key={item.event} {...item} />)}
			</div>
		</div>
	);
}

export default ConfigurationCard;
