import { Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';

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
	live: (version_number) => (
		<div className={styles.heading}>
			Version
			{' '}
			{' '}
			{version_number}
		</div>
	),
	expired: (version_number) => (
		<div className={styles.heading}>
			Version
			{' '}
			{' '}
			{version_number}
		</div>
	),
};

function ConfigurationCard(props) {
	const { version_number = '', status = '', expertise_details = [], audit_data = {}, total_levels } = props;

	return (
		<div className={styles.card_container}>
			<div className={styles.card_header}>
				<div className={styles.left_header}>
					{HEADING_MAPPING[status]?.(version_number) || ''}

					<Pill
						size="lg"
						color={STATUS_COLOR_MAPPING[status]}
						style={{ marginRight: '28px' }}
					>
						{startCase(status)}

					</Pill>
					<div style={{ marginRight: '28px' }}>
						Total Levels:
						{' '}
						<strong>
							{total_levels || '-'}
							{' '}
						</strong>
					</div>

					<div className={styles.last_modified}>
						<div style={{ marginRight: '28px' }}>
							Last Edit by
							{' '}
							:
							{' '}
							<strong>
								{audit_data?.name || ''}
								{' '}
							</strong>
						</div>

						<div>
							Last Modified
							{' '}
							:
							{' '}
							<strong>
								{audit_data?.updated_at
									? formatDate({
										date       : audit_data.updated_at,
										dateFormat : GLOBAL_CONSTANTS.formats.date['dd-MM-yyyy'],
										formatType : 'date',
									}) : ''}

							</strong>
						</div>
					</div>
				</div>
			</div>

			<div className={styles.cards}>
				{expertise_details.map((item) => <CardItem key={item.id} {...item} />)}
			</div>
		</div>
	);
}

export default ConfigurationCard;
