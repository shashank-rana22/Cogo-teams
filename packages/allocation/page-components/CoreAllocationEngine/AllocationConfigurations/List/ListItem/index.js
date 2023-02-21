import { Button, Badge, Modal, Popover, Pill, Tooltip } from '@cogoport/components';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { format, getByKey, startCase } from '@cogoport/utils';
import { useState } from 'react';

import CheckConfigurationPublishablity from '../../Actions/CheckConfigurationPublishability';
import CreateConfiguration from '../../Actions/CreateConfiguration';
import DeleteConfiguration from '../../Actions/DeleteConfiguration';
import Instances from '../../Actions/Instances';
import PublishConfiguration from '../../Actions/PublishConfiguration';
import UpdatePreferences from '../../Actions/UpdatePreferences';
import ActionContent from '../ActionContent';

import styles from './styles.module.css';

const STATUS_COLOR_MAPPING = {
	active          : '#abcd62',
	draft           : '#ac55ac',
	checking        : '#bdbdbd',
	publishable     : '#f68b21',
	not_publishable : '#ee3425',
};

const columnsMapping = [
	{
		key      : 'schedule_type',
		label    : 'Schedule Type',
		getValue : (item) => (
			<div className={styles.schedule_type}>
				<Badge color={STATUS_COLOR_MAPPING[item.status]} style={{ marginRight: '8px' }} />
				{startCase(getByKey(item, 'schedule_type', '___'))}
			</div>
		),
		flex: 0.9,
	},
	{
		key      : 'segment_type',
		label    : 'Segment',
		getValue : (item) => startCase(getByKey(item, 'segment_type', '___')),
		flex     : 0.7,
	},
	{
		key      : 'roles',
		label    : 'Roles',
		getValue : (item) => {
			const roles = getByKey(item, 'roles', []);

			const totalRoles = roles.length;

			if (totalRoles === 0) {
				return '___';
			}

			const renderToolTip = roles.map((role) => (
				<Pill size="md" color="orange">
					{startCase(role.name)}
				</Pill>
			));

			return (
				<Tooltip content={renderToolTip} placement="bottom">
					<div className={styles.overflow_flex}>
						<div className={styles.roles_container}>
							{startCase(getByKey(roles, '[0].name', '___'))}
						</div>
						{totalRoles > 1 && (
							<strong>
								(+
								{totalRoles - 1}
								)
							</strong>
						)}
					</div>
				</Tooltip>
			);
		},
		flex: 1.6,
	},
	{
		key      : 'users',
		label    : 'Users',
		getValue : (item) => {
			const users = item.users || [];

			const totalUsers = users.length;

			if (totalUsers === 0) {
				return '___';
			}

			const renderToolTip = (
				<div className={styles.tooltip_container}>
					{users.map((user) => (
						<Pill key={user.name} size="md" color="orange">
							{startCase(user.name)}
						</Pill>
					))}
				</div>
			);

			return (
				<Tooltip content={renderToolTip} placement="bottom">
					<div className={styles.overflow_flex}>
						<div className={styles.roles_container}>
							{startCase(getByKey(users, '[0].name', '___'))}
						</div>
						{totalUsers > 1 && (
							<strong>
								(+
								{totalUsers - 1}
								)
							</strong>
						)}
					</div>
				</Tooltip>
			);
		},
		flex: 1.6,
	},
	{
		key      : 'stakeholder_type',
		label    : 'Stakeholder Type',
		getValue : (item) => startCase(getByKey(item, 'stakeholder_type', '___')),
		flex     : 1.1,
	},
	{
		key      : 'locking_criterion',
		label    : 'Locking Criterion',
		getValue : (item) => startCase(getByKey(item, 'locking_criterion', '___')),
		flex     : 1.5,
	},
	{
		key      : 'next_scheduled',
		label    : 'Next Scheduled',
		getValue : (item) => (getByKey(item, 'allocation_schedule.next_run_at')
			? format(getByKey(item, 'allocation_schedule.next_run_at'), 'dd MMM yyyy') : '___'),
		flex: 1,
	},
	{
		key      : 'expiry_date',
		label    : 'Expiry Date',
		getValue : (item) => (getByKey(item, 'end_date') ? format(getByKey(item, 'end_date'), 'dd MMM yyyy') : '___'),
		flex     : 1,
	},
	// {
	// 	key      : 'status',
	// 	label    : 'Status',
	// 	getValue : (item) => {
	// 		const status = getByKey(item, 'status', '-');

	// 		const legendItem = [
	// 			{
	// 				label : startCase(status),
	// 				color : STATUS_COLOR_MAPPING[status],
	// 				key   : getByKey(item, 'id', '-'),
	// 			},
	// 		];

	// 		return (
	// 			<Legend
	// 				hasBackground={false}
	// 				direction="horizontal"
	// 				size="md"
	// 				style={{ margin: 0 }}
	// 				items={legendItem}
	// 			/>
	// 		);
	// 	},
	// 	flex: 1.2,
	// },
];

