import { Pill, Tooltip, Button } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMEdit } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useAuthRequest } from '@cogoport/request';
import { startCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useState, useEffect, useCallback } from 'react';

import { changeFilters, getFilter, onResetFilters } from '../page-components/RoleList/Filters/utils/controls';
import styles from '../page-components/RoleList/styles.module.css';
import { API } from '../utils/api';

const FIRST_INDEX = 1;

const useRoleList = () => {
	const router = useRouter();
	const { t } = useTranslation(['accessManagement', 'common']);
	const [showCreateRoleModal, setShowCreateRoleModal] = useState(false);
	const [stakeHolderType, setStakeHolderType] = useState('all');
	const [filters, setFilters] = useState({});
	const [searchString, setSearchString] = useState('');
	const [params, setParams] = useState({
		partner_data_required     : true,
		permissions_data_required : false,
		page                      : 1,
		filters                   : {},
		role_stats_required       : true,
	});

	const { apiMethod, apiUri } = API.LIST_AUTH_ROLES;

	const { query = '', debounceQuery } = useDebounceQuery();

	const [{ data, loading, error }, trigger] = useAuthRequest({
		method : apiMethod,
		url    : apiUri,
	}, { manual: true });

	const onChangeParams = useCallback((values = {}) => {
		setParams((previousState) => ({
			...previousState,
			...values,
		}));
	}, []);

	const onChangeFilters = (values) => changeFilters({ values, setFilters });

	const getListAuthRoles = useCallback(() => {
		trigger({
			params: {
				...params,
				filters: { ...params?.filters, ...filters, q: query || undefined },
			},
		});
	}, [filters, params, query, trigger]);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => onChangeParams({ page: 1 }), [query, filters]);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => getListAuthRoles(), [params]);

	const onChangeShowCreateRoleModal = useCallback((value = false) => {
		setShowCreateRoleModal(!!value);
	}, []);

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
			Header   : t('accessManagement:roles_and_permission_column_role_description'),
			accessor : ({ name = '', remarks = '' }) => (
				<section className={styles.role_description_container}>
					<div className={styles.title}>{name}</div>
					<div className={styles.subtitle}>{remarks}</div>
				</section>
			),
		},
		{
			Header   : t('accessManagement:roles_and_permission_column_role_type'),
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
			Header   : t('accessManagement:roles_and_permission_column_partner'),
			accessor : ({ partner = {} }) => (
				<section className={styles.partner_container}>
					{partner?.business_name}
				</section>
			),
		},
		{
			Header   : t('accessManagement:roles_and_permission_column_users'),
			accessor : ({ user_count = '' }) => (
				<section className={styles.partner_container}>
					{user_count}
				</section>
			),
		},
		{
			Header   : t('accessManagement:roles_and_permission_column_level'),
			accessor : ({ hierarchy_level = '' }) => (
				<section className={styles.partner_container}>
					{startCase(hierarchy_level)}
				</section>
			),
		},
		{
			Header   : t('accessManagement:roles_and_permission_column_functions'),
			accessor : ({ role_functions = [] }) => {
				const totalFunctionPills = role_functions.length;

				if (totalFunctionPills <= FIRST_INDEX) {
					(role_functions).map((item) => (
						<Pill
							key={item}
							className={styles.function_head}
							color="red"
						>
							{item}
						</Pill>
					));
				}

				const renderTooltip = role_functions.slice(FIRST_INDEX).map((item) => (
					<Pill
						key={item}
						className={styles.function_head}
						color="red"
					>
						{item}
					</Pill>
				));

				return (
					<section>
						<div className={styles.sub_functions_container}>
							{role_functions[GLOBAL_CONSTANTS.zeroth_index] && (
								<Pill className={styles.function_head} color="red">
									{role_functions[GLOBAL_CONSTANTS.zeroth_index]}
								</Pill>
							)}

							{totalFunctionPills > FIRST_INDEX && (
								<Tooltip content={renderTooltip} placement="top">
									<strong>
										(+
										{totalFunctionPills - FIRST_INDEX}
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
			Header   : t('accessManagement:roles_and_permission_column_sub_functions'),
			accessor : ({ role_sub_functions = [] }) => {
				const totalSubFunctionPills = role_sub_functions.length;

				if (totalSubFunctionPills <= FIRST_INDEX) {
					(role_sub_functions).map((item) => (
						<Pill
							key={item}
							className={styles.function_head}
							color="green"
						>
							{item}
						</Pill>
					));
				}

				const renderTooltip = role_sub_functions.slice(FIRST_INDEX).map((item) => (
					<Pill
						key={item}
						className={styles.function_head}
						color="green"
					>
						{item}
					</Pill>
				));

				return (
					<section>
						<div className={styles.sub_functions_container}>
							{role_sub_functions[GLOBAL_CONSTANTS.zeroth_index] && (
								<Pill className={styles.function_head} color="green">
									{role_sub_functions[GLOBAL_CONSTANTS.zeroth_index]}
								</Pill>
							)}

							{totalSubFunctionPills > FIRST_INDEX && (
								<Tooltip content={renderTooltip} placement="top">
									<strong>
										(+
										{totalSubFunctionPills - FIRST_INDEX}
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
						{t('accessManagement:roles_and_permission_update_role_edit_button')}
					</Button>
				</section>
			),
		},
	];

	useEffect(() => debounceQuery(searchString), [searchString, debounceQuery]);

	return {
		showCreateRoleModal,
		onChangeShowCreateRoleModal,
		filters,
		onChangeFilters,
		onChangeParams,
		listAuthRolesApi: {
			data, trigger, loading, error,
		},
		searchString,
		setSearchString,
		onResetFilters,
		redirect,
		stakeHolderType,
		setStakeHolderType: handleSTChange,
		columns,
	};
};

export default useRoleList;
