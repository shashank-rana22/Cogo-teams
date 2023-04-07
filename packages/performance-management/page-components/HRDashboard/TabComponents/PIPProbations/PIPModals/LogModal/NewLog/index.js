import { CheckboxGroup, Textarea } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function NewLog({ item = {}, setItem = () => {} }) {
	const { tags = [], disabledTags = [], comment } = item;

	const options = [
		{
			name  : 'R1',
			value : 'Email sent to Employee',
			label : 'Email sent to Employee',
		},
		{
			name  : 'R2',
			value : 'Email sent to Manager',
			label : 'Email sent to Manager',
		},
		{ name: 'R3', value: 'Final discussion held', label: 'Final discussion held' },
	];

	const newOptions = isEmpty(disabledTags) ? options : options.map((opt) => {
		if ((disabledTags || []).includes(opt.value)) {
			return { ...opt, disabled: true };
		}
		return { ...opt };
	});

	const onChange = (type, value) => {
		setItem((prevItem) => ({
			...prevItem,
			[type]: value || undefined,
		}));
	};

	return (
		<>
			<div className={styles.label}>
				Add Comment
			</div>

			<Textarea
				style={{ height: '120px' }}
				name="comments"
				size="lg"
				placeholder="Text Area"
				value={comment}
				onChange={(val) => onChange('comment', val)}
			/>

			<CheckboxGroup
				className={styles.checkbox}
				options={newOptions}
				value={tags || []}
				onChange={(val) => onChange('tags', val)}
			/>
		</>
	);
}
export default NewLog;
