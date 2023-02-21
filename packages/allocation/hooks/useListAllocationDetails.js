import { Button, Legend, Tooltip, Pill } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { useAllocationRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { startCase } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import DETAILS_STATUS_COLOR_MAPPING from '../constants/details-status-color-mapping';
import styles from '../page-components/CoreAllocationEngine/AllocationDetails/List/styles.module.css';

const useListAllocationDetails = () => {
	const {
		general: { query = {}, locale = '' },
	} = useSelector((reduxState) => reduxState);

	const { partner_id = '', instance_id = '' } = query;

	const { debounceQuery, query: searchQuery } = useDebounceQuery();

	const [searchValue, setSearchValue] = useState();

	const [stakeholderDetail, setStakeholderDetail] = useState({});

	const [params, setParams] = useState({
		page_limit                           : 50,
		page                                 : 1,
		is_allocation_instance_required      : true,
		is_allocation_configuration_required : true,
		filters                              : {
			allocation_instance_id: instance_id,
		},
	});

	const [{ loading, data }, refetch] = useAllocationRequest({
		url     : '/details',
		method  : 'get',
		authkey : 'get_allocation_details',
		params,
	}, { manual: false });

	useEffect(() => {
		if (searchQuery) {
			setParams((prevParams) => ({
				...prevParams,
				filters: {
					...prevParams.filters,
					q: searchQuery || undefined,
				},
			}));
		}
	}, [searchQuery]);

	const getNextPage = (newPage) => {
		setParams((previousParams) => ({
			...previousParams,
			page: newPage,
		}));
	};

	const {
		allocation_configuration = {},
		allocation_instance = {},
		list = [],
		...paginationData
	} = data || {};

	const { status: instanceStatus = '' } = allocation_instance;

	const configurationDetails = {
		...allocation_configuration,
		...allocation_instance,
	};

	const onClickChangeStakeholder = (item) => {
		setStakeholderDetail({
			stakeholder_id       : item.stakeholder_id || '',
			allocation_detail_id : item.id || '',
			role_ids             : configurationDetails?.role_ids,
		});
	};

	const columns = [
		{
			Header   : 'Serial Id',
			accessor : ({ organization = {} }) => (
				<Pill color="blue" size="lg">{organization.serial_id || '___'}</Pill>
			),
		},
		{
			Header   : 'Organization',
			accessor : ({ organization = {} }) => (
				<div>
					<Tooltip
						placement="bottom"
						content={(
							<div className={styles.toottip_content}>
								{startCase((organization.business_name || '___').toUpperCase())}
							</div>
						)}
					>
						<div className={styles.business_name}>
							{startCase((organization.business_name || '___').toUpperCase())}
						</div>
					</Tooltip>
				</div>
			),
		},
		{
			Header   : 'User',
			accessor : ({ user = {} }) => (
				<div>{startCase((user.name || '___').toLowerCase())}</div>
			),
		},
		{
			Header   : 'Old Stakeholder',
			accessor : ({ old_stakeholder = {} }) => (
				<div>
					<div>
						{startCase((old_stakeholder.name || '___')).toLowerCase()}
					</div>
					<div className={styles.stakeholder_type}>
						{startCase((old_stakeholder.name || '___')).toLowerCase()}
					</div>
				</div>
			),
		},
		{
			Header   : 'New Stakeholder',
			accessor : ({ stakeholder = {} }) => (
				<div>
					<div>
						{startCase((stakeholder.name || '___')).toLowerCase()}
					</div>
					<div className={styles.stakeholder_type}>
						{startCase((stakeholder.name || '___')).toLowerCase()}
					</div>
				</div>
			),
		},
		{
			Header   : 'Status',
			accessor : ({ id = '', status = '' }) => (
				<Legend
					className={styles.legend}
					hasBackground={false}
					direction="horizontal"
					size="md"
					items={[
						{
							label : startCase(status || '___'),
							color : DETAILS_STATUS_COLOR_MAPPING[status],
							key   : id,
						},
					]}
				/>
			),
		},
		{
			Header   : 'Action',
			accessor : (listItem = {}) => {
				const { status = '' } = listItem;

				return (
					<Button
						size="sm"
						themeType="secondary"
						disabled={status === 'approved'}
						onClick={() => onClickChangeStakeholder(listItem)}
					>
						Change Stakeholder
					</Button>
				);
			},
		},
	];

	return {
		loading,
		list,
		paginationData,
		getNextPage,
		listRefetch: refetch,
		params,
		setParams,
		partner_id,
		locale,
		debounceQuery,
		searchQuery,
		searchValue,
		setSearchValue,
		configurationDetails,
		instanceStatus,
		columns,
		stakeholderDetail,
		setStakeholderDetail,
	};
};

export default useListAllocationDetails;
