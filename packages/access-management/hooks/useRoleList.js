import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

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
	};
};

export default useRoleList;
