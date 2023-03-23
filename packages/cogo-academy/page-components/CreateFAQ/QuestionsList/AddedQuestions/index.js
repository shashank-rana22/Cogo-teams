import { Pagination } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../../../../commons/EmpyState';
import StyledTable from '../../../../commons/StyledTable';

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
		questionListLoading,
		sortType,
		setSortType,
		requestedQuestionCount,
	} = props;

	const router = useRouter();

	const renderTable = () => {
		const onClick = () => {
			router.push(
				'/learning/faq/create/question',
				'/learning/faq/create/question',
			);
		};

		if (!questionListLoading && isEmpty(data)) {
			if (activeList === 'published') {
				return (
					<EmptyState
						text="There are no questions right now. Start with adding a question....."
						btn_text="Add Question"
						onClick={onClick}
					/>
				);
			} if (activeList === 'draft') {
				return (
					<EmptyState
						text="There are no drafts right now."
						btn_text="Add Question"
						onClick={onClick}
					/>
				);
			} if (activeList === 'inactive') {
				return (
					<EmptyState
						text="There are no inactive questions right now."
					/>
				);
			}
			return (
				<EmptyState
					text="There are no requested questions right now."
				/>
			);
		}

		return (
			<>
				<div className={styles.table}>
					<StyledTable columns={columns} data={data} loading={questionListLoading} />
				</div>

				<div className={styles.pagination}>
					{paginationData?.total_count > 10
						? (
							<Pagination
								type="table"
								currentPage={page}
								totalItems={paginationData?.total_count}
								pageSize={paginationData?.page_limit}
								onPageChange={setPage}
							/>
						) : null}
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
				sortType={sortType}
				setSortType={setSortType}
				requestedQuestionCount={requestedQuestionCount}
			/>

			{renderTable()}
		</div>
	);
}

export default AddedQuestions;
