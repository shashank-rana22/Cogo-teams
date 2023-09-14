import { Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import CardItem from './CardItem';
import styles from './styles.module.css';

const STATUS_COLOR_MAPPING = {
	draft   : 'yellow',
	live    : 'green',
	expired : 'red',
};

const getHeadingMapping = ({ t = () => {} }) => ({
	draft: () => (
		<div className={styles.heading}>
			{t('allocation:saved_draft_label')}
		</div>
	),
	live: (version_number) => (
		<div className={styles.heading}>
			{t('allocation:version_label')}
			{' '}
			{' '}
			{version_number}
		</div>
	),
	expired: (version_number) => (
		<div className={styles.heading}>
			{t('allocation:version_label')}
			{' '}
			{' '}
			{version_number}
		</div>
	),
});

function ConfigurationCard(props) {
	const { t } = useTranslation(['allocation']);

	const { version_number = '', status = '', expertise_details = [], audit_data = {}, total_levels } = props;

	const headingMapping = getHeadingMapping({ t });

	return (
		<div className={styles.card_container}>
			<div className={styles.card_header}>
				<div className={styles.left_header}>
					{headingMapping[status]?.(version_number) || ''}

					<Pill
						size="lg"
						color={STATUS_COLOR_MAPPING[status]}
						style={{ marginRight: '28px' }}
					>
						{startCase(status)}

					</Pill>
					<div style={{ marginRight: '28px' }}>
						{t('allocation:total_levels_header')}
						{' '}
						<strong>
							{total_levels || '-'}
							{' '}
						</strong>
					</div>

					<div className={styles.last_modified}>
						<div style={{ marginRight: '28px' }}>
							{t('allocation:last_edit_by_label')}
							{' '}
							:
							{' '}
							<strong>
								{audit_data?.name || ''}
								{' '}
							</strong>
						</div>

						<div>
							{t('allocation:last_modified_label')}
							{' '}
							:
							{' '}
							<strong>
								{audit_data?.updated_at
									? formatDate({
										date       : audit_data.updated_at,
										dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'],
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
