import { Pill, Accordion } from '@cogoport/components';
import { isEmpty, startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function Department({ department, setFormsParams, designation }) {
	const completionStatus = isEmpty(department.designations.filter((role) => role.status === 'inactive'));

	return (
		<Accordion
			key={department}
			type="form"
			title={(
				<div
					className={styles.department}
					role="button"
					tabIndex={0}
				>
					<p className={styles.department_label}>{startCase(department.department || '---')}</p>
					{!completionStatus && (
						<Pill
							color="#fef199"
						>
							Pending
						</Pill>
					)}
				</div>
			)}
			className={styles.accordion}
		>
			<div className={styles.roles}>
				{(department?.designations || []).map((role) => (
					<div
						className={`${styles.role} 
                                        ${role.designation === designation ? styles.selected_designation : ''}`}
						role="button"
						tabIndex={0}
						onClick={() => setFormsParams({
							department  : department?.department,
							designation : role?.designation,
						})}
						key={role}
					>
						<p className={styles.role_label}>
							{startCase(role.designation || '---')}
						</p>

						{role.status === 'inactive' && (
							<Pill
								color="#fef199"
							>
								Pending
							</Pill>
						)}
					</div>
				))}
			</div>

		</Accordion>
	);
}

export default Department;
