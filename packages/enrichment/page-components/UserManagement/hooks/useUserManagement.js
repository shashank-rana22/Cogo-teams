import { Button, Pill } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useAllocationRequest } from '@cogoport/request';
import { isEmpty, startCase } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import styles from '../styles.module.css';

const ACTIONS_STATUS_MAPPING = {
	active   : 'green',
	inactive : 'orange',
};

const useUserManagement = () => {
	const { debounceQuery, query: searchQuery = '' } = useDebounceQuery();

	const [statusToggle, setStatusToggle] = useState('active');
	const [searchValue, setSearchValue] = useState('');
	const [actionModal, setActionModal] = useState({
		show      : false,
		type      : 'onboard',
		agentData : {},

	});

	const [params, setParams] = useState({
		sort_by    : 'created_at',
		sort_type  : 'desc',
		page_limit : 10,
		page       : 1,
		filters    : {
			q      : searchQuery || undefined,
			status : statusToggle,

		},
		permissions_data_required    : false,
		rm_mappings_data_required    : false,
		expertise_data_required      : false,
		add_service_objects_required : false,

	});

	const [{ loading, data }, refetch] = useAllocationRequest(
		{
			url    : '/list_partner_users',
			method : 'get',

			params,
		},
		{ manual: false },
	);

	const { list = [], ...paginationData } = data || {};

	const getNextPage = (newPage) => {
		setParams((previousParams) => ({
			...previousParams,
			page: newPage,
		}));
	};

	useEffect(() => {
		setParams((previousParams) => ({
			...previousParams,
			filters: {
				...previousParams.filters,
				q      : searchQuery || undefined,
				status : statusToggle,
			},
		}));
	}, [statusToggle, searchQuery]);

	const columns = [
		{
			id       : 'name',
			Header   : 'Name',
			accessor : ({ name = '' }) => (
				<section>
					{name || '__' }

				</section>
			),
		},
		{
			id       : 'email',
			Header   : 'Email',
			accessor : ({ email = '' }) => (
				<section><div className={styles.email_id}>{email || '___'}</div></section>
			),
		},
		{
			id       : 'mobile_number',
			Header   : 'Mobile Number',
			accessor : ({ mobile_country_code = '', mobile_number = '' }) => (
				<section>
					{mobile_country_code && mobile_number ? `${mobile_country_code}-${mobile_number}` : '__'}
				</section>
			),
		},
		{
			id       : 'role',
			Header   : 'Role',
			accessor : ({ roles_data = [] }) => (
				<section>
					<Pill size="md" color="blue">
						{startCase(roles_data[GLOBAL_CONSTANTS.zeroth_index]?.name) || '-'}
					</Pill>

				</section>
			),
		},
		{
			id       : 'partner',
			Header   : 'Partner',
			accessor : ({ partner = {} }) => (
				<section>
					{(partner && !isEmpty(partner)) ? partner.business_name : '__'}
				</section>
			),
		},

		{
			id       : 'status',
			Header   : 'STATUS',
			accessor : ({ status }) => (
				<seaction>
					<Pill size="md" color={ACTIONS_STATUS_MAPPING[status]}>
						{startCase(status) || '-'}
					</Pill>
				</seaction>
			),
		},
		{
			id       : 'action',
			Header   : 'Action',
			accessor : ({ id = '', name = '', email = '' }) => (
				<Button
					themeType="secondary"
					size="sm"
					onClick={() => setActionModal(() => ({
						type      : 'offboard',
						show      : true,
						agentData : { id, name, email },
					}))}
				>
					Deactivate

				</Button>

			),
		},
	];

	return {
		refetch,
		columns,
		list,
		paginationData,
		loading,
		setParams,
		getNextPage,
		debounceQuery,
		searchValue,
		setSearchValue,
		actionModal,
		setActionModal,
		statusToggle,
		setStatusToggle,

	};
};

export default useUserManagement;
