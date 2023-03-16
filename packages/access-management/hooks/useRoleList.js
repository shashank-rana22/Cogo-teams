import { Pill, Tooltip, Button } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
import { startCase } from '@cogoport/utils';
import { useState, useEffect, useCallback } from 'react';

import styles from '../page-components/RoleList/styles.module.css';
import { API } from '../utils/api';

const getFilter = (val) => {
	if (val === 'cogoport') {
		return {
			entity_types            : ['cogoport'],
			stakeholder_type        : 'partner',
			exclude_stakeholder_ids : undefined,
		};
	}
	if (val === 'channel_partner') {
		return {
			entity_types     : ['channel_partner'],
			stakeholder_id   : undefined,
			stakeholder_type : 'partner',
		};
	}
	if (val === 'customer') {
		return {
			stakeholder_type        : 'organization',
			exclude_stakeholder_ids : undefined,
			stakeholder_id          : undefined,
			entity_types            : undefined,
		};
	}
	return {
		stakeholder_type        : undefined,
		exclude_stakeholder_ids : undefined,
		stakeholder_id          : undefined,
		entity_types            : undefined,
	};
};

const useRoleList = () => {
	const router = useRouter();
	const [showCreateRoleModal, setShowCreateRoleModal] = useState(false);
	const [stakeHolderType, setStakeHolderType] = useState('all');
	const [filters, setFilters] = useState({});
	const [params, setParams] = useState({
		partner_data_required     : true,
		permissions_data_required : false,
		page                      : 1,
		filters                   : { stakeholder_type: 'partner' },
		role_stats_required       : true,
	});

	const { apiMethod, apiUri } = API.LIST_AUTH_ROLES;

	const [{ data, loading, error }, trigger] = useRequest({
		method : apiMethod,
		url    : apiUri,
	}, { manual: true });

	const onChangeParams = useCallback((values = {}) => {
		setParams((previousState) => ({
			...previousState,
			...values,
		}));
	}, []);

	const getListAuthRoles = useCallback(() => {
		trigger({
			params: {
				...params,
				filters: { ...params?.filters, ...filters },
			},
		});
	}, [filters, params, trigger]);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => onChangeParams({ page: 1 }), [filters]);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => getListAuthRoles(), [params]);

	const onChangeShowCreateRoleModal = useCallback((value = false) => {
		setShowCreateRoleModal(!!value);
	}, []);

	const resetFilters = {
		hierarchy_level    : undefined,
		navigation         : undefined,
		q                  : undefined,
		role_functions     : undefined,
		role_sub_functions : undefined,
		stakeholder_id     : undefined,
	};

	const onChangeFilters = (values) => {
		setFilters((previousState) => ({
			...getFilter(null),
			...previousState,
			...values,
		}));
	};

	const onResetFilters = () => {
		setFilters((previousState) => ({
			...getFilter(undefined),
			...previousState,
			...resetFilters,
		}));
	};

	const handleSTChange = (val) => {
		setStakeHolderType(val);
		setFilters((previousState) => ({ ...previousState, ...getFilter(val) }));
	};
	const redirect = useCallback((roleId = '') => {
		if (!roleId) return;

		router.push('/edit-role/[role_id]', `/edit-role/${roleId}`);
	}, [router]);

	const columns = [
		{
			Header   : 'Role Description',
			accessor : ({ name = '', remarks = '' }) => (
				<section className={styles.role_description_container}>
					<div className={styles.title}>{name}</div>
					<div className={styles.subtitle}>{remarks}</div>
				</section>
			),
		},
		{
			Header   : 'Role Type',
			accessor : ({ role_type = '' }) => {
				const roleType = (role_type).toLowerCase() === 'default';
				return (
					<Pill className={styles.role_type_container} color={roleType ? 'blue' : 'orange'}>
						{role_type}
					</Pill>
				);
			},
		},
		{
			Header   : 'Partner',
			accessor : ({ partner = {} }) => (
				<section className={styles.partner_container}>
					{partner?.business_name}
				</section>
			),
		},
		{
			Header   : 'Users',
			accessor : ({ user_count = '' }) => (
				<section className={styles.partner_container}>
					{user_count}
				</section>
			),
		},
		{
			Header   : 'Level',
			accessor : ({ hierarchy_level = '' }) => (
				<section className={styles.partner_container}>
					{startCase(hierarchy_level)}
				</section>
			),
		},
		{
			Header   : 'Functions',
			accessor : ({ role_functions }) => {
				const totalFunctionPills = role_functions.length;

				if (totalFunctionPills <= 1) {
					(role_functions).map((item) => (
						<Pill
							className={styles.function_head}
							color="red"
						>
							{item}
						</Pill>
					));
				}

				const renderTooltip = role_functions.slice(1).map((item) => (
					<Pill
						className={styles.function_head}
						color="red"
					>
						{item}
					</Pill>
				));

				return (
					<section>
						<div className={styles.sub_functions_container}>
							{role_functions[0] && (
								<Pill className={styles.function_head} color="red">
									{role_functions[0]}
								</Pill>
							)}

							{totalFunctionPills > 1 && (
								<Tooltip content={renderTooltip} placement="top">
									<strong>
										(+
										{totalFunctionPills - 1}
										)
									</strong>
								</Tooltip>
							)}

						</div>
					</section>
				);
			},
		},
		{
			Header   : 'Sub Functions',
			accessor : ({ role_sub_functions }) => {
				const totalSubFunctionPills = role_sub_functions.length;

				if (totalSubFunctionPills <= 1) {
					(role_sub_functions).map((item) => (
						<Pill
							className={styles.function_head}
							color="green"
						>
							{item}
						</Pill>
					));
				}

				const renderTooltip = role_sub_functions.slice(1).map((item) => (
					<Pill
						className={styles.function_head}
						color="green"
					>
						{item}
					</Pill>
				));

				return (
					<section>
						<div className={styles.sub_functions_container}>
							{role_sub_functions[0] && (
								<Pill className={styles.function_head} color="green">
									{role_sub_functions[0]}
								</Pill>
							)}

							{totalSubFunctionPills > 1 && (
								<Tooltip content={renderTooltip} placement="top">
									<strong>
										(+
										{totalSubFunctionPills - 1}
										)
									</strong>
								</Tooltip>
							)}

						</div>
					</section>
				);
			},
		},
		{
			Header   : ' ',
			accessor : ({ id = '' }) => (
				<section>
					<Button size="md" themeType="secondary" onClick={() => redirect(id)}>
						<IcMEdit style={{ marginRight: 5 }} />
						Edit
					</Button>
				</section>
			),
		},
	];

	return {
		showCreateRoleModal,
		onChangeShowCreateRoleModal,
		filters,
		onChangeFilters,
		onChangeParams,
		listAuthRolesApi: {
			data, trigger, loading, error,
		},
		onResetFilters,
		redirect,
		stakeHolderType,
		setStakeHolderType: handleSTChange,
		columns,
	};
};

export default useRoleList;
