import { Tooltip, Popover, Pill, Badge } from '@cogoport/components';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { useAllocationRequest } from '@cogoport/request';
import { format, startCase } from '@cogoport/utils';
import { useState } from 'react';

import ActionContent from
	'../components/AllocationConfigurations/List/ActionContent';
import styles from '../components/AllocationConfigurations/List/styles.module.css';
import CONFIGURATIONS_STATUS_COLOR_MAPPING from '../constants/configurations-status-color-mapping';

const useListAllocationConfigurations = () => {
	const [showCreateConfig, setShowCreateConfig] = useState(false);

	const [showActions, setShowActions] = useState(null);

	const [workflowName, setWorkflowName] = useState(null);

	const [listItem, setListItem] = useState({});

	const [params, setParams] = useState({
		sort_type : 'desc',
		sort_by   : 'created_at',
		page      : 1,
		filters   : {
			status: ['active', 'draft', 'publishable', 'checking', 'not_publishable'],
		},
	});

	const [{ loading, data }, refetch] = useAllocationRequest({
		url     : '/configurations',
		method  : 'get',
		authkey : 'get_allocation_configurations',
		params,
	}, { manual: false });

	const getNextPage = (newPage) => {
		setParams((previousParams) => ({
			...previousParams,
			page: newPage,
		}));
	};

	const onClickCta = (workflow) => {
		setWorkflowName(workflow);
		setShowActions(false);
	};

	const columns = [
		{
			Header   : 'Schedule Type',
			accessor : ({ status = '', schedule_type = '' }) => (
				<div className={styles.schedule_type}>
					<Badge color={CONFIGURATIONS_STATUS_COLOR_MAPPING[status]} style={{ margin: '0px 8px' }} />
					{startCase(schedule_type || '___') }
				</div>
			),
		},
		{
			Header   : 'Segment',
			accessor : ({ segment_type = '' }) => (
				<div>
					{startCase(segment_type || '___')}
				</div>
			),
		},
		{
			Header   : 'Roles',
			accessor : ({ roles = [] }) => {
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
								{startCase(roles?.[0]?.name || '___')}
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
		},
		{
			Header   : 'Users',
			accessor : ({ users = [] }) => {
				const totalUsers = users.length;

				if (totalUsers === 0) {
					return '___';
				}

				const renderToolTip = users.map((user) => (
					<Pill size="md" color="orange">
						{startCase(user.name)}
					</Pill>
				));

				return (
					<Tooltip content={renderToolTip} placement="bottom">
						<div className={styles.overflow_flex}>
							<div className={styles.roles_container}>
								{startCase(users?.[0]?.name || '___')}
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
		},
		{
			Header   : 'Excluded Users',
			accessor : ({ exclusion_users = [] }) => {
				const totalExcludedUsers = exclusion_users.length;

				if (totalExcludedUsers === 0) {
					return '___';
				}

				const renderToolTip = exclusion_users.map((user) => (
					<Pill size="md" color="orange">
						{startCase(user.name)}
					</Pill>
				));

				return (
					<Tooltip content={renderToolTip} placement="bottom">
						<div className={styles.overflow_flex}>
							<div className={styles.roles_container}>
								{startCase(exclusion_users?.[0]?.name || '___')}
							</div>
							{totalExcludedUsers > 1 && (
								<strong>
									(+
									{totalExcludedUsers - 1}
									)
								</strong>
							)}
						</div>
					</Tooltip>
				);
			},
		},
		{
			Header   : 'Stakeholder Type',
			accessor : ({ stakeholder_type = '' }) => (
				<div>{startCase(stakeholder_type || '___')}</div>
			),
		},
		{
			Header   : 'Locking Criterion',
			accessor : ({ locking_criterion = '' }) => (
				<div>{startCase(locking_criterion || '___')}</div>
			),
		},
		{
			Header   : 'Next Scheduled',
			accessor : ({ allocation_schedule = {} }) => (
				<div>
					{allocation_schedule?.next_run_at ? format(allocation_schedule.next_run_at, 'dd MMM yyyy') : '___'}
				</div>
			),
		},
		{
			Header   : 'Expiry Date',
			accessor : ({ end_date = '' }) => (
				<div>
					{end_date ? format(end_date, 'dd MMM yyyy') : '___'}
				</div>
			),
		},
		{
			Header   : 'Actions',
			accessor : (item) => {
				const { id = '', status = '' } = item;

				return (
					<Popover
						placement="left"
						interactive
						visible={showActions === id}
						render={(
							<ActionContent
								status={status}
								onClickCta={onClickCta}
							/>
						)}
						onClickOutside={() => {
							setShowActions(null);
							setListItem({});
						}}
					>
						<div className={styles.svg_container}>
							<IcMOverflowDot
								height={16}
								width={16}
								onClick={() => {
									setShowActions(() => (showActions === id ? null : id));
									setListItem(() => (showActions === id ? {} : item));
								}}
							/>
						</div>
					</Popover>
				);
			},
		},
	];

	const { list = [], ...paginationData } = data || {};

	return {
		loading,
		list,
		paginationData,
		getNextPage,
		params,
		setParams,
		showCreateConfig,
		setShowCreateConfig,
		listRefetch: refetch,
		columns,
		listItem,
		workflowName,
		setWorkflowName,
	};
};

export default useListAllocationConfigurations;
