import { Select, Table, Input } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { IcMSearchlight } from '@cogoport/icons-react';
import { useState, useEffect } from 'react';

import useGetColumns from '../../../../common/Columns';
import useListUserFeedbacks from '../../../../hooks/useListUserFeedbacks';
import { deptControls as departmentControls } from '../../../../utils/departmentControls';

import styles from './styles.module.css';

const DEPARTMENT_MAPPING = {
	technology : 'tech_role',
	finance    : 'finance_role',
	business   : 'business_role',
};

function ListItem({ item }) {
	const [searchValue, setSearchValue] = useState('');
	const { query = '', debounceQuery } = useDebounceQuery;

	const columnsToShow = ['name', 'cogo_id', 'score', 'view_form'];
	const memberColumns = useGetColumns({ columnsToShow });

	const { month = '', year = '' } = item;

	const { data: tableData = {}, loading = false, setParams, params } = useListUserFeedbacks({
		month,
		year,
		searchValue: query,
	});

	const deptControls = departmentControls.find((control) => control.name === 'department');

	const roleControls = params.filters?.department ? departmentControls.find((control) => control.name
	=== DEPARTMENT_MAPPING[params.filters?.department]) : {};

	const setFilter = (val, type) => {
		setParams({ ...params, filters: { ...(params.filters || {}), [type]: val } });
	};

	useEffect(() => {
		debounceQuery(searchValue);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchValue]);

	return (
		<div className={styles.overall_baselist}>
			<section className={styles.inner_list}>
				<Select
					size="sm"
					value={params.filters?.department}
					onChange={(val) => setFilter(val, 'department')}
					options={deptControls.options}
					placeholder="Department..."
					style={{ marginRight: '8px' }}
					isClearable={!params.filters?.designation}
				/>

				<Select
					size="sm"
					value={params.filters?.designation}
					onChange={(val) => setFilter(val, 'designation')}
					options={roleControls.options}
					disabled={!params.filters?.department}
					placeholder="Role..."
					style={{ marginRight: '8px' }}
					isClearable
				/>

				<Input
					size="sm"
					value={searchValue}
					onChange={setSearchValue}
					suffix={<IcMSearchlight />}
					placeholder="Search"
					className={styles.search}
				/>
			</section>
			<Table data={tableData} columns={memberColumns} loading={loading} />
		</div>
	);
}

export default ListItem;
