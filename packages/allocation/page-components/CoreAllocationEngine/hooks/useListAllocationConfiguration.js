import { Tooltip, Popover, Pill, Badge } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { useAllocationRequest } from '@cogoport/request';
import { format, startCase } from '@cogoport/utils';
import { useState } from 'react';

import ActionContent from
	'../components/AllocationConfigurations/List/ActionContent';
import styles from '../components/AllocationConfigurations/List/styles.module.css';
import CONFIGURATIONS_STATUS_COLOR_MAPPING from '../constants/configurations-status-color-mapping';

const FIRST_INDEX = 1;

const useListAllocationConfigurations = ({ t = () => {} }) => {
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
			Header   : t('allocation:schedule_type'),
			accessor : ({ status = '', schedule_type = '' }) => (
				<div className={styles.schedule_type}>
					<Badge color={CONFIGURATIONS_STATUS_COLOR_MAPPING[status]} style={{ margin: '0px 8px' }} />
					{startCase(schedule_type || '___') }
				</div>
			),
		},
		{
			Header   : t('allocation:segments'),
			accessor : ({ segment_type = '' }) => (
				<div>
					{startCase(segment_type || '___')}
				</div>
			),
		},
		{
			Header   : t('allocation:role_ids_label'),
			accessor : ({ roles = [] }) => {
				const totalRoles = roles.length;

				if (totalRoles === GLOBAL_CONSTANTS.zeroth_index) {
					return '___';
				}

				const renderToolTip = roles.map((role) => (
					<Pill key={role?.name} size="md" color="orange">
						{startCase(role.name)}
					</Pill>
				));

				return (
					<Tooltip content={renderToolTip} placement="bottom">
						<div className={styles.overflow_flex}>
							<div className={styles.roles_container}>
								{startCase(roles?.[GLOBAL_CONSTANTS.zeroth_index]?.name || '___')}
							</div>
							{totalRoles > FIRST_INDEX && (
								<strong>
									(+
									{totalRoles - FIRST_INDEX}
									)
								</strong>
							)}
						</div>
					</Tooltip>
				);
			},
		},
		{
			Header   : t('allocation:user_ids_label'),
			accessor : ({ users = [] }) => {
				const totalUsers = users.length;

				if (totalUsers === GLOBAL_CONSTANTS.zeroth_index) {
					return '___';
				}

				const renderToolTip = users.map((user) => (
					<Pill key={user.name} size="md" color="orange">
						{startCase(user.name)}
					</Pill>
				));

				return (
					<Tooltip content={renderToolTip} placement="bottom">
						<div className={styles.overflow_flex}>
							<div className={styles.roles_container}>
								{startCase(users?.[GLOBAL_CONSTANTS.zeroth_index]?.name || '___')}
							</div>
							{totalUsers > FIRST_INDEX && (
								<strong>
									(+
									{totalUsers - FIRST_INDEX}
									)
								</strong>
							)}
						</div>
					</Tooltip>
				);
			},
		},
		{
			Header   : t('allocation:exclusion_user_ids_label'),
			accessor : ({ exclusion_users = [] }) => {
				const totalExcludedUsers = exclusion_users.length;

				if (totalExcludedUsers === GLOBAL_CONSTANTS.zeroth_index) {
					return '___';
				}

				const renderToolTip = exclusion_users.map((user) => (
					<Pill key={user?.name} size="md" color="orange">
						{startCase(user.name)}
					</Pill>
				));

				return (
					<Tooltip content={renderToolTip} placement="bottom">
						<div className={styles.overflow_flex}>
							<div className={styles.roles_container}>
								{startCase(exclusion_users?.[GLOBAL_CONSTANTS.zeroth_index]?.name || '___')}
							</div>
							{totalExcludedUsers > FIRST_INDEX && (
								<strong>
									(+
									{totalExcludedUsers - FIRST_INDEX}
									)
								</strong>
							)}
						</div>
					</Tooltip>
				);
			},
		},
		{
			Header   : t('allocation:stakeholder_type_label'),
			accessor : ({ stakeholder_type = '' }) => (
				<div>{startCase(stakeholder_type || '___')}</div>
			),
		},
		{
			Header   : t('allocation:locking_criterion_label'),
			accessor : ({ locking_criterion = '' }) => (
				<div>{startCase(locking_criterion || '___')}</div>
			),
		},
		{
			Header   : t('allocation:allocation_schedule'),
			accessor : ({ allocation_schedule = {} }) => (
				<div>
					{allocation_schedule?.next_run_at ? format(allocation_schedule.next_run_at, 'dd MMM yyyy') : '___'}
				</div>
			),
		},
		{
			Header   : t('allocation:expiry_date_label'),
			accessor : ({ end_date = '' }) => (
				<div>
					{end_date ? format(end_date, 'dd MMM yyyy') : '___'}
				</div>
			),
		},
		{
			Header   : t('allocation:actions_label'),
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
