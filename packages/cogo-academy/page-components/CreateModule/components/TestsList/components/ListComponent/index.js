import { Pagination, Table } from '@cogoport/components';
// import { useRouter } from '@cogoport/next';
// import { format, startCase, isEmpty } from '@cogoport/utils';
import { useRouter } from '@cogoport/next';
import React from 'react';

import useCreateQuestionSet from '../../../../hooks/useCreateQuestionSet';

import styles from './styles.module.css';
import { questionSetColumns, testSetColumns } from './utils/getColumns';

// import useUpdateServiceBundle from './useUpdateServiceBundle';

function ListComponent({ data, loading, setParams, activeTab, params, fetchList }) {
	const router = useRouter();

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

	const propsMapping = {
		tests         : {},
		question_set  : { loading: updateLoading, updateApi: createQuestionSet, fetchList, router },
		all_questions : {},
	};

	const columns = columnsMapping[activeTab]({ ...propsMapping[activeTab] });

	return (
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
						pageSize={pageLimit}
						onPageChange={(val) => setParams((prev) => ({ ...prev, page: val }))}
					/>
				</div>
			) : null}

		</div>
	);
}

export default ListComponent;
