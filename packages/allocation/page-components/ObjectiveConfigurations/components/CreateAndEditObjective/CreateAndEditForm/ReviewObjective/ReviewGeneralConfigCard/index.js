import { Tooltip } from '@cogoport/components';
import { isEmpty, startCase } from '@cogoport/utils';

import SELECT_AGENTS_KEYS_MAPPING from '../../../../../constants/select-agents-keys-mapping';

import styles from './styles.module.css';

const INDEX_LENGTH_NORMALIZATION_VALUE = 1;

const { SELECT_ALL, EXCLUDE_ONLY } = SELECT_AGENTS_KEYS_MAPPING;

const CARD_DATA_MAPPING = [
	{
		name     : 'objective_type',
		label    : 'Objective Type',
		accessor : ({ objective_type }) => <div>{startCase(objective_type || '')}</div>,
	},
	{
		name     : 'partner',
		label    : 'Entity',
		accessor : ({ partner }) => <div>{partner.business_name}</div>,
	},
	{
		name     : 'channels',
		label    : 'Channels',
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
		label    : 'Agent Role',
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
		label    : 'Applicable On',
		accessor : ({ selectMode, user_ids }) => {
			if (selectMode === SELECT_ALL) {
				return 'All Agents';
			}
			if (selectMode === EXCLUDE_ONLY) {
				return `All Except ${user_ids.length} Agents`;
			}
			return `${user_ids.length} Agents`;
		},
	},
];

function ReviewGeneralConfigCard(props) {
	const { generalConfiguration } = props;

	return (
		<div className={styles.container}>
			<div className={styles.heading_container}>
				<h4 className={styles.heading}>General Configuration</h4>

				<h4 className={styles.objective_name}>{generalConfiguration.name || ''}</h4>
			</div>

			<div className={styles.card}>
				{CARD_DATA_MAPPING.map((item) => {
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
