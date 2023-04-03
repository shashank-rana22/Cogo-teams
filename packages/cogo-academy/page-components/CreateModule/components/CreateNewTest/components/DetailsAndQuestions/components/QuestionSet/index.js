import { Input, ButtonIcon, Table, Breadcrumb, Pagination } from '@cogoport/components';
import { IcMArrowRotateUp, IcMSearchlight } from '@cogoport/icons-react';

import styles from './styles.module.css';
import useQuestionSet from './useQuestionSet';

function QuestionSet({ setIdArray, setShowQuestionSet, idArray, watch }) {
	const {
		data,
		debounceQuery,
		input,
		setInput,
		loading,
		columns,
		handleSort,
		setParams,
		sort,
	} = useQuestionSet({ idArray, watch, setIdArray });

	const { page = 0, page_limit: pageLimit = 0, total_count = 0, list } = data || {};
	return (
		<div className={styles.container}>
			<Breadcrumb className={styles.bcitems}>
				<Breadcrumb.Item
					onClick={() => setShowQuestionSet(false)}
					label="Add Questions to test"
					className={styles.breadcrumb_item}
				/>
				<Breadcrumb.Item label="From Question Set" className={styles.breadcrumb_item_two} />
			</Breadcrumb>

			<p className={styles.content}>
				Select from applicable Question Sets made earlier to get probable questions for the Test
			</p>

			<div className={styles.filter}>
				<Input
					size="md"
					suffix={<ButtonIcon size="md" icon={<IcMSearchlight />} disabled={false} themeType="primary" />}
					placeholder="Search for Question/topic"
					onChange={(value) => {
						setInput(value);
						debounceQuery(value);
					}}
					value={input}
					className={styles.input}
				/>

				<div
					role="presentation"
					onClick={handleSort}
					className={styles.filter}
				>
					<IcMArrowRotateUp
						width={16}
						height={16}
						fill="#393f70"
						style={{
							transition : 'transform 0.5s',
							cursor     : 'pointer',
							transform  : sort ? 'rotate(180deg)' : '',
						}}
					/>

					<span
						className={styles.span_text}
					>
						Sort By
					</span>
				</div>
			</div>

			<Table
				className={styles.table_container}
				data={list || []}
				columns={columns}
				loading={loading}
			/>

			{total_count > pageLimit ? (
				<div className={styles.pagination_container}>
					<Pagination
						type="table"
						currentPage={page}
						totalItems={total_count}
						pageSize={pageLimit}
						onPageChange={(val) => setParams((prev) => ({
							...prev,
							page: val,
						}))}
					/>
				</div>
			) : null}
		</div>
	);
}

export default QuestionSet;
