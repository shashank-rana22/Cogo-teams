import { Popover } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { useAllocationRequest } from '@cogoport/request';
import { format } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import Actions from '../components/AllocationQuotas/List/Actions';
import styles from '../components/AllocationQuotas/List/styles.module.css';

const useListAllocationQuotas = () => {
	const { debounceQuery, query: searchQuery } = useDebounceQuery();

	const [searchValue, setSearchValue] = useState();
	const [quotaItem, setQuotaItem] = useState(null);
	const [popoverId, setPopoverId] = useState(false);

	const [params, setParams] = useState({
		sort_type : 'desc',
		sort_by   : 'created_at',
		page      : 1,
		filters   : {
			status     : 'active',
			quota_type : 'role',
			q          : searchQuery || undefined,
		},
	});

	const api = useAllocationRequest({
		url     : '/quotas',
		method  : 'get',
		authkey : 'get_allocation_quotas',
		params,
	}, { manual: false });

	const [{ loading, data }, refetch] = api;

	const getNextPage = (newPage) => {
		setParams((previousParams) => ({
			...previousParams,
			page: newPage,
		}));
	};

	useEffect(() => {
		setParams((prevParams) => ({
			...prevParams,
			filters: {
				...prevParams.filters,
				q: searchQuery || undefined,
			},
		}));
	}, [searchQuery]);

	const columns = [
		{
			key      : 'role',
			Header   : 'Role',
			accessor : ({ role }) => <div>{role?.name || '___'}</div>,
		},
		{
			key      : 'user',
			Header   : 'User',
			accessor : ({ user }) => <div>{user?.name || '___'}</div>,
		},
		{
			key      : 'user_email',
			Header   : 'User Email',
			accessor : ({ user }) => <div className={styles.email_id}>{user?.email || '___'}</div>,
		},
		{
			key      : 'created_by',
			Header   : 'Created by',
			accessor : ({ created_by }) => <div>{created_by.name || '___'}</div>,
		},
		{
			key      : 'email',
			Header   : 'Email',
			accessor : ({ created_by }) => (<div className={styles.email_id}>{created_by.email || '___'}</div>),
		},
		{
			key      : 'created_at',
			Header   : 'Created At',
			accessor : ({ created_at }) => (
				<div>
					{created_at	 ? (
						<div className={styles.created_date}>
							{format(created_at, 'dd MMM yyyy') || '___'}

							<div className={styles.created_time}>
								{format(created_at, 'hh:mm aaa') || '___'}
							</div>
						</div>
					) : '___'}
				</div>

			),
		},
		{
			key      : 'action',
			Header   : 'Action',
			accessor : (item) => {
				const { id } = item;

				return (
					<div className={styles.content_container}>
						<Popover
							visible={popoverId === id}
							placement="left"
							interactive
							render={(
								<Actions onClickCta={({ type }) => {
									setQuotaItem({
										...(type === 'edit' && item),
										id,
										type,
									});

									setPopoverId(null);
								}}
								/>
							)}
							onClickOutside={() => setPopoverId(null)}
						>
							<div
								className={styles.svg_container}
								onClick={() => setPopoverId((pv) => (pv === id ? null : id))}
								role="presentation"
							>
								<IcMOverflowDot height={16} width={16} />
							</div>
						</Popover>
					</div>
				);
			},
		},
	];

	return {
		data,
		columns,
		loading,
		getNextPage,
		params,
		setParams,
		quotaItem,
		setQuotaItem,
		refetch,
		debounceQuery,
		searchValue,
		setSearchValue,
	};
};

export default useListAllocationQuotas;
