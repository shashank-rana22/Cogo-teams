import { Pagination, Placeholder } from '@cogoport/components';

import DepartmentSelect from '../../../../common/DepartmentSelect';
import EmptyState from '../../../../common/EmptyState';
import Questions from '../../../../common/QuestionsItem';
import RoleSelect from '../../../../common/RoleSelect';

import styles from './styles.module.css';

function Content({ params = {}, setParams = () => {}, list = [], total_count = '', loading = false }) {
	const setPage = (p) => { setParams({ ...params, page: p }); };

	const showLoading = () => (
		<div style={{ margin: '16px 0px' }}>
			<Placeholder margin="0px 0px 8px" style={{ borderRadius: '4px' }} width="100%" height="52px" />
			<Placeholder margin="0px 0px 8px" style={{ borderRadius: '4px' }} width="100%" height="52px" />
		</div>
	);
	return (

		<div className={styles.popover_content}>
			<div className={styles.popover_header}>
				<p>
					Active Questions
				</p>

				<div className={styles.select_container}>
					<div className={styles.select_filters}>
						<DepartmentSelect value={params.filters?.department} setValue={setParams} type="controller" />

						<RoleSelect
							value={params.filters?.work_scope}
							department={params.filters.department}
							setValue={setParams}
							type="controller"
						/>
					</div>

					{total_count > 4 && (
						<div className={styles.pagination}>
							<Pagination
								type="compact"
								currentPage={params.page}
								totalItems={total_count}
								pageSize={params.page_limit}
								onPageChange={setPage}
								style={{ marginRight: '8px' }}
							/>
						</div>
					)}
				</div>

			</div>

			<div>
				{loading && showLoading()}

				{list?.length === 0 && !loading && <EmptyState />}

				{!loading && (list || []).map((item) => (
					<Questions
						key={item.id}
						item={item}
						type="active"
					/>
				))}
			</div>
		</div>
	);
}

export default Content;
