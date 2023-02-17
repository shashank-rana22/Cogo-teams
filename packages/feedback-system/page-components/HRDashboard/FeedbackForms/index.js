import { Accordion, Button, Toast, Pill } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { startCase } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import fetchLocalCheckList from '../../../utils/fetchLocalCheckList';

import CreateFeedbackForm from './CreateFeedbackForm';
import Forms from './Forms';
import styles from './styles.module.css';

const departmentRoleMapping = {
	technology : ['p', 'q', 'r'],
	finance    : ['a', 'b', 'c'],
	design     : ['x', 'y', 'z'],
	marketing  : ['e', 'f', 'g'],
};

const getFormResubmission = (department = '', designation = '') => {
	let lastFormStatus;

	if (department && designation) {
		lastFormStatus = fetchLocalCheckList(department, designation);
		if (lastFormStatus?.stage) {
			Toast.default('Form Resubmission');

			return { department, designation, stage: lastFormStatus.stage };
		}
		return {};
	}

	const localForms = fetchLocalCheckList();

	const lastForm = Object.keys(localForms)?.[Object.keys(localForms).length - 1] || '';
	lastFormStatus = localForms[lastForm];
	if (lastFormStatus?.stage) {
		Toast.default('Form Resubmission');

		return {
			department  : lastForm.split('_')[0],
			designation : lastForm.split('_')[1],
			stage       : lastFormStatus.stage,
		};
	}
	return {};
};

function FeedbackForms() {
	const Router = useRouter();

	const [openAccordion, setOpenAccordion] = useState({});
	const [formId, setFormId] = useState('');

	const [openCreateForm, setOpenCreateForm] = useState(false);
	const [formStage, setFormStage] = useState('add_questions');

	const [formsParams, setFormsParams] = useState({});

	const { department, designation } = formsParams;

	const routeToHRDashboard = () => {
		Router.push('/feedback-system/hr-dashboard');
	};

	useEffect(() => {
		const newDesignationFormStatus = getFormResubmission(department, designation);

		const {
			stage: newFormStage = '', department: newFormDepartment = '',
			designation: newFormDesignation = '',
		} = newDesignationFormStatus;

		if (newFormStage) {
			if (!designation) {
				setFormsParams({
					department  : newFormDepartment || '',
					designation : newFormDesignation || '',
				});
				setOpenAccordion({ [newFormDepartment]: true });
			}
			setOpenCreateForm(true);
			setFormStage(newFormStage);
			return;
		}
		setOpenCreateForm(false);
	}, [designation]);

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
					{Object.keys(departmentRoleMapping).map((dept) => (
						<Accordion
							key={dept}
							type="form"
							title={(
								<div
									className={styles.department}
									role="button"
									tabIndex={0}
									onClick={() => setOpenAccordion({ ...openAccordion, [dept]: !openAccordion[dept] })}
								>
									<p className={styles.label}>{startCase(dept)}</p>
									<Pill color="red">Pending</Pill>
								</div>
							)}
							className={`
								${styles.accordion} 
								${openAccordion[dept] ? styles.open_accordion : ''}`}
						>
							{openAccordion[dept]
						&& 							(
							<div className={styles.roles}>
								{departmentRoleMapping[dept].map((role) => (
									<div
										className={`${styles.role} 
										${role === designation ? styles.selected_designation : ''}`}
										role="button"
										tabIndex={0}
										onClick={() => setFormsParams({ department: dept, designation: role })}
									>
										<p className={styles.label}>
											{startCase(role)}
										</p>
										<Pill color="red">Pending</Pill>
									</div>
								))}
							</div>
						)}

						</Accordion>

					))}
				</div>

				<div className={styles.form_section} style={{ flex: '0.7' }}>
					{openCreateForm
						? (
							<CreateFeedbackForm
								formId={formId}
								setFormId={setFormId}
								setOpenCreateForm={setOpenCreateForm}
								department={department}
								designation={designation}
								formStage={formStage}
								setFormStage={setFormStage}
							/>
						)
						: (
							<Forms
								formsParams={formsParams}
								openCreateForm={openCreateForm}
								setOpenCreateForm={setOpenCreateForm}
								formStage={formStage}
								setFormStage={setFormStage}
								setFormId={setFormId}
							/>
						)}
				</div>
			</div>
		</div>

	);
}

export default FeedbackForms;
