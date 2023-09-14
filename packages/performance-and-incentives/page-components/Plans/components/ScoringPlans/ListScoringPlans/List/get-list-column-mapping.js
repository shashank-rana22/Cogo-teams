import { Pill, Tooltip, Popover } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';

import SCORING_PLAN_STATUS_COLOUR_MAPPING from '../../../../constants/scoring-plan-status-colour-mapping';

import Actions from './Actions';
import styles from './styles.module.css';

const INDEX_LENGTH_NORMALIZATION_VALUE = 1;

const getListColumnMapping = (props) => {
	const {
		activeActionId, setActiveActionId, refetch,
		setShowActivationModal = () => {}, showActivationModal = false,
	} = props;

	const LIST_COLUMN_MAPPING = [
		{
			id       : 'status',
			key      : 'status',
			Header   : <div className={styles.heading}>STATUS</div>,
			accessor : ({ status }) => (
				isEmpty(status) ? '___'
					: (
						<Pill
							size="md"
							color={SCORING_PLAN_STATUS_COLOUR_MAPPING[status]}
						>
							{startCase(status)}
						</Pill>
					)
			),
		},
		{
			id       : 'display_name',
			key      : 'display_name',
			Header   : <div className={styles.heading}>NAME</div>,
			accessor : ({ display_name }) => (isEmpty(display_name) ? '___' : <div>{display_name}</div>),
		},
		{
			id       : 'entity',
			key      : 'entity',
			Header   : <div className={styles.heading}>ENTITY</div>,
			accessor : ({ cogo_entity }) => (isEmpty(cogo_entity) ? '___'
				: <div className={styles}>{startCase(cogo_entity.business_name || '___')}</div>),
		},
		{
			id       : 'channel',
			key      : 'channel',
			Header   : <div className={styles.heading}>CHANNEL</div>,
			accessor : ({ channel }) => (isEmpty(channel) ? '___' : <div>{startCase(channel).toUpperCase()}</div>),
		},
		{
			id       : 'role_function',
			key      : 'role_function',
			Header   : <div className={styles.heading}>FUNCTION</div>,
			accessor : ({ role_function }) => (isEmpty(role_function) ? '___' : <div>{startCase(role_function)}</div>),
		},
		{
			id       : 'roles',
			key      : 'roles',
			Header   : <div className={styles.heading}>ROLES</div>,
			accessor : ({ roles_data }) => (
				isEmpty(roles_data) ? '___' : (
					<Tooltip
						content={(
							<div>
								{roles_data.map(
									(role, index) => (
										<div key={role.id} className={styles.tooltip}>
											{`${index + INDEX_LENGTH_NORMALIZATION_VALUE}. ${role.name}`}
										</div>
									),
								)}
							</div>
						)}
						maxWidth={400}
					>
						<div className={styles.roles}>
							{roles_data.map((role, index) => (
								index === roles_data.length - INDEX_LENGTH_NORMALIZATION_VALUE
									? role.name
									: `${role.name}, `))}
						</div>
					</Tooltip>
				)
			),
		},
		{
			id       : 'creation',
			key      : 'creation',
			Header   : <div className={styles.heading}>CREATION</div>,
			accessor : ({ created_at }) => (isEmpty(created_at)
				? formatDate({
					date       : created_at,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
					formatType : 'date',
				}) : '___'
			),
		},
		{
			id       : 'activation',
			key      : 'activation',
			Header   : <div className={styles.heading}>ACTIVATION</div>,
			accessor : ({ activate_at }) => (activate_at
				? formatDate({
					date       : activate_at,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
					formatType : 'date',
				}) : '___'
			),
		},
		{
			id       : 'actions',
			key      : 'actions',
			Header   : <div className={styles.heading}>ACTIONS</div>,
			accessor : ({ id, status }) => (
				<div className={styles.actions}>

					<div>
						<Popover
							visible={activeActionId === id && !showActivationModal}
							placement="left"
							interactive
							render={(
								<Actions
									activeActionId={activeActionId}
									refetch={refetch}
									status={status}
									setActiveActionId={setActiveActionId}
									setShowActivationModal={setShowActivationModal}
								/>
							)}
							onClickOutside={() => setActiveActionId(null)}
						>
							<div className={styles.action_icon_container}>
								<IcMOverflowDot
									width={16}
									height={16}
									onClick={() => setActiveActionId((pvId) => (pvId === id ? null : id))}
								/>
							</div>
						</Popover>
					</div>
				</div>
			),
		},
	];

	return LIST_COLUMN_MAPPING;
};

export default getListColumnMapping;
