import { Pill } from '@cogoport/components';
import { format } from '@cogoport/utils';

import CardItem from './CardItem';
import styles from './styles.module.css';

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
	const { version_number, last_edit_by, last_modified, status_value, list } = props;

	return (
		<div className={styles.card_container}>
			<div className={styles.card_header}>
				<div className={styles.left_header}>
					{HEADING_MAPPING[status_value](version_number)}

					<Pill
						size="lg"
						color={STATUS_COLOR_MAPPING[status_value]}
						style={{ marginRight: '28px' }}
					>
						{status_value}

					</Pill>

					<div className={styles.last_modified}>
						<div style={{ marginRight: '28px' }}>
							Last Edit by&nbsp;:&nbsp;
							<strong>{last_edit_by}</strong>
						</div>

						<div>
							Last Modified&nbsp;:&nbsp;
							<strong>{format(last_modified, 'dd-MM-yyyy')}</strong>
						</div>
					</div>
				</div>

			</div>

			<div className={styles.cards}>
				{list.map((item) => <CardItem key={item.event} {...item} />)}
			</div>
		</div>
	);
}

export default ConfigurationCard;
