import { Textarea, Checkbox } from '@cogoport/components';

import styles from './styles.module.css';

function NewLog({ checkList = [], comments, setCheckList = () => {}, setComments = () => {} }) {
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

	return (
		<div>
			<div className={styles.lable}>Select Tags</div>

			<div className={styles.lable}>Add Comment</div>

			<Textarea
				style={{ height: '120px' }}
				name="comments"
				size="lg"
				placeholder="Text Area"
				value={comments}
				onChange={setComments}
			/>
			<Checkbox
				className={styles.checkbox}
				label="Email sent to Employee"
				checked={checkList[0]}
				onChange={() => setCheckList(!checkList[0])}
			/>
			<Checkbox
				className={styles.checkbox}
				label="Email sent to Manager"
				checked={checkList[1]}
				onChange={() => setCheckList(!checkList[1])}
			/>
			<Checkbox
				className={styles.checkbox}
				label="Final discussion held"
				checked={checkList[2]}
				onChange={() => setCheckList(!checkList[2])}
			/>
		</div>
	);
}
export default NewLog;
