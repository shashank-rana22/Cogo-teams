import { InputController, CheckboxController } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowDown, IcMArrowUp } from '@cogoport/icons-react';
import React, { useState } from 'react';

import styles from './styles.module.css';

const ONE = 1;
const TWO = 2;
const THREE = 3;
function InterviewQuestions({ control = {}, errors = {}, data = {} }) {
	const { notes } = data || {};
	const [show, setShow] = useState(false);
	return (
		<div className={styles.container}>
			<div className={styles.heading} aria-hidden onClick={() => setShow(!show)}>
				<span>Questions for Interview</span>
				{show ? <IcMArrowUp /> : <IcMArrowDown />}
			</div>
			{show ? (
				<>
					<div className={styles.body_container}>
						<div className={styles.sub_heading}>
							<span>Could you share with me the factors that led to your decision to resign?</span>
							<span className={styles.star}>*</span>
						</div>

						<InputController
							control={control}
							name="your_notes"
							size="md"
							style={{ marginRight: '8px', width: '100%' }}
							placeholder="Type your notes here"
							rules={{ required: 'this is required' }}
							disabled={notes?.[GLOBAL_CONSTANTS.zeroth_index]?.value}
						/>
						{errors.your_notes && (
							<span className={styles.error}>*This field is Required</span>
						)}

						<div className={styles.below_text}>
							<div>
								<CheckboxController
									control={control}
									name="your_notes_cb"
									size="md"
									disabled={notes?.[GLOBAL_CONSTANTS.zeroth_index]?.value}
								/>
							</div>
							<div className={styles.manager_text}>Share with manager</div>
						</div>
					</div>

					<div className={styles.body_container}>
						<div className={styles.sub_heading}>
							<span>
								Are there specific professional aspirations
								that you feel are not being fulfilled?
							</span>
							<span className={styles.manager_text}> optional</span>
						</div>
						<InputController
							control={control}
							name="your_notes_2"
							size="md"
							style={{ marginRight: '8px', width: '100%' }}
							placeholder="Type your notes here"
							disabled={notes?.[ONE]?.value || notes?.[GLOBAL_CONSTANTS.zeroth_index]?.value}
						/>
						<div className={styles.below_text}>
							<div>
								<CheckboxController
									control={control}
									name="your_notes_cb_2"
									size="md"
									disabled={notes?.[ONE]?.value || notes?.[GLOBAL_CONSTANTS.zeroth_index]?.value}
								/>
							</div>
							<div className={styles.manager_text}>Share with manager</div>
						</div>
					</div>

					<div className={styles.body_container}>
						<div className={styles.sub_heading}>
							<span>
								Are there tasks or responsibilities
								that you believe hinder your professional growth?
							</span>
							<span className={styles.manager_text}> optional</span>
						</div>

						<InputController
							control={control}
							name="your_notes_3"
							size="md"
							style={{ marginRight: '8px', width: '100%' }}
							placeholder="Type your notes here"
							disabled={notes?.[TWO]?.value || notes?.[GLOBAL_CONSTANTS.zeroth_index]?.value}
						/>
						<div className={styles.below_text}>
							<div>
								<CheckboxController
									control={control}
									name="your_notes_cb_3"
									size="md"
									disabled={notes?.[TWO]?.value || notes?.[GLOBAL_CONSTANTS.zeroth_index]?.value}
								/>
							</div>
							<div className={styles.manager_text}>Share with manager</div>
						</div>
					</div>

					<div className={styles.body_container}>
						<div className={styles.sub_heading}>
							<span>
								Any other thing that you want to
								share with me, which you could not have shared with anyone else?
							</span>
							<span className={styles.star}>*</span>
						</div>
						<InputController
							control={control}
							name="your_notes_4"
							size="md"
							placeholder="Type your notes here"
							rules={{ required: 'this is required' }}
							disabled={notes?.[THREE]?.value}
						/>
						{errors.your_notes_4 && (
							<span className={styles.error}>*This field is Required</span>
						)}
						<div className={styles.below_text}>
							<div>
								<CheckboxController
									control={control}
									name="your_notes_cb_4"
									size="md"
									disabled
								/>
							</div>
							<div className={styles.manager_text}>Share with manager</div>
						</div>
					</div>
				</>
			) : null}
		</div>
	);
}

export default InterviewQuestions;
