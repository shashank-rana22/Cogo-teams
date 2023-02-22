import { Input } from '@cogoport/components';
import { SelectController, useDebounceQuery, useForm } from '@cogoport/forms';
import { IcMSearchlight } from '@cogoport/icons-react';
import { useState, useEffect } from 'react';

import useGetColumns from '../../../../common/Columns';
import UserTableData from '../../../../common/userTableData';
import useListUserFeedbacks from '../../../../hooks/useListUserFeedbacks';
import getDepartmentControls from '../../../../utils/departmentControls';

import styles from './styles.module.css';

function ListItem({ item }) {
	const [searchValue, setSearchValue] = useState('');
	const { query = '', debounceQuery } = useDebounceQuery();

	const columnsToShow = ['name', 'cogo_id', 'score', 'view_form'];
	const memberColumns = useGetColumns({ columnsToShow });

	const { month = '', year = '' } = item;

	const { data: tableData = {}, loading = false, setParams, params, setPage } = useListUserFeedbacks({
		month,
		year,
		searchValue: query,
	});

	const { list = [], pagination_data = {} } = tableData;
	const { total_count = '' } = pagination_data;

	const { Department = '', Designation = '' } = params;

	const departmentDesignationControls = getDepartmentControls({ Department, Designation });

	const { watch, control } = useForm();
	const department = watch('department');
	const designation = watch('designation');

	useEffect(() => {
		setParams({
			...params,
			Department  : department || undefined,
			Designation : designation || undefined,
			Page        : 1,
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [department, designation]);

	useEffect(() => {
		debounceQuery(searchValue);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchValue]);

	return (
		<div className={styles.overall_baselist}>
			<section className={styles.inner_list}>
				<div className={styles.selects}>
					{departmentDesignationControls.map((cntrl) => (
						<SelectController
							{...cntrl}
							control={control}
							style={{ marginRight: '8px' }}
							key={cntrl.name}
						/>
					))}
				</div>

				<Input
					value={searchValue}
					onChange={setSearchValue}
					suffix={<IcMSearchlight />}
					placeholder="Search"
					className={styles.search}
				/>
			</section>

			<UserTableData
				list={list}
				columns={memberColumns}
				loading={loading}
				pagination={params.Page}
				setPagination={setPage}
				total_count={total_count}
				page_limit={params.PageLimit}
			/>
		</div>
	);
}

export default ListItem;
