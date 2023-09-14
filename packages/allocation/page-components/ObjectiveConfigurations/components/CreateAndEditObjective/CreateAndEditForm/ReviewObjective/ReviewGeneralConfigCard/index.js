import { Tooltip } from '@cogoport/components';
import { isEmpty, startCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import SELECT_AGENTS_KEYS_MAPPING from '../../../../../constants/select-agents-keys-mapping';

import styles from './styles.module.css';

const INDEX_LENGTH_NORMALIZATION_VALUE = 1;

const { SELECT_ALL, EXCLUDE_ONLY } = SELECT_AGENTS_KEYS_MAPPING;

const getCardDataMapping = ({ t = () => {} }) => ([
	{
		name     : 'objective_type',
		label    : t('allocation:objective_type_label'),
		accessor : ({ objective_type }) => <div>{startCase(objective_type || '')}</div>,
	},
	{
		name     : 'partner',
		label    : t('allocation:entity_label'),
		accessor : ({ partner }) => <div>{partner.business_name}</div>,
	},
	{
		name     : 'channels',
		label    : t('allocation:channels_label'),
		accessor : ({ channels }) => (
			<div>
				{channels.map((item, index) => ((
					index === channels.length - INDEX_LENGTH_NORMALIZATION_VALUE
						? item.toUpperCase()
						: `${item.toUpperCase()}, `
				)))}
			</div>
		),
	},
	{
		name     : 'roles',
		label    : t('allocation:agent_role_label'),
		accessor : ({ roles }) => (
			!isEmpty(roles) ? (
				<Tooltip content={(
					<div>
						{roles.map((role, index) => (
							<div key={role.id}>
								{`${index + INDEX_LENGTH_NORMALIZATION_VALUE}. ${role.name}`}
							</div>
						))}
					</div>
				)}
				>
					<div className={styles.roles}>
						{roles.map(
							(role, index) => (
								index === roles.length - INDEX_LENGTH_NORMALIZATION_VALUE
									? role.name : `${role.name}, `),
						)}
					</div>
				</Tooltip>
			) : null
		),
	},
	{
		name     : 'agents',
		label    : t('allocation:applicable_on_label'),
		accessor : ({ selectMode, user_ids }) => {
			if (selectMode === SELECT_ALL) {
				return t('allocation:all_agents_text');
			}
			if (selectMode === EXCLUDE_ONLY) {
				return `${t('allocation:all_except_agents_text')} ${user_ids.length} ${t('allocation:agents_text')}`;
			}
			return `${user_ids.length} ${t('allocation:agents_text')}`;
		},
	},
]);

function ReviewGeneralConfigCard(props) {
	const { t } = useTranslation(['allocation']);

	const { generalConfiguration } = props;

	const cardDataMapping = getCardDataMapping({ t });

	return (
		<div className={styles.container}>
			<div className={styles.heading_container}>
				<h4 className={styles.heading}>{t('allocation:general_configuration')}</h4>

				<h4 className={styles.objective_name}>{generalConfiguration.name || ''}</h4>
			</div>

			<div className={styles.card}>
				{(cardDataMapping || []).map((item) => {
					const { name, label, accessor } = item;

					return (
						<div key={name} className={styles.label_value_cotainer}>
							<b className={styles.label}>
								{label}
								:
							</b>

							{accessor(generalConfiguration)}
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default ReviewGeneralConfigCard;
