import { Modal, Popover, Legend, Pill, Tooltip } from '@cogoport/components';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { format, getByKey, startCase } from '@cogoport/utils';
import { useState } from 'react';

import CheckConfigurationPublishablity from '../../Actions/CheckConfigurationPublishability';
import CreateConfiguration from '../../Actions/CreateConfiguration';
import DeleteConfiguration from '../../Actions/DeleteConfiguration';
import PublishConfiguration from '../../Actions/PublishConfiguration';

import ActionContent from './ActionContent';
import styles from './styles.module.css';

const STATUS_COLOR_MAPPING = {
	active          : 'green',
	draft           : 'grey',
	checking        : 'grey',
	publishable     : 'orange',
	not_publishable : 'red',
};

const columnsMapping = [
	{
		key      : 'schedule_type',
		label    : 'Schedule Type',
		getValue : (item) => startCase(getByKey(item, 'schedule_type', '___')),
		flex     : 1,
	},
	{
		key      : 'segment_type',
		label    : 'Segment',
		getValue : (item) => startCase(getByKey(item, 'segment_type', '___')),
		flex     : 1,
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
		flex: 1.75,
	},
	{
		key      : 'users',
		label    : 'Users',
		getValue : (item) => {
			const users = getByKey(item, 'users', []);

			const totalUsers = users.length;

			if (totalUsers === 0) {
				return '___';
			}

			const renderToolTip = (
				<div className={styles.tooltip_container}>
					{users.map((user) => (
						<Pill size="md" color="orange">
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
		flex: 1.5,
	},
	{
		key      : 'stakeholder_type',
		label    : 'Stakeholder Type',
		getValue : (item) => startCase(getByKey(item, 'stakeholder_type', '___')),
		flex     : 1.25,
	},
	{
		key      : 'locking_criterion',
		label    : 'Locking Criterion',
		getValue : (item) => startCase(getByKey(item, 'locking_criterion', '___')),
		flex     : 1.25,
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
	{
		key      : 'status',
		label    : 'Status',
		getValue : (item) => {
			const status = getByKey(item, 'status', '-');

			const legendItem = [
				{
					label : startCase(status),
					color : STATUS_COLOR_MAPPING[status],
					key   : getByKey(item, 'id', '-'),
				},
			];

			return (
				<Legend
					hasBackground={false}
					direction="horizontal"
					size="sm"
					style={{ margin: 0 }}
					items={legendItem}
				/>
			);
		},
		flex: 1,
	},
];

const WORKFLOW_MAPPING = {
	edit: ({ item, listRefetch, setWorkflowName }) => (
		<CreateConfiguration
			viewType="edit"
			item={item}
			listRefetch={listRefetch}
			setShow={setWorkflowName}
		/>
	),
	delete: ({ item, listRefetch, setWorkflowName }) => (
		<DeleteConfiguration
			item={item}
			listRefetch={listRefetch}
			setShow={setWorkflowName}
		/>
	),
	check: ({ item, listRefetch, setWorkflowName }) => (
		<CheckConfigurationPublishablity
			item={item}
			listRefetch={listRefetch}
			setShow={setWorkflowName}
		/>
	),
	publish: ({ item, listRefetch, setWorkflowName }) => (
		<PublishConfiguration
			item={item}
			listRefetch={listRefetch}
			setShow={setWorkflowName}
		/>
	),
};

function ListItem({ item, listRefetch }) {
	// Todo move the state up
	const [workflowName, setWorkflowName] = useState(false);

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
					render={(
						<ActionContent
							status={item.status}
							setWorkflowName={setWorkflowName}
						/>
					)}
					onOuterClick={() => setWorkflowName(false)}
				>
					<div className={styles.svg_container}>
						<IcMOverflowDot height={16} width={16} />
					</div>
				</Popover>
			</div>

			{workflowName && (
				<Modal
					size="md"
					show={!!workflowName}
					onClose={() => setWorkflowName(null)}
					placement="top"
				>
					{WORKFLOW_MAPPING[workflowName]?.({ item, listRefetch, setWorkflowName })}
				</Modal>
			)}
		</div>
	);
}

export default ListItem;
