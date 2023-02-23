import { Input, Button } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { IcMSearchlight } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import useGetColumns from '../../../../common/Columns';
import UserTableData from '../../../../common/userTableData';

import styles from './styles.module.css';
import useManagerListItem from './useManagerListItem';

function ListItem({ item }) {
	const [searchValue, setSearchValue] = useState('');
	const { query = '', debounceQuery } = useDebounceQuery();

	const {
		data: { list = [], pagination_data = {} } = {},
		loading, params, setParams, setPage,
	} = useManagerListItem({ item });
	const { total_count = '' } = pagination_data;

	const columnsToShow = ['name', 'cogo_id', 'rating', 'score', 'user_details'];

	const managerListItemColumns = useGetColumns({ source: 'hr_dashboard', columnsToShow });

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => debounceQuery(searchValue), [searchValue]);

	useEffect(() => setParams({ ...params, Q: query || undefined }));

	return (
		<div className={styles.overall_baselist}>
			<section className={styles.inner_list}>
				<Input
					size="sm"
					prefix={<IcMSearchlight />}
					placeholder="Search"
					className={styles.search}
					value={searchValue}
					onChange={setSearchValue}
				/>

				<Button
					size="md"
					themeType="secondary"
					onClick={() => {}}
					disabled={isEmpty(list)}
				>
					Download CSV
				</Button>
			</section>

			<UserTableData
				list={list}
				columns={managerListItemColumns}
				loading={loading}
				total_count={total_count}
				page_limit={params.PageLimit}
				pagination={params.Page}
				setPagination={setPage}
			/>
		</div>
	);
}

export default ListItem;
