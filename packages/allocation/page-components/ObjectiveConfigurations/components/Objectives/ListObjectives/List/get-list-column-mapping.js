import { Button, Pill, Tooltip, ButtonIcon } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMEdit, IcMDelete } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';

import OBJECTIVE_STATUS_COLOR_MAPPING from '../../../../configurations/objective-status-color-mapping';
import ACTIVE_MODE_KEYS_MAPPING from '../../../../constants/active-mode-keys-mapping';

import styles from './styles.module.css';

const INDEX_LENGTH_NORMALIZATION_VALUE = 1;

const { EDIT } = ACTIVE_MODE_KEYS_MAPPING;

const getListColumnMapping = (props) => {
	const { setActiveMode, setShowActionModal, setRefCallback } = props;

	const LIST_COLUMN_MAPPING = [
		{
			key      : 'status',
			flex     : 1,
			Header   : <div className={styles.top_heading}>STATUS</div>,
			accessor : ({ lead_objective_status, status }) => {
				const showStatus = status === 'live' ? 'live' : lead_objective_status;

				if (!showStatus) return '___';

				return (
					<Pill
						size="md"
						color={OBJECTIVE_STATUS_COLOR_MAPPING[showStatus]}
					>
						{startCase(showStatus)}
					</Pill>
				);
			},
		},
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
		{
			key      : 'edit',
			flex     : 0.75,
			Header   : <div />,
			accessor : ({ id }) => (
				<Button
					themeType="tertiary"
					type="button"
					onClick={() => {
						setActiveMode(EDIT);
						setRefCallback({ objectiveId: id });
					}}
				>
					<IcMEdit style={{ marginRight: '4px' }} />
					<strong>Edit</strong>
				</Button>
			),
		},
		{
			key      : 'delete',
			flex     : 0.5,
			Header   : <div />,
			accessor : ({ id }) => (
				<ButtonIcon
					icon={<IcMDelete />}
					onClick={() => setShowActionModal({ mode: 'deactivation', objectiveId: id })}
				/>
			),
		},
		{
			key      : 'activation',
			flex     : 1,
			Header   : <div />,
			accessor : ({ id, lead_objective_status, status, activate_at }) => {
				const finalStatus = status === 'live' ? status : lead_objective_status;

				if (finalStatus === 'live') {
					return (
						<Button
							type="button"
							themeType="secondary"
							onClick={() => setShowActionModal({
								mode        : 'deactivation',
								objectiveId : id,
							})}
						>
							<b>Deactivate</b>
						</Button>
					);
				}

				return (
					<Button
						type="button"
						themeType="secondary"
						disabled={finalStatus === 'verification_pending'}
						onClick={() => setShowActionModal({
							mode        : 'activation',
							objectiveId : id,
						})}
					>
						<b>{isEmpty(activate_at) ? 'Set Activation' : 'Update Activation'}</b>
					</Button>
				);
			},
		},
	];

	return LIST_COLUMN_MAPPING;
};

export default getListColumnMapping;