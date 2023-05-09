import { Input } from '@cogoport/components';
import { SelectController, useDebounceQuery, useForm } from '@cogoport/forms';
import { IcMSearchlight } from '@cogoport/icons-react';
import { useState, useEffect } from 'react';

import useGetColumns from '../../../../common/Columns';
import UserTableData from '../../../../common/UserTableData';
import feedbackDataColumns from '../../../../constants/feedback-data-columns';
import getDepartmentControls from '../../../../hooks/useGetDepartmentControls';
import useListUserFeedbacks from '../../../../hooks/useListUserFeedbacks';

import styles from './styles.module.css';

function ListItem({ item }) {
	const [searchValue, setSearchValue] = useState('');
	const { query = '', debounceQuery } = useDebounceQuery();

	const columnsToShow = feedbackDataColumns.monthWiseFeedbacks;
	const memberColumns = useGetColumns({ columnsToShow });

	const { month = '', year = '' } = item;

	const { feedbackData: tableData = {}, loading = false, setParams, params, setPage } = useListUserFeedbacks({
		month,
		year,
		searchValue     : query,
		rating_required : 'yes',
	});

	const { list = [], pagination_data = {} } = tableData;

	const { total_count = '' } = pagination_data;

	const { Department = '', Designation = '' } = params;

	const departmentDesignationControls = getDepartmentControls({ Department, Designation });

	const { watch, control } = useForm();
	const department = watch('department');
	const designation = watch('designation');

	useEffect(() => {
		setParams((pv) => ({
			...pv,
			Department  : department || undefined,
			Designation : designation || undefined,
			Page        : 1,
		}));
	}, [department, designation, setParams]);

	useEffect(() => {
		debounceQuery(searchValue);
	}, [debounceQuery, searchValue]);

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
