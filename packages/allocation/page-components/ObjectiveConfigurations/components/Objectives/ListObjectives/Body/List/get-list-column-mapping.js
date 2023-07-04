import { Button, Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMEdit } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';

import OBJECTIVE_STATUS_COLOR_MAPPING from '../../../../../configurations/objective-status-color-mapping';

import styles from './styles.module.css';

const INDEX_LENGTH_NORMALIZATION_VALUE = 1;

const getListColumnMapping = () => {
	const LIST_COLUMN_MAPPING = [
		{
			key      : 'status',
			flex     : 1,
			Header   : <div className={styles.top_heading}>STATUS</div>,
			accessor : ({ status }) => (status ? (
				<Pill
					size="lg"
					color={OBJECTIVE_STATUS_COLOR_MAPPING[status]}
				>
					{startCase(status)}
				</Pill>
			) : '___'),
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
				<>
					<div>{name || '___'}</div>
					<Pill size="md">{startCase(type || '___')}</Pill>
				</>
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
				<>
					<div>{startCase(partner.business_name || '___')}</div>
					<div>
						{!isEmpty(channel)
                         && channel.map((item) => <Pill key={item} size="md">{item}</Pill>)}
					</div>
				</>
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
					<>
						<div className={styles.roles}>
							{roles.map((role, index) => (
								index === roles.length - INDEX_LENGTH_NORMALIZATION_VALUE
									? role.name
									: `${role.name}, `))}
						</div>
						<Pill size="md">{roles.length}</Pill>
					</>
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
					<strong>Edit</strong>
				</Button>
			),
		},
		{
			key      : 'activation',
			flex     : 1,
			Header   : <div />,
			accessor : () => (
				<Button type="button" themeType="secondary">
					<strong>Set Activation</strong>
				</Button>
			),
		},
	];

	return LIST_COLUMN_MAPPING;
};

export default getListColumnMapping;
