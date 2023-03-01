import { Placeholder } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useEffect } from 'react';

import useListDepartments from '../../../hooks/useListDepartments';

import CreateFeedbackForm from './CreateFeedbackForm';
import Department from './Department';
import Forms from './Forms';
import styles from './styles.module.css';
import useGetFormsPage from './useGetFormsPage';

const loadArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function FeedbackForms() {
	const router = useRouter();

	const {
		formsParams, setFormsParams, formId, setFormId, refetchedLists, setRefetchedLists, openCreateForm,
		setOpenCreateForm, formStage, setFormStage,
	} = useGetFormsPage();

	const { department, designation } = formsParams;

	const { data = [], loading = true, getListDepartments } = useListDepartments();

	const { list: departments = [] } = data;

	const routeToHRDashboard = () => {
		router.push('/performance-management/hr-dashboard');
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => { if (refetchedLists) { getListDepartments(); } setRefetchedLists(false); }, [refetchedLists]);

	return (
		<div className={styles.container}>
			<div className={styles.go_back_container}>
				<div className={styles.redirect_container}>
					<div
						style={{ cursor: 'pointer' }}
						role="button"
						tabIndex={0}
						onClick={() => {
							routeToHRDashboard();
						}}
					>
						<IcMArrowBack style={{ marginRight: '8px' }} width={16} height={16} />
					</div>

					<div className={styles.header}>
						Forms
					</div>
				</div>
			</div>

			<div className={styles.form_container}>
				<div className={styles.department_status} style={{ flex: '0.3' }}>
					{ loading ? (
						<div
							className={styles.left_list_div}
						>
							{loadArr.map((i) => (
								<Placeholder
									key={i}
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
								formsParams={formsParams}
								setFormsParams={setFormsParams}
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
