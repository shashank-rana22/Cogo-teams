import { Pill, Tooltip, Button } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
import { startCase } from '@cogoport/utils';
import { useState, useEffect, useCallback } from 'react';

import styles from '../page-components/RoleList/styles.module.css';
import { API } from '../utils/api';

const globalCs = {
	PARENT_PARTNER_ENTITY_ID: '6fd98605-9d5d-479d-9fac-cf905d292b88',
};

const getFilter = (val) => {
	if (val === 'cogoport') {
		return {
			stakeholder_id          : globalCs.PARENT_PARTNER_ENTITY_ID,
			stakeholder_type        : 'partner',
			exclude_stakeholder_ids : undefined,
		};
	}
	if (val === 'channel_partner') {
		return {
			exclude_stakeholder_ids : [globalCs.PARENT_PARTNER_ENTITY_ID],
			stakeholder_id          : undefined,
			stakeholder_type        : 'partner',
		};
	}
	if (val === 'customer') {
		return {
			stakeholder_type        : 'organization',
			exclude_stakeholder_ids : undefined,
			stakeholder_id          : undefined,
		};
	}
	return {
		stakeholder_type        : undefined,
		exclude_stakeholder_ids : undefined,
		stakeholder_id          : undefined,
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
	}, [filters, params]);

	useEffect(() => onChangeParams({ page: 1 }), [filters]);

	useEffect(() => getListAuthRoles(), [params]);

	const onChangeShowCreateRoleModal = useCallback((value = false) => {
		setShowCreateRoleModal(!!value);
	}, []);

	const onChangeFilters = (values) => {
		setFilters((previousState) => ({
			...getFilter(null),
			...previousState,
			...values,
		}));
	};

	const handleSTChange = (val) => {
		setStakeHolderType(val);
		setFilters((previousState) => ({ ...previousState, ...getFilter(val) }));
	};
	const redirect = useCallback((roleId = '') => {
		if (!roleId) return;

		router.push('/edit-role/[role_id]', `/edit-role/${roleId}`);
	}, []);

	const columns = [
		{
			Header   : 'Role Description',
			accessor : (itemData) => (
				<section className={styles.role_description_container}>
					<div className={styles.title}>{itemData?.name}</div>
					<div className={styles.subtitle}>{itemData?.remarks}</div>
				</section>
			),
		},
		{
			Header   : 'Role Type',
			accessor : (itemData) => {
				const roleType = (itemData?.role_type || '').toLowerCase() === 'default';
				return (
					<Pill className={styles.role_type_container} color={roleType ? 'blue' : 'orange'}>
						{itemData?.role_type}
					</Pill>
				);
			},
		},
		{
			Header   : 'Partner',
			accessor : (itemData) => (
				<section className={styles.partner_container}>
					{itemData?.partner?.business_name}
				</section>
			),
		},
		{
			Header   : 'Users',
			accessor : (itemData) => (
				<section className={styles.partner_container}>
					{itemData?.user_count}
				</section>
			),
		},
		{
			Header   : 'Level',
			accessor : (itemData) => (
				<section className={styles.partner_container}>
					{startCase(itemData?.hierarchy_level)}
				</section>
			),
		},
		{
			Header   : 'Functions',
			accessor : (itemData) => {
				const totalFunctionPills = itemData.role_functions.length;
				return (
					<section>
						{
							itemData?.role_functions?.length <= 1 ? (
								(itemData.role_functions || []).map((item) => (
									<Pill
										className={styles.function_head}
										color="red"
									>
										{item}
									</Pill>
								))
							) : (
								<div className={styles.sub_functions_container}>
									<Pill
										className={styles.function_head}
										color="red"
									>
										{itemData?.role_functions[0]}
									</Pill>

									<Tooltip
										content={(
									itemData?.role_functions.slice(1).map((item) => (
										<Pill
											className={styles.function_head}
											color="red"
										>
											{item}
										</Pill>
									))
										)}
										placement="top"
									>
										<strong>
											(+
											{totalFunctionPills - 1}
											)
										</strong>
									</Tooltip>
								</div>
							)
						}
					</section>
				);
			},
		},
		{
			Header   : 'Sub Functions',
			accessor : (itemData) => {
				const totalSubFunctionPills = itemData.role_sub_functions.length;
				return (
					<section>
						{itemData?.role_sub_functions?.length <= 1 ? (
							(itemData.role_sub_functions || []).map((item) => (
								<Pill
									className={styles.function_head}
									color="green"
								>
									{item}
								</Pill>
							))
						) : (
							<div className={styles.sub_functions_container}>
								<Pill
									className={styles.function_head}
									color="green"
								>
									{itemData?.role_sub_functions[0]}
								</Pill>

								<Tooltip
									content={(
									itemData?.role_sub_functions.slice(1).map((item) => (
										<Pill
											className={styles.function_head}
											color="green"
										>
											{item}
										</Pill>
									))
									)}
									placement="top"
								>
									<strong>
										(+
										{totalSubFunctionPills - 1}
										)
									</strong>
								</Tooltip>
							</div>
						)}
					</section>
				);
			},
		},
		{
			Header   : ' ',
			accessor : (itemData) => (
				<section>
					<Button themeType="secondary" onClick={() => redirect(itemData?.id)}>
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
		redirect,
		stakeHolderType,
		setStakeHolderType: handleSTChange,
		columns,
	};
};

export default useRoleList;
