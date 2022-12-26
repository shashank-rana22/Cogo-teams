import { useState, useEffect, useCallback } from 'react';
import { useSelector } from '@cogo/store';
import globalCs from '@cogo/commons/constants/global';
import { useRequest } from '@cogo/commons/hooks';
import { useRouter } from '@cogo/next';
import { API } from '../utils/api';

const getFilter = (val) => {
	if (val === 'cogoport') {
		return {
			stakeholder_id: globalCs.PARENT_PARTNER_ENTITY_ID,
			stakeholder_type: 'partner',
			exclude_stakeholder_ids: undefined,
		};
	}
	if (val === 'channel_partner') {
		return {
			exclude_stakeholder_ids: [globalCs.PARENT_PARTNER_ENTITY_ID],
			stakeholder_id: undefined,
			stakeholder_type: 'partner',
		};
	}
	if (val === 'customer') {
		return {
			stakeholder_type: 'organization',
			exclude_stakeholder_ids: undefined,
			stakeholder_id: undefined,
		};
	}
	return {
		stakeholder_type: undefined,
		exclude_stakeholder_ids: undefined,
		stakeholder_id: undefined,
	};
};

const useRoleList = () => {
	const { scope } = useSelector((state) => ({
		scope: state?.general?.scope,
		// asPrefix : state?.general?.asPrefix,
		// user_profile : state?.profile,
	}));

	const router = useRouter();

	const [showCreateRoleModal, setShowCreateRoleModal] = useState(false);
	const [stakeHolderType, setStakeHolderType] = useState('all');
	const [filters, setFilters] = useState({});
	const [params, setParams] = useState({
		partner_data_required: true,
		permissions_data_required: false,
		page: 1,
		filters: { stakeholder_type: 'partner' },
		role_stats_required: true,
	});

	const { apiMethod, apiUri } = API.LIST_AUTH_ROLES;
	const [trigger] = useRequest(apiMethod, false, scope)(apiUri);

	useEffect(() => onChangeParams({ page: 1 }), [filters]);

	useEffect(() => getListAuthRoles(), [params]);

	const onChangeShowCreateRoleModal = useCallback((value = false) => {
		setShowCreateRoleModal(!!value);
	}, []);

	const onChangeFilters = useCallback((values = {}) => {
		setFilters((previousState) => ({
			...getFilter(null),
			...previousState,
			...values,
		}));
	}, []);

	const onChangeParams = useCallback((values = {}) => {
		setParams((previousState) => ({
			...previousState,
			...values,
		}));
	}, []);

	const getListAuthRoles = useCallback(() => {
		listAuthRolesApi.trigger({
			params: {
				...params,
				filters: { ...params?.filters, ...filters },
			},
		});
	}, [filters, params]);

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
		listAuthRolesApi,
		redirect,
		stakeHolderType,
		setStakeHolderType: handleSTChange,
	};
};

export default useRoleList;
