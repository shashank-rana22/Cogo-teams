import { Pagination, Table } from '@cogoport/components';
import { IcMArrowRotateUp } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import useCreateQuestionSet from '../../../../hooks/useCreateQuestionSet';
import useUpdateTest from '../../../../hooks/useUpdateTest';
import EmptyState from '../../../EmptyState';

import styles from './styles.module.css';
import { questionSetColumns, testSetColumns } from './utils/getColumns';

function ListComponent({ data, loading, setParams, activeTab, params, fetchList }) {
	const router = useRouter();

	const [sort, setSort] = useState(false);

	const { page_limit: pageLimit = 0, total_count = 0, list } = data || {};

	const columnsMapping = {
		tests         : testSetColumns,
		question_set  : questionSetColumns,
		all_questions : testSetColumns,
	};

	const {
		loading: updateLoading,
		createQuestionSet,
	} = useCreateQuestionSet();

	const { loading:updateTestLoading, updateTest } = useUpdateTest();

	const propsMapping = {
		tests         : { loading: updateTestLoading, updateApi: updateTest, fetchList, router },
		question_set  : { loading: updateLoading, updateApi: createQuestionSet, fetchList, router },
		all_questions : {},
	};

	const columns = columnsMapping[activeTab]({ ...propsMapping[activeTab] });

	console.log('loading', loading);

	if (!loading && isEmpty(data?.list)) {
		return <EmptyState />;
	}

	return (
		<div className={styles.table_container}>
			<div
				role="presentation"
				onClick={() => {
					setSort((prev) => !prev);

					setParams((prev) => ({
						...prev,
						sort_type : sort ? 'asc' : 'desc',
						filters   : {
							...prev.filters,

						},
					}));
				}}
				className={styles.sort}
			>
				{sort ? (
					<IcMArrowRotateUp
						className={`${styles.styled_icon} ${styles.rotate}`}
					/>
				) : (
					<IcMArrowRotateUp
						className={styles.styled_icon}
					/>
				)}

				<span
					className={styles.span_text}
				>
					Sort By
				</span>
			</div>

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
						pageSize={pageLimit}
						onPageChange={(val) => setParams((prev) => ({ ...prev, page: val }))}
					/>
				</div>
			) : null}

		</div>
	);
}

export default ListComponent;
