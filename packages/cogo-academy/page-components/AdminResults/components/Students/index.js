import { Pagination, Table, TabPanel, Tabs } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import { useRequest } from '@cogoport/request';
import { format, startCase } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import Filters from '../../commons/Filters';

import styles from './styles.module.css';

function StudentsComponent({ test_id }) {
	const [activeTab, setActiveTab] = useState('');
	const { debounceQuery, query } = useDebounceQuery();

	const [params, setParams] = useState({});
	const [filter, setFilter] = useState('');
	const [sortBy, setSortBy] = useState('');
	const [sortType, setSortType] = useState('');
	const [searchValue, setSearchValue] = useState('');

	useEffect(() => {
		debounceQuery(searchValue);
	}, [debounceQuery, searchValue]);

	const [{ data, loading }] = useRequest({
		method : 'GET',
		url    : 'list_admin_student_wise_test_result',
		params : {
			test_id,
			sort_by     : sortBy,
			sort_type   : sortType,
			filters     : { final_result: filter },
			search_term : query,
		},
	}, { manual: false });

	const { page_limit = 0, total_count = 0, list } = data || {};

	const applySorting = (val, typ) => {
		setSortBy(val);
		setSortType(typ);
	};
	const columns = [
		{
			Header:
	<div style={{ display: 'flex', alignItems: 'baseline' }}>
		<div style={{ marginRight: '12px' }}>NAME</div>
		<div style={{ display: 'flex', flexDirection: 'column', marginTop: '-4px' }}>
			{
					(sortBy === 'user' && sortType === 'desc')
				&& (
					<div>
						<IcMArrowRotateUp
							width={12}
							height={12}
							onClick={() => { applySorting('user', 'asc'); }}
						/>
					</div>
				)
				}
			{
					!(sortBy === 'user' && sortType === 'desc')
				&& (
					<div>
						<IcMArrowRotateDown
							width={12}
							height={12}
							onClick={() => { applySorting('user', 'desc'); }}
						/>
					</div>
				)
	}
		</div>
	</div>,
			id       : 'a',
			accessor : ({ user = '' }) => (
				<section>{user}</section>
			),
		},

		{
			Header   : <div>PASSED/FAILED</div>,
			id       : 'ss',
			accessor : ({ result = 0 }) => (
				<section>{startCase(result) || '-'}</section>
			),
		},
		{
			Header:
	<div style={{ display: 'flex', alignItems: 'baseline' }}>
		<div style={{ marginRight: '12px' }}>SCORE</div>
		<div style={{ display: 'flex', flexDirection: 'column', marginTop: '-4px' }}>
			{
				(sortBy === 'score_achieved' && sortType === 'desc')
			&& (
				<div>
					<IcMArrowRotateUp
						width={12}
						height={12}
						onClick={() => { applySorting('score_achieved', 'asc'); }}
					/>
				</div>
			)
			}
			{
				!(sortBy === 'score_achieved' && sortType === 'desc')
			&& (
				<div>
					<IcMArrowRotateDown
						width={12}
						height={12}
						onClick={() => { applySorting('score_achieved', 'desc'); }}
					/>
				</div>
			)
}
		</div>
	</div>,
			id       : 'e',
			accessor : ({ score_achieved = '', total_score }) => (
				<section>
					{score_achieved || '0'}
					/
					{total_score}
				</section>
			),
		},
		{
			Header:
	<div style={{ display: 'flex', alignItems: 'baseline' }}>
		<div style={{ marginRight: '12px' }}>PERCENTILE</div>
		<div style={{ display: 'flex', flexDirection: 'column', marginTop: '-4px' }}>
			{
				(sortBy === 'percentile' && sortType === 'desc')
			&& (
				<div>
					<IcMArrowRotateUp
						width={12}
						height={12}
						onClick={() => { applySorting('percentile', 'asc'); }}
					/>
				</div>
			)
			}
			{
				!(sortBy === 'percentile' && sortType === 'desc')
			&& (
				<div>
					<IcMArrowRotateDown
						width={12}
						height={12}
						onClick={() => { applySorting('percentile', 'desc'); }}
					/>
				</div>
			)
}
		</div>
	</div>,
			id       : 'results',
			accessor : ({ percentile = '' }) => (
				<div>
					{percentile !== null ? (percentile.toFixed(2)) : (' ')}
				</div>
			),
		},
		{
			Header:
	<div style={{ display: 'flex', alignItems: 'baseline' }}>
		<div style={{ marginRight: '12px' }}>TIME TAKEN</div>
		<div style={{ display: 'flex', flexDirection: 'column', marginTop: '-4px' }}>
			{
				(sortBy === 'time_taken' && sortType === 'desc')
			&& (
				<div>
					<IcMArrowRotateUp
						width={12}
						height={12}
						onClick={() => { applySorting('time_taken', 'asc'); }}
					/>
				</div>
			)
			}
			{
				!(sortBy === 'time_taken' && sortType === 'desc')
			&& (
				<div>
					<IcMArrowRotateDown
						width={12}
						height={12}
						onClick={() => { applySorting('time_taken', 'desc'); }}
					/>
				</div>
			)
}
		</div>
	</div>,
			id       : 'time',
			accessor : ({ time_taken = '' }) => (
				<div>
					{time_taken}
				</div>
			),
		},
		{
			Header:
	<div style={{ display: 'flex', alignItems: 'baseline' }}>
		<div style={{ marginRight: '12px' }}>ATTEMPTED ON</div>
		<div style={{ display: 'flex', flexDirection: 'column', marginTop: '-4px' }}>
			{
				(sortBy === 'attempted_on' && sortType === 'desc')
			&& (
				<div>
					<IcMArrowRotateUp
						width={12}
						height={12}
						onClick={() => { applySorting('attempted_on', 'asc'); }}
					/>
				</div>
			)
			}
			{
				!(sortBy === 'attempted_on' && sortType === 'desc')
			&& (
				<div>
					<IcMArrowRotateDown
						width={12}
						height={12}
						onClick={() => { applySorting('attempted_on', 'desc'); }}
					/>
				</div>
			)
}
		</div>
	</div>,
			id       : 'updatedAt',
			accessor : ({ attempted_on = '' }) => (
				<section>
					{format(attempted_on, 'dd MMM yyyy hh:mm a')}
				</section>
			),
		},
	];

	return (
		<div>
			<div className={styles.tabs_container}>
				<Tabs
					activeTab={activeTab}
					themeType="tertiary"
					onChange={setActiveTab}
				>
					<TabPanel name="local_rates" title="Appeared" badge={3} />

					<TabPanel name="suggested_rates" title="Not Appeared" badge={5} />
				</Tabs>
			</div>

			<Filters
				filter={filter}
				setFilter={setFilter}
				searchValue={searchValue}
				setSearchValue={setSearchValue}
			/>

			<div className={styles.table_container}>
				<Table
					className={styles.table_container}
					data={list || []}
					columns={columns}
					loading={loading}
				/>

				{total_count > 10 ? (
					<div className={styles.pagination_container}>
						<Pagination
							type="table"
							currentPage={params?.page}
							totalItems={total_count}
							pageSize={page_limit}
							// onPageChange={(val) => setParams((prev) => ({ ...prev, page: val }))}
						/>
					</div>
				) : null}

			</div>
		</div>
	);
}

export default StudentsComponent;
