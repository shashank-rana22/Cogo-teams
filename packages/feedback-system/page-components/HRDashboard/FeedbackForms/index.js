import { Placeholder } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useState, useEffect } from 'react';

import fetchLocalCheckList from '../../../utils/fetchLocalCheckList';

import CreateFeedbackForm from './CreateFeedbackForm';
import Department from './Department';
import Forms from './Forms';
import styles from './styles.module.css';
import useListDepartments from './useListDepartments';

const getFormResubmission = (department = '', designation = '') => {
	let lastFormStatus;

	if (designation) {
		lastFormStatus = fetchLocalCheckList(department, designation);
		if (lastFormStatus?.stage) {
			return { department, designation, stage: lastFormStatus.stage };
		}
		return {};
	}

	const localForms = fetchLocalCheckList();

	const lastForm = Object.keys(localForms)?.[Object.keys(localForms).length - 1] || '';
	lastFormStatus = localForms[lastForm];
	if (lastFormStatus?.stage) {
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

	const [refetchedLists, setRefetchedLists] = useState(false);

	const [openCreateForm, setOpenCreateForm] = useState(false);
	const [formStage, setFormStage] = useState('add_questions');

	const [formsParams, setFormsParams] = useState({});

	const { department, designation } = formsParams;

	const routeToHRDashboard = () => {
		Router.push('/feedback-system/hr-dashboard');
	};

	const { data = [], loading = true, getListDepartments } = useListDepartments();

	const { list: departments = [] } = data;

	const dummyArray = ['ok', 'ok1', 'harry', 'potter', 'lorem', 'ipsum', 'lorem', 'lorem', 'ipsum'];

	useEffect(() => {
		const newDesignationFormStatus = getFormResubmission(department, designation);
		setFormId('');

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

	useEffect(() => { if (refetchedLists) { getListDepartments(); } setRefetchedLists(false); }, [refetchedLists]);
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
					{ loading ? (
						<div
							className={styles.left_list_div}
						>
							{dummyArray.map(() => (
								<Placeholder
									width="100%"
									height="72px"
									className={styles.loading_left}
								/>
							))}
						</div>
					)
						: ((departments || [])).map((dept) => (
							<Department
								department={dept}
								setFormsParams={setFormsParams}
								designation={designation}
								openAccordion={openAccordion}
								setOpenAccordion={setOpenAccordion}
							/>
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
								setRefetchedLists={setRefetchedLists}
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
