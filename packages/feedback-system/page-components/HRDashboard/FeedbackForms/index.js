import { Pill } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import CreateFeedbackForm from './CreateFeedbackForm';
import Forms from './Forms';
import styles from './styles.module.css';

const departmentRoleMapping = {
	technology : ['a', 'b', 'c'],
	finance    : ['a', 'b', 'c'],
	design     : ['a', 'b', 'c'],
	marketing  : ['a', 'b', 'c'],
};

function FeedbackForms() {
	const Router = useRouter();

	const [activeTab, setActiveTab] = useState('forms');
	const [openAccordion, setOpenAccordion] = useState({});
	const [openCreateForm, setOpenCreateForm] = useState(false);
	const [formsParams, setFormsParams] = useState({});

	const routeToHRDashboard = () => {
		Router.push('/feedback-system/hr-dashboard');
	};
	return (
		<div className={styles.container}>
			<div className={styles.go_back_container}>
				<div
					className={styles.redirect_container}
					role="button"
					tabIndex={0}
					onClick={() => {
						routeToHRDashboard();
					}}
				>
					<IcMArrowBack style={{ marginRight: '8px' }} width={16} height={16} />
					<p className={styles.text}>Go Back</p>
				</div>
			</div>

			<div className={styles.header}>
				Forms
			</div>

			<div className={styles.form_container}>
				<div className={styles.department_status} style={{ flex: '0.3' }}>
					{Object.keys(departmentRoleMapping).map((department) => (
						<div key={department}>
							<div
								className={`
								${styles.accordion} 
								${openAccordion[department] ? styles.open_accordion : ''}`}
								role="button"
								tabIndex={0}
								onClick={() => setOpenAccordion({ [department]: !openAccordion[department] })}
							>
								<div className={styles.department}>
									<p className={styles.label}>{startCase(department)}</p>
									<Pill color="red">Pending</Pill>
								</div>

							</div>
							{openAccordion[department]
						&& 							(
							<div className={styles.roles}>
								{departmentRoleMapping[department].map((role) => (
									<div
										className={styles.role}
										role="button"
										tabIndex={0}
										onClick={() => setFormsParams({ department, designation: role })}
									>
										<p className={styles.label}>
											{startCase(role)}
										</p>
										<Pill color="red">Pending</Pill>
									</div>
								))}
							</div>
						)}
						</div>

					))}
				</div>

				<div className={styles.form_section} style={{ flex: '0.7' }}>
					{openCreateForm ? (
						<CreateFeedbackForm setOpenCreateForm={setOpenCreateForm} />
					) : (
						<Forms
							formsParams={formsParams}
							openCreateForm={openCreateForm}
							setOpenCreateForm={setOpenCreateForm}
						/>
					)}
				</div>
			</div>
		</div>

	);
}

export default FeedbackForms;
