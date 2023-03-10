import { Button, Pagination } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../../../commons/EmptyState';
import StyledTable from '../../../commons/StyledTable';

import Header from './Header';
import styles from './styles.module.css';

function AddedQuestions(props) {
	const {
		page,
		setPage,
		paginationData,
		data,
		columns,
		filters,
		setFilters,
		searchInput,
		setSearchInput,
		activeList,
		setActiveList,
		AnnouncementListLoading,
	} = props;

	const router = useRouter();
	const columns1 = [
		{ Header: 'Description', accessor: 'description' },
		{ Header: 'Tags', accessor: 'tags' },
		{ Header: 'Topics', accessor: 'topics' },
		{ Header: 'Last Edited', accessor: 'last_edited' },
		{
			Header   : 'Actions',
			accessor : () => (
				<div className={styles.action_container}>

					<Button
						themeType="primary"
						size="sm"
						style={{ marginRight: 8 }}
					>
						VIEW
					</Button>
					<Button
						themeType="secondary"
						size="sm"
						style={{ marginRight: 8 }}
					>
						EDIT
					</Button>
					<IcMDelete
						height={20}
						width={20}
						style={{ cursor: 'pointer' }}
					/>
				</div>
			),
		},
	];
	const data1 = [
		{
			description : 'tanner',
			tags        : 'linsley',
			topics      : 'nfjre',
			last_edited : 'ejnrfrj',
			Actions     : 'fer',

		},
		{
			description : 'tanner',
			tags        : 'linsley',
			topics      : 'nfjre',
			last_edited : 'ejnrfrj',
			Actions     : 'fer',

		},
		{
			description : 'tanner',
			tags        : 'linsley',
			topics      : 'nfjre',
			last_edited : 'ejnrfrj',
			Actions     : 'fer',

		},
	];

	const renderTable = () => {
		const onClick = () => {
			router.push(
				'/learning/faq/create/question',
				'/learning/faq/create/question',
			);
		};

		// if (!AnnouncementListLoading && isEmpty(data)) {
		// 	if (activeList === 'active') {
		// 		return (
		// 			<EmptyState
		// 				text="There are no announcements right now. Start with adding a announcement."
		// 				btn_text="Add Announcement"
		// 				onClick={onClick}
		// 			/>
		// 		);
		// 	}
		// 	return (
		// 		<EmptyState
		// 			text="There are no inactive announcements right now."
		// 		/>
		// 	);
		// }
		return (
			<>
				<div className={styles.table}>
					<StyledTable columns={columns1} data={data1} loading={AnnouncementListLoading} />
				</div>

				<div className={styles.pagination}>
					<Pagination
						type="table"
						currentPage={page}
						totalItems={paginationData?.total_count}
						pageSize={paginationData?.page_limit}
						onPageChange={setPage}
					/>
				</div>
			</>
		);
	};

	return (
		<div className={styles.container}>
			<Header
				filters={filters}
				setFilters={setFilters}
				searchInput={searchInput}
				setSearchInput={setSearchInput}
				activeList={activeList}
				setActiveList={setActiveList}
			/>

			{renderTable()}
		</div>
	);
}

export default AddedQuestions;
