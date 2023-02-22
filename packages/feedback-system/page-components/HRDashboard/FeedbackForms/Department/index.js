import { Pill, Accordion } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function Department({ department, openAccordion, setOpenAccordion, setFormsParams, designation }) {
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
					<p className={styles.department_label}>{startCase(department?.department)}</p>
					<Pill color="red">Pending</Pill>
				</div>
			)}
			className={`
                    ${styles.accordion} 
                    ${openAccordion[department] ? styles.open_accordion : ''}`}
		>
			<div className={styles.roles}>
				{(department?.designations || []).map((role) => (
					<div
						className={`${styles.role} 
                                        ${role?.designation === designation ? styles.selected_designation : ''}`}
						role="button"
						tabIndex={0}
						onClick={() => setFormsParams({
							department  : department?.department,
							designation : role?.designation,
						})}
					>
						<p className={styles.role_label}>
							{startCase(role?.designation)}
						</p>
						<Pill
							color={role?.status === 'active' ? 'green' : 'red'}
						>
							{startCase(role?.status)}

						</Pill>
					</div>
				))}
			</div>

		</Accordion>
	);
}

export default Department;
