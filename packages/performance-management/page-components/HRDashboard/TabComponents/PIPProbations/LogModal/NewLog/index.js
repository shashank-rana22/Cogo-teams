import { CheckboxGroup, Textarea } from '@cogoport/components';
import { useState, useEffect } from 'react';

import styles from './styles.module.css';

function NewLog({ item, setItem = () => {}, setDisableNext = () => {} }) {
	// const chipList = [{
	// 	key      : 'Email',
	// 	children : 'Email',
	// },
	// {
	// 	key      : 'Performance',
	// 	children : 'Performance',
	// },
	// {
	// 	key      : 'Meeting',
	// 	children : 'Meeting',
	// },
	// {
	// 	key      : 'Manager',
	// 	children : 'Manager',
	// }];
	// const { comments = '' } = logItem;

	const [comments, setComments] = useState('');
	const [value, onChange] = useState();
	const options = [
		{ name: 'R1', value: 'Email sent to Employee', label: 'Email sent to Employee' },
		{ name: 'R2', value: 'Email sent to Manager', label: 'Email sent to Manager' },
		{ name: 'R3', value: 'Final discusion held', label: 'Final discusion held' },
	];

	useEffect(() => {
		if (value || comments) {
			setDisableNext(false);
		} else {
			setDisableNext(true);
		}
		setItem({
			...item,
			comments : comments || undefined,
			tags     : value || undefined,
		});
	}, [comments, value]);

	return (
		<div>
			<div className={styles.lable}>
				Add Comment
			</div>

			<Textarea
				style={{ height: '120px' }}
				name="comments"
				size="lg"
				placeholder="Text Area"
				value={comments}
				onChange={setComments}
			/>

			<CheckboxGroup
				className={styles.checkbox}
				options={options}
				value={value}
				onChange={onChange}
			/>
		</div>
	);
}
export default NewLog;
