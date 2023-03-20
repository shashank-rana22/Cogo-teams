import { Pagination, Table, Button, Tooltip, Pill } from '@cogoport/components';
import { IcMOverflowDot, IcMDelete, IcMEdit, IcMEyeopen } from '@cogoport/icons-react';
import { startCase, format } from '@cogoport/utils';
// import { useRouter } from '@cogoport/next';
// import { format, startCase, isEmpty } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';
// import useUpdateServiceBundle from './useUpdateServiceBundle';

function ListComponent({ data, loading, fetchList:refetchListServiceBundle, setParams }) {
	const { page = 0, page_limit: pageLimit = 0, total_count = 0, list } = data || {};

	const columns = [
		{
			Header   : 'NAME',
			id       : 'a',
			accessor : ({ name = '' }) => (
				<section>{name}</section>
			),
		},
		{
			Header   : 'TOPICS',
			id       : 'c',
			accessor : ({ topic = [] }) => (
				<section>
					{topic.map((topicItem) => (
						<Pill
							key={topicItem}
							size="sm"
							color="blue"
						>
							{startCase(topicItem)}
						</Pill>
					))}
					{topic.length === 0 && '-'}
				</section>
			),
		},
		{
			Header   : 'TOTAL QUESTIONS/CASES',
			id       : 'd',
			accessor : ({ case_study_questions = 0, stand_alone_questions = 0 }) => (
				<section>
					{stand_alone_questions || 0}
					{' '}
					Q +
					{' '}
					{case_study_questions || 0}
					{' '}
					Cases
				</section>
			),
		},
		{
			Header   : 'ALLOWED ATTEMPTS',
			id       : 'ss',
			accessor : ({ maximum_attempts = 0 }) => (
				<section>{maximum_attempts || '-'}</section>
			),
		},
		{
			Header   : 'PASS %',
			id       : 'e',
			accessor : ({ cut_off_marks = '' }) => (
				<section>
					{cut_off_marks || '-'}
				</section>
			),
		},
		{
			Header   : 'ATTEMPTED BY',
			id       : 'ik',
			accessor : ({ audience_ids = [] }) => (
				<section>{audience_ids.length}</section>
			),
		},
		{
			Header   : 'STATUS',
			id       : 'tags',
			accessor : ({ status = '' }) => (
				<section>{status}</section>
			),
		},
		{
			Header   : 'LAST UPDATED',
			id       : 'updatedAt',
			accessor : ({ updated_at = '' }) => (
				<section>
					{format(updated_at, 'dd MMM yyyy')}
				</section>
			),
		},
		{
			Header   : '',
			id       : 'options',
			accessor : () => (

				<section>
					<div
						role="presentation"
					>
						<div style={{
							width  : 'fit-content',
							cursor : 'default',
						}}
						>
							<Tooltip
								className={styles.tooltip_pad}
								content={(
									<div className={styles.options}>
										<Button
											themeType="secondary"
											className={styles.btn}
											// onClick={() => router.push(`/service-bundling/edit?bundle_id=${id}`)}
										>
											<IcMEdit />
											<div style={{ marginLeft: '8px' }}>
												Edit
											</div>
										</Button>
										<Button
											themeType="secondary"
											className={styles.btn}
											// onClick={() => router.push(`/service-bundling/view?bundle_id=${id}`)}
										>

											<IcMEyeopen />
											<div style={{ marginLeft: '8px' }}>
												View
											</div>
										</Button>
										<Button
											themeType="secondary"
											className={styles.btn}
											// onClick={() => {
											// 	onDelete(id);
											// }}
										>
											<IcMDelete />
											<div style={{ marginLeft: '8px' }}>
												Delete
											</div>
										</Button>

									</div>
								)}
								trigger="click"
								placement="left"
								interactive="true"
							>
								<IcMOverflowDot style={{ cursor: 'pointer' }} />
							</Tooltip>
						</div>

					</div>
				</section>
			),

		},
	];

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
						currentPage={page}
						totalItems={total_count}
						pageSize={pageLimit}
						onPageChange={(val) => setParams({ page: val })}
					/>
				</div>
			) : null}

		</div>
	);
}

export default ListComponent;
