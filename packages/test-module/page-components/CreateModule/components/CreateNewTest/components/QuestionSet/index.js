import { Button, Input, ButtonIcon, Table, Checkbox, Breadcrumb } from '@cogoport/components';
import { IcMSearchlight, IcMArrowRotateDown } from '@cogoport/icons-react';

import styles from './styles.module.css';

function QuestionSet({ setShowNewQuestion }) {
	const list = [];
	const columns = [
		{
			Header   : '',
			id       : 'check',
			accessor : () => (
				<Checkbox
					key="hello"
					name="hello"
					className={styles.checkbox}
					// checked={value.includes(nestedOptionValue)}
					value="hello"
					// onChange={(event) => { handleChange({ event, name }); }}
					// disabled={disabled}
				/>
			),
		},
		{
			Header   : 'QUESTION SET NAME',
			id       : 'a',
			accessor : () => (
				<section>
					hello
				</section>
			),
		},
		{
			Header   : 'TOPIC',
			id       : 'b',
			accessor : () => (
				<section>hello</section>
			),
		},
		{
			Header   : 'USER GROUPS',
			id       : 'c',
			accessor : () => (
				<section>hello</section>
			),
		},
		{
			Header   : 'NO. OF QUESTIONS',
			id       : 'd',
			accessor : () => (
				<section>hello</section>
			),
		},
		{
			Header   : 'NO. OF CASES',
			id       : 'e',
			accessor : () => (
				<section>hello</section>
			),
		},
		{
			Header   : 'NO. OF TESTS USING THE SET',
			id       : 'f',
			accessor : () => (
				<section>hello</section>
			),
		},
		{
			Header   : 'LAST UPDATED',
			id       : 'g',
			accessor : () => (
				<section>hello</section>
			),
		},
	];
	return (
		<div>
			<Breadcrumb>
				<Breadcrumb.Item label="Add Questions to test" />
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
					<IcMArrowRotateDown />
					<span className={styles.span_text}>Sort By</span>
				</div>
			</div>
			<Table
				className={styles.table_container}
				data={[1, 2, 3]}
				columns={columns}
			/>
		</div>
	);
}

export default QuestionSet;
