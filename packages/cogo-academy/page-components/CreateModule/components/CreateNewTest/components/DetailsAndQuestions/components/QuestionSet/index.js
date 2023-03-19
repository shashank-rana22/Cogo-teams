import { Input, ButtonIcon, Table, Checkbox, Breadcrumb, Pill } from '@cogoport/components';
import { IcMSearchlight, IcMArrowRotateDown } from '@cogoport/icons-react';
import { startCase, format } from '@cogoport/utils';

import useGetTestQuestionSets from '../../../../../../hooks/useGetTestQuestionSets';

import styles from './styles.module.css';

function QuestionSet({ setIdArray, setShowQuestionSet }) {
	const { data, loading } = useGetTestQuestionSets();
	// const [idArray, setIdArray] = useState([]);
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
	const columns = [
		{
			Header   : '',
			id       : 'check',
			accessor : ({ id = '' }) => (
				<Checkbox
					key="hello"
					name="hello"
					className={styles.checkbox}
					// checked={value.includes(nestedOptionValue)}
					value={id}
					onChange={(event) => { handleChange({ event, id }); }}
					// disabled={disabled}
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
					{format(updated_at, 'dd MMM yyyy')}
				</section>
			),
		},
	];
	return (
		<div className={styles.container}>
			<Breadcrumb>
				<Breadcrumb.Item
					onClick={() => setShowQuestionSet(false)}
					label="Add Questions to test"
					className={styles.breadcrumb_item}
				/>
				<Breadcrumb.Item label="From Question Set" />
			</Breadcrumb>
			<p>Select from applicable Question Sets made earlier to get probable questions for the Test</p>
			<div className={styles.filter}>
				<Input
					size="md"
					suffix={<ButtonIcon size="md" icon={<IcMSearchlight />} disabled={false} themeType="primary" />}
					placeholder="Search for Question/topic"
					className={styles.input}
				/>
				<div className={styles.filter}>
					<IcMArrowRotateDown style={{ cursor: 'pointer' }} />
					<span className={styles.span_text}>Sort By</span>
				</div>
			</div>
			<Table
				className={styles.table_container}
				data={data?.list || []}
				columns={columns}
				loading={loading}
			/>
		</div>
	);
}

export default QuestionSet;
