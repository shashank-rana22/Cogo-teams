import { Table, Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../common/EmptyState';

import Filters from './Filters';
import styles from './styles.module.css';

function TableSection(props) {
	const {
		columns = [],
		onPageChange = () => {},
		loading = false,
		Component,
		setTableModal = () => {},
		tableModal = '',
		data,
		row = {},
		formProps,
		params = {},
		setParams = () => {},
	} = props;

	const { list, page = 0, page_limit = 0, total_count = 0 } = data || {};

	if (isEmpty(list) && !loading) {
		return (
			<>
				<Filters
					disabled={isEmpty(list) && !loading}
					setParams={setParams}
					params={params}
					formProps={formProps}
				/>
				<div className={styles.empty}>
					<EmptyState height="300px" width="200px" />
				</div>
			</>

		);
	}
	return (
		<div className={styles.table_main_container}>

			<Filters setParams={setParams} params={params} formProps={formProps} />

			<Table
				className={styles.table}
				columns={columns}
				data={list || []}
				loading={loading}
			/>

			{total_count > page_limit && (
				<div className={styles.pagination_container}>
					<Pagination
						type="table"
						currentPage={page}
						totalItems={total_count || 0}
						pageSize={page_limit || 10}
						onPageChange={onPageChange}
					/>
				</div>
			)}

			{Component && (
				<Component
					setTableModal={setTableModal}
					tableModal={tableModal}
					row={row}

				/>
			)}
		</div>
	);
}

export default TableSection;
