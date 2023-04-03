import { Button, Pagination } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../../../../commons/EmpyState';
import StyledTable from '../../../../commons/StyledTable';

import Header from './Header';
import styles from './styles.module.css';

const BUTTONS_MAPPING = {
	upload_in_bulk: {
		label     : 'Upload in Bulk',
		themeType : 'primary',
	},
	add_question: {
		label     : 'Add Question',
		themeType : 'secondary',
	},
};

const URL_MAPPING = {
	upload_in_bulk : ['/learning/faq/create/upload?type=questions', '/learning/faq/create/upload?type=questions'],
	add_question   : ['/learning/faq/create/question', '/learning/faq/create/question'],
};

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

	const onClickFunction = ({ type }) => {
		router.push(...URL_MAPPING[type]);
	};

	const renderTable = () => {
		if (!questionListLoading && isEmpty(data)) {
			if (activeList === 'published') {
				return (
					<EmptyState
						text="There are no questions right now. Start with adding a question....."
						btn_text="Add Question"
						onClick={() => onClickFunction({ type: 'add_question' })}
					/>
				);
			} if (activeList === 'draft') {
				return (
					<EmptyState
						text="There are no drafts right now."
						btn_text="Add Question"
						onClick={() => onClickFunction({ type: 'add_question' })}
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
				<div>
					<StyledTable columns={columns} data={data} loading={questionListLoading} />
				</div>

				<div>
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
		<div>
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

			<div className={styles.button_container}>
				{Object.keys(BUTTONS_MAPPING).map((item) => {
					const { label, themeType } = BUTTONS_MAPPING[item];

					return (
						<Button
							type="button"
							style={{ marginLeft: 8 }}
							onClick={() => onClickFunction({ type: item })}
							themeType={themeType}
						>
							{label}
						</Button>
					);
				})}
			</div>

			{renderTable()}
		</div>
	);
}

export default AddedQuestions;
