import { Legend, Button, Pill } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useAllocationRequest } from '@cogoport/request';
import { format, isEmpty, startCase } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import styles from '../components/AllocationConfigurations/Actions/Instances/ListInstances/styles.module.css';
import INSTANCES_STATUS_COLOR_MAPPING from '../constants/instances-status-color-mapping';
// eslint-disable-next-line max-len

const useListAllocationInstances = ({ item = {} }) => {
	const { push } = useRouter();

	const onRowClick = (listItem) => {
		const { status, id } = listItem;

		if (['pending_approval', 'completed'].includes(status)) {
			push(
				'/allocation/core-engine/details/[instance_id]',
				`/allocation/core-engine/details/${id}`,
			);
		}
	};

	const [params, setParams] = useState({
		sort_by    : 'created_at',
		page       : 1,
		page_limit : 5,
		filters    : {
			allocation_id: item.allocation_schedule?.id,
		},
	});

	const [dateRange, setDateRange] = useState({});

	useEffect(() => {
		if (!isEmpty(dateRange)) {
			setParams((previousParams) => ({
				...(previousParams || {}),
				filters: {
					...((previousParams || {}).filters || {}),
					created_at_greater_than : dateRange?.startDate || undefined,
					created_at_less_than    : dateRange?.endDate || undefined,
				},
			}));
		}
	}, [dateRange]);

	const [{ data, loading }] = useAllocationRequest({
		url     : '/instances',
		method  : 'get',
		authkey : 'get_allocation_instances',
		params,
	}, { manual: false });

	const getNextPage = (newPage) => {
		setParams((previousParams) => ({
			...previousParams,
			page: newPage,
		}));
	};

	const columns = [
		{
			Header   : 'Serial Id',
			accessor : ({ serial_id = '' }) => (
				<Pill color="blue" size="lg">{serial_id || '___'}</Pill>
			),
		},
		{
			Header   : 'Created At',
			accessor : ({ created_at = '' }) => (
				<div>{created_at ? format(created_at, 'dd MMM yyyy') : '___'}</div>
			),
		},
		{
			Header   : 'Updated At',
			accessor : ({ updated_at = '' }) => (
				<div>{updated_at ? format(updated_at, 'dd MMM yyyy') : '___'}</div>
			),
		},
		{
			Header   : 'Execution At',
			accessor : ({ execution_at = '' }) => (
				<div>{execution_at ? format(execution_at, 'dd MMM yyyy') : '___'}</div>
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
							label : startCase(status),
							color : INSTANCES_STATUS_COLOR_MAPPING[status],
							key   : id,
						},
					]}
				/>
			),
		},
		{
			Header   : 'Action',
			accessor : ({ id = '', status = '' }) => (
				<Button
					size="sm"
					themeType="secondary"
					onClick={() => onRowClick({ id, status })}
					disabled={!['pending_approval', 'completed'].includes(status)}
				>
					View Details
				</Button>
			),
		},
	];

	const { list = [], ...paginationData } = data || {};

	return {
		listLoading: loading,
		list,
		paginationData,
		getNextPage,
		dateRange,
		setDateRange,
		columns,
	};
};

export default useListAllocationInstances;
