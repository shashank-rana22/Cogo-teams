import { Pill, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { isEmpty, startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const INDEX_LENGTH_NORMALIZATION_VALUE = 1;

const getListColumnMapping = () => {
	const LIST_COLUMN_MAPPING = [
		{
			key    : 'objective_name',
			flex   : 1,
			Header : (
				<>
					<div className={styles.top_heading}>OBJECTIVE NAME</div>
					<div className={styles.sub_heading}>Type</div>
				</>
			),
			accessor: ({ name, objective_type }) => (
				<>
					<div>{name || '___'}</div>
					<Pill size="md">{startCase(objective_type || '___')}</Pill>
				</>
			),
		},
		{
			key    : 'entity',
			flex   : 1,
			Header : (
				<>
					<div className={styles.top_heading}>ENTITY</div>
					<div className={styles.sub_heading}>Channel</div>
				</>
			),
			accessor: ({ partner, channels }) => (
				<>
					<div className={styles.business_name}>{startCase(partner?.business_name || '___')}</div>
					<div>
						{!isEmpty(channels)
                         && channels.map((item) => <Pill key={item} size="md">{(item || '').toUpperCase()}</Pill>)}
					</div>
				</>
			),
		},
		{
			key    : 'agent_roles',
			flex   : 2,
			Header : (
				<>
					<div className={styles.top_heading}>AGENT ROLES</div>
					<div className={styles.sub_heading}>No. Of Users</div>
				</>
			),
			accessor: ({ roles }) => (
				!isEmpty(roles) ? (
					<>
						<Tooltip content={(
							<div>
								{roles.map(
									(role, index) => (
										<div key={role.id}>
											{`${index + INDEX_LENGTH_NORMALIZATION_VALUE}. ${role.name}`}
										</div>
									),
								)}
							</div>
						)}
						>
							<div className={styles.roles}>
								{roles.map((role, index) => (
									index === roles.length - INDEX_LENGTH_NORMALIZATION_VALUE
										? role.name
										: `${role.name}, `))}
							</div>
						</Tooltip>
						<Pill size="md">{roles.length}</Pill>
					</>
				) : '___'
			),
		},
		{
			key      : 'updated_at',
			flex     : 1,
			Header   : <div className={styles.top_heading}>CREATION/UPDATION</div>,
			accessor : ({ updated_at }) => (updated_at ? formatDate({
				date       : updated_at,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				formatType : 'date',
			}) : '___'),
		},
		{
			key      : 'activate_at',
			flex     : 1,
			Header   : <div className={styles.top_heading}>ACTIVATION</div>,
			accessor : ({ activate_at }) => (activate_at ? formatDate({
				date       : activate_at,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				formatType : 'date',
			}) : '___'),
		},
	];

	return LIST_COLUMN_MAPPING;
};

export default getListColumnMapping;
