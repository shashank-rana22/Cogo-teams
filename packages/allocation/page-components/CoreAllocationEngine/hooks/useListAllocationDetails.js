import { Button, Legend, Tooltip, Pill } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { useAllocationRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { startCase } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import styles from '../components/AllocationDetails/List/styles.module.css';
import DETAILS_STATUS_COLOR_MAPPING from '../constants/details-status-color-mapping';

const useListAllocationDetails = ({ t = () => {} }) => {
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
		setParams((prevParams) => ({
			...prevParams,
			filters: {
				...prevParams.filters,
				q: searchQuery || undefined,
			},
		}));
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
			Header   : t('allocation:serial_id_header'),
			accessor : ({ organization = {} }) => (
				<Pill color="blue" size="lg">{organization.serial_id || '___'}</Pill>
			),
		},
		{
			Header   : t('allocation:organization'),
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
			Header   : t('allocation:user_label'),
			accessor : ({ user = {} }) => (
				<div>{startCase((user.name || '___').toLowerCase())}</div>
			),
		},
		{
			Header   : t('allocation:old_stakeholder'),
			accessor : ({ old_stakeholder = {}, old_stakeholder_type = '' }) => (
				<div>
					<div>
						{startCase(old_stakeholder.name || '___')}
					</div>
					<div className={styles.stakeholder_type}>
						{startCase(old_stakeholder_type || '___')}
					</div>
				</div>
			),
		},
		{
			Header   : t('allocation:new_stakeholder'),
			accessor : ({ stakeholder = {}, stakeholder_type = '' }) => (
				<div>
					<div>
						{startCase(stakeholder.name || '___')}
					</div>
					<div className={styles.stakeholder_type}>
						{startCase(stakeholder_type || '___')}
					</div>
				</div>
			),
		},
		{
			Header   : t('allocation:status_header'),
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
			Header   : t('allocation:action_header'),
			accessor : (listItem = {}) => {
				const { status = '' } = listItem;

				return (
					<Button
						size="sm"
						themeType="secondary"
						disabled={status === 'approved'}
						onClick={() => onClickChangeStakeholder(listItem)}
					>
						{t('allocation:change_stakeholder')}
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
