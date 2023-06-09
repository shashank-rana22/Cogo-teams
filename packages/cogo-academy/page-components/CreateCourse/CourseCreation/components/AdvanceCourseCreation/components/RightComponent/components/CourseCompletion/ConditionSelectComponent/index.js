import { Select, Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import ModalContent from '../ModalContent';

import styles from './styles.module.css';

function ConditionSelectComponent({
	value,
	options,
	onClose,
	onChange,
	show,
	setShow,
	multiSelectedUser,
	setMultiSelectedUser,
	multiSelectedEdit,
	setMultiSelectedEdit,
	watch,
}) {
	const {
		completion_criteria:courseCriteria,
		course_completion_rewards_details:courseReward,
	} = watch();

	return (
		<div className={styles.container}>
			{!isEmpty(courseCriteria) 	? (
				<div className={styles.select_row}>
					<div className={styles.row_label}>
						Select test from Assessment Module
					</div>

					<Select
						value={value}
						onChange={onChange}
						placeholder="Select"
						options={options}
					/>
				</div>
			) : null}

			{!isEmpty(courseReward) ? (
				<div className={styles.select_row}>
					<div className={styles.row_label}>
						Select Reward Template
					</div>

					<Button
						onClick={() => setShow(true)}
						style={{ background: '#FEF199', color: '#000000' }}
						size="lg"
						className={styles.modal_btn}
					>
						Select Certificate Template
					</Button>

					{show ? (
						<ModalContent
							onClose={onClose}
							show={show}
							setShow={setShow}
							value={value}
							options={options}
							onChange={onChange}
							multiSelectedUser={multiSelectedUser}
							setMultiSelectedUser={setMultiSelectedUser}
							multiSelectedEdit={multiSelectedEdit}
							setMultiSelectedEdit={setMultiSelectedEdit}
						/>
					) : null}
				</div>
			) : null}
		</div>
	);
}

export default ConditionSelectComponent;