const WORKFLOW_MAPPING = {
	edit: {
		size   : 'md',
		render : ({ item, listRefetch, setWorkflowName }) => (
			<CreateConfiguration
				viewType="edit"
				item={item}
				listRefetch={listRefetch}
				setShow={setWorkflowName}
			/>
		),
	},
	delete: {
		size   : 'sm',
		render : ({ item, listRefetch, setWorkflowName }) => (
			<DeleteConfiguration
				item={item}
				listRefetch={listRefetch}
				setShow={setWorkflowName}
			/>
		),

	},
	check: {
		size   : 'sm',
		render : ({ item, listRefetch, setWorkflowName }) => (
			<CheckConfigurationPublishablity
				item={item}
				listRefetch={listRefetch}
				setShow={setWorkflowName}
			/>
		),
	},
	publish: {
		size   : 'md',
		render : ({ item, listRefetch, setWorkflowName }) => (
			<PublishConfiguration
				item={item}
				listRefetch={listRefetch}
				setShow={setWorkflowName}
			/>
		),
	},
	view: {
		size   : 'lg',
		render : ({ item, listRefetch, setWorkflowName }) => (
			<UpdatePreferences
				item={item}
				listRefetch={listRefetch}
				setShow={setWorkflowName}
			/>
		),
	},
	instances: {
		size   : 'lg',
		render : ({ item }) => <Instances item={item} />,
	},
};

function ListItem({ item, listRefetch }) {
	const [workflowName, setWorkflowName] = useState(null);

	const [showActions, setShowActions] = useState(false);

	const onClickCta = (workflow) => {
		setWorkflowName(workflow);
		setShowActions(false);
	};

	return (
		<div className={styles.list_item_container}>
			{columnsMapping.map((columnDetail) => {
				const { key, label, getValue, flex } = columnDetail;

				const value = getValue(item);

				return (
					<div key={key} className={styles.content_container} style={{ flex }}>
						{label ? <div className={styles.label}>{label}</div> : null}

						<div className={styles.value}>{value}</div>
					</div>
				);
			})}

			<div className={styles.content_container}>
				<Popover
					placement="left"
					interactive
					visible={showActions}
					render={(
						<ActionContent
							status={item.status}
							onClickCta={onClickCta}
						/>
					)}
					onClickOutside={() => setShowActions(false)}
				>
					<div className={styles.svg_container}>
						<IcMOverflowDot height={16} width={16} onClick={() => setShowActions(!showActions)} />
					</div>

					<Button className={styles.svg_container_mobile_view} onClick={() => setShowActions(!showActions)}>
						Actions
					</Button>
				</Popover>
			</div>

			{workflowName && (
				<Modal
					size={WORKFLOW_MAPPING[workflowName]?.size}
					show={!!workflowName}
					onClose={() => setWorkflowName(null)}
					placement="top"
					closeOnOuterClick={false}
				>
					{WORKFLOW_MAPPING[workflowName]?.render({ item, listRefetch, setWorkflowName })}
				</Modal>
			)}
		</div>
	);
}

export default ListItem;
