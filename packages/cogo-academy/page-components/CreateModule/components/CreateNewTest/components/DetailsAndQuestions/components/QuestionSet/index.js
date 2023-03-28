import { Input, ButtonIcon, Table, Checkbox, Breadcrumb, Pill, Pagination } from '@cogoport/components';
import { IcMArrowRotateUp, IcMSearchlight } from '@cogoport/icons-react';
import { startCase, format } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import useGetTestQuestionSets from '../../../../../../hooks/useGetTestQuestionSets';

import styles from './styles.module.css';

function QuestionSet({ setIdArray, setShowQuestionSet, set_data, idArray, watch }) {
	const cogo_entity_id = watch('cogo_entity_id');

	const {
		data, loading, setParams, debounceQuery,
		input, setInput,
	} = useGetTestQuestionSets({ cogo_entity_id, activeTab: 'question_set' });

	const [sort, setSort] = useState(false);

	const { page = 0, page_limit: pageLimit = 0, total_count = 0, list } = data || {};

	const handleChange = ({ event, id }) => {
		if (event.target.checked) {
			setIdArray((prev) => [...prev, id]);
			return;
		}

		setIdArray((prev) => {
			const temp = [...prev];
			const index = temp.indexOf(id);
			if (index !== -1) {
				temp.splice(index, 1);
			}
			return temp;
		});
	};

	const correctSetIds = (set_data || []).map((item) => item.id);

	useEffect(() => {
		setIdArray(correctSetIds);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const columns = [
		{
			Header   : '',
			id       : 'check',
			accessor : ({ id = '' }) => (
				<Checkbox
					key="question_set"
					name="question_set"
					className={styles.checkbox}
					value={id}
					checked={(idArray || []).includes(id)}
					onChange={(event) => handleChange({ event, id })}
				/>
			),
		},
		{
			Header   : 'QUESTION SET NAME',
			id       : 'a',
			accessor : ({ name = '' }) => (
				<section>
					{startCase(name) || '-'}
				</section>
			),
		},
		{
			Header   : 'TOPIC',
			id       : 'b',
			accessor : ({ topic = '-' }) => (
				<section>
					<Pill
						key={topic}
						size="sm"
						color="blue"
					>
						{startCase(topic)}
					</Pill>
				</section>
			),
		},
		{
			Header   : 'USER GROUPS',
			id       : 'c',
			accessor : ({ audience_ids = [] }) => (
				<section>
					{audience_ids.map((audience_id) => (
						<Pill
							key={audience_id}
							size="sm"
							color="blue"
						>
							{startCase(audience_id)}
						</Pill>
					))}
					{audience_ids.length === 0 && '-'}
				</section>
			),
		},
		{
			Header   : 'NO. OF QUESTIONS',
			id       : 'd',
			accessor : ({ non_case_study_question_count = 0 }) => (
				<section>{non_case_study_question_count}</section>
			),
		},
		{
			Header   : 'NO. OF CASES',
			id       : 'e',
			accessor : ({
				case_study_question_count
				= 0,
			}) => (
				<section>{case_study_question_count}</section>
			),
		},
		{
			Header   : 'NO. OF TESTS USING THE SET',
			id       : 'f',
			accessor : ({ set_count = 0 }) => (
				<section>{set_count}</section>
			),
		},
		{
			Header   : 'LAST UPDATED',
			id       : 'g',
			accessor : ({ updated_at = '' }) => (
				<section>
					<span className={styles.questionsettime}>
						{format(updated_at, 'dd MMM\'yy ')}
					</span>
					<span className={styles.questionsettime}>
						{format(updated_at, 'h:mm a')}
					</span>
				</section>
			),
		},
	];
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
					className={styles.filter}
				>
					{sort ? (
						<IcMArrowRotateUp
							width={16}
							height={16}
							fill="#393f70"
							style={{
								transition : 'transform 0.5s',
								cursor     : 'pointer',
								transform  : 'rotate(180deg)',
							}}
						/>
					) : (
						<IcMArrowRotateUp
							width={16}
							height={16}
							fill="#393f70"
							style={{
								cursor     : 'pointer',
								transition : 'transform 0.5s',
							}}
						/>
					)}

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

			{total_count > 10 ? (
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
