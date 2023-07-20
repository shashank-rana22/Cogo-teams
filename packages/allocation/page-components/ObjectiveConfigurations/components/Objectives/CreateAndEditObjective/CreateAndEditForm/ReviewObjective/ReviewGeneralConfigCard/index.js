import { Tooltip } from '@cogoport/components';
import { isEmpty, startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const INDEX_LENGTH_NORMALIZATION_VALUE = 1;

const CARD_DATA_MAPPING = [
	{
		name     : 'type',
		label    : 'Objective Type',
		accessor : ({ type }) => <div>{startCase(type || '')}</div>,
	},
	{
		name     : 'partner',
		label    : 'Entity',
		accessor : ({ partner }) => <div>{partner.business_name}</div>,
	},
	{
		name     : 'channel',
		label    : 'Channel',
		accessor : ({ channel }) => (
			<div>
				{channel.map((item, index) => ((
					index === channel.length - INDEX_LENGTH_NORMALIZATION_VALUE
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
			if (selectMode === 'select_all') {
				return 'All Agents';
			}
			return `${user_ids.length} Agents`;
		},
	},
];

function ReviewGeneralConfigCard(props) {
	const { generalConfiguration } = props;

	return (
		<div className={styles.container}>
			<h4 className={styles.heading}>General Configuration</h4>

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
