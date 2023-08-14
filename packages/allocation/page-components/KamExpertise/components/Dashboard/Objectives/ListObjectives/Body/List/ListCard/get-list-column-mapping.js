import { Button, Pill, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import {
	IcMArrowDown,
	IcMArrowRight,
	IcMArrowRotateDown,
	IcMArrowRotateUp,
	IcMDelete,
} from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';

import getActionMapping from './action-mapping';
import styles from './styles.module.css';

const INDEX_LENGTH_NORMALIZATION_VALUE = 1;

const getListColumnMapping = (props) => {
	const {
		setShowModal = () => { },
		activeObjectiveId,
		setActiveObjectiveId = () => { },
		setListObjectivesParams = () => { },
	} = props;

	const actionsMapping = getActionMapping({
		setShowModal,
		setListObjectivesParams,
	});

	const LIST_COLUMN_MAPPING = [
		{
			key      : 'status',
			flex     : 0.6,
			Header   : <div className={styles.top_heading} />,
			accessor : ({ id }) => (activeObjectiveId === id ? (
				<IcMArrowDown
					height={24}
					width={24}
					fill="#221f20"
					onClick={() => setActiveObjectiveId('')}
				/>
			) : (
				<IcMArrowRight
					height={24}
					width={24}
					fill="#221f20"
					onClick={() => setActiveObjectiveId(id)}
				/>
			)),
		},
		{
			key    : 'objective_name',
			flex   : 1,
			Header : (
				<>
					<div className={styles.top_heading}>OBJECTIVE</div>
					<div className={styles.sub_heading}>Type</div>
				</>
			),
			accessor: ({ name, objective_type }) => (
				<>
					<div>{name || '--'}</div>
					<Pill color="#CFEAED" size="md">{startCase(objective_type || '--')}</Pill>
				</>
			),
		},
		{
			key    : 'entity',
			flex   : 1.5,
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
							&& channels.map(
								(item) => (
									<Pill color="#F3FAFA" key={item} size="md">
										{item.toUpperCase() || '--'}
									</Pill>
								),
							)}
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
						<div>{roles.length}</div>
					</>
				) : null
			),
		},
		{
			key    : 'created_at',
			flex   : 1,
			Header : (
				<div className={styles.created_at}>
					<div className={styles.top_heading}> CREATION</div>
					<div className={styles.icon_container}>
						<IcMArrowRotateUp fill="#CECECE" onClick={() => actionsMapping?.handleSortAsc()} />
						<IcMArrowRotateDown fill="#CECECE" onClick={() => actionsMapping?.handleSortDesc()} />
					</div>
				</div>
			),
			accessor: ({ created_at }) => (created_at ? formatDate({
				date       : created_at,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				formatType : 'date',
			}) : '___'),
		},
		{
			key      : 'action',
			flex     : 2,
			Header   : <div className={styles.top_heading}>ACTIONS</div>,
			accessor : ({ id, name, kam_expertise_status }) => (
				<div className={styles.action_buttons}>
					<Button
						onClick={(e) => {
							e.stopPropagation();
							actionsMapping?.handleGenerateList(id);
						}}
						type="button"
						themeType="secondary"
						disabled={kam_expertise_status === 'verified'}
					>
						<strong>Generate List</strong>
					</Button>

					{kam_expertise_status === 'verified' ? (
						<>
							<Button
								onClick={(e) => {
									e.stopPropagation();
									actionsMapping?.handleViewList(id, name);
								}}
								type="button"
								themeType="secondary"
							>
								<strong>View List</strong>
							</Button>
							<Button
								onClick={(e) => {
									e.stopPropagation();
									actionsMapping?.handleDeleteList(id);
								}}
								type="button"
								themeType="secondary"
							>
								<strong style={{ display: 'flex', alignItems: 'flex-end' }}>
									<IcMDelete height={16} width={16} fill="#221f20" />
									Delete List
								</strong>
							</Button>
						</>
					) : null}
				</div>
			),
		},
	];

	return LIST_COLUMN_MAPPING;
};

export default getListColumnMapping;
