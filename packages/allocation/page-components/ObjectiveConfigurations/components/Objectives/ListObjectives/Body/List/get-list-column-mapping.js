import { Button, Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMEdit } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

const INDEX_LENGTH_NORMALIZATION_VALUE = 1;

const getListColumnMapping = () => {
	const LIST_COLUMN_MAPPING = [
		{
			key      : 'status',
			flex     : 1,
			Header   : <div className={styles.top_heading}>STATUS</div>,
			accessor : ({ status }) => status || '___',
		},
		{
			key  : 'objective_name',
			flex : 1,
			Header:
	<>
		<div className={styles.top_heading}>OBJECTIVE NAME</div>
		<div className={styles.sub_heading}>Type</div>
	</>,
			accessor: ({ name, type }) => (
				<div>
					<div>{name || '___'}</div>
					<div>{type || '___'}</div>
				</div>
			),
		},
		{
			key  : 'entity',
			flex : 1,
			Header:
	<>
		<div className={styles.top_heading}>ENTITY</div>
		<div className={styles.sub_heading}>Channel</div>
	</>,
			accessor: ({ partner, channel }) => (
				<div>
					<div>{partner.business_name || '___'}</div>
					<div>
						{!isEmpty(channel)
                         && channel.map((item) => <Pill key={item} size="md" color="#F9F9F9">{item}</Pill>)}
					</div>
				</div>
			),
		},
		{
			key  : 'agent_roles',
			flex : 2,
			Header:
	<>
		<div className={styles.top_heading}>AGENT ROLES</div>
		<div className={styles.sub_heading}>No. Of Users</div>
	</>,
			accessor: ({ roles }) => (
				!isEmpty(roles) && (
					<div>
						<div>
							{roles.map((role, index) => (
								index === roles.length - INDEX_LENGTH_NORMALIZATION_VALUE
									? role.name
									: `${role.name}, `))}
						</div>
						<Pill size="md" color="#F9F9F9">{roles.length}</Pill>
					</div>
				)
			),
		},
		{
			key      : 'updated_at',
			flex     : 1,
			Header   : <div className={styles.top_heading}>CREATION/UPDATION</div>,
			accessor : ({ updated_at }) => updated_at && formatDate({
				date       : updated_at,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				formatType : 'date',
			}),
		},
		{
			key      : 'activate_at',
			flex     : 1,
			Header   : <div className={styles.top_heading}>ACTIVATION</div>,
			accessor : ({ activate_at }) => activate_at && formatDate({
				date       : activate_at,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				formatType : 'date',
			}),
		},
		{
			key      : 'edit',
			flex     : 0.75,
			Header   : <div />,
			accessor : () => (
				<Button themeType="tertiary" type="button">
					<IcMEdit style={{ marginRight: '4px' }} />
					Edit
				</Button>
			),
		},
		{
			key      : 'activation',
			flex     : 1,
			Header   : <div />,
			accessor : () => (
				<Button type="button" themeType="secondary">Set Activation</Button>
			),
		},
	];

	return LIST_COLUMN_MAPPING;
};

export default getListColumnMapping;
