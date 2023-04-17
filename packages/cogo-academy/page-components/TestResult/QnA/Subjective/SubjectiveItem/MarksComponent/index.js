import { Input, Button, Pill } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function MarksComponent({
	view = '',
	value,
	setValue,
	loading = false,
	handleOnSubmit = () => {},
	assign_marks,
	error,
	setError,
}) {
	return (
		<div className={styles.container}>
			{view === 'admin' ? (
				<div className={styles.marks_container}>
					<div className={styles.wrapper}>

						<div className={styles.text}>
							Assign Marks
							<sup className={styles.required_mark}>*</sup>
						</div>

						<div className={styles.input_container}>
							<Input
								name="asign_marks"
								value={value}
								onChange={(e) => { setValue(e); setError(''); }}
								placeholder=" "
								suffix={<span>/10</span>}
							/>

							<div className={styles.save_button}>
								<Button
									type="button"
									size="sm"
									themeType="tertiary"
									disabled={loading}
									onClick={handleOnSubmit}
								>
									<strong>Save</strong>
								</Button>
							</div>
						</div>

					</div>

					{error ? (
						<div className={styles.error}>{error}</div>
					) : null}
				</div>
			) : (
				<div className={styles.marks_container}>
					<div className={styles.text}>Marks Obtained</div>
					<Pill size="lg" color="green"><strong>{`${assign_marks || 0}/10`}</strong></Pill>
				</div>
			)}
		</div>
	);
}

export default MarksComponent;
