import { Input, Button, Pill } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const MIN_MARKS = 0;

function MarksComponent({
	view = '',
	value,
	setValue,
	loading = false,
	handleOnSubmit = () => {},
	assign_marks,
	error,
	setError,
	status,
}) {
	const isAllowedToAssignMarks = view === 'admin' && status !== 'published';

	return (
		<div className={styles.container}>
			{isAllowedToAssignMarks ? (
				<div className={styles.marks_container}>
					<div className={styles.wrapper}>

						<div className={styles.text}>
							Assign Marks in the range 1 to 10
							<sup className={styles.required_mark}>*</sup>
						</div>

						<div className={styles.input_container}>
							<Input
								name="asign_marks"
								size="xs"
								value={value}
								onChange={(e) => { setValue(e); setError(''); }}
								placeholder=" "
							/>
						</div>
						<div className={styles.save_button}>
							<Button
								type="button"
								size="sm"
								themeType="primary"
								disabled={loading}
								onClick={handleOnSubmit}
							>
								<strong>Save</strong>
							</Button>
						</div>

						<div className={styles.passing_marks}>Passing marks: 4</div>
					</div>

					{error ? (
						<div className={styles.error}>{error}</div>
					) : null}
				</div>
			) : (
				<div className={styles.marks_obtained_container}>
					<div className={styles.text}>Marks Obtained</div>
					<Pill size="lg" color="green"><strong>{`${assign_marks || MIN_MARKS}/10`}</strong></Pill>
				</div>
			)}
		</div>
	);
}

export default MarksComponent;
