import { Tooltip, Modal, Button, Placeholder } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useIrisRequest } from '@cogoport/request';
import { getYear, getMonth } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import useListDepartments from '../../../hooks/useListDepartments';

import CreateFeedbackForm from './CreateFeedbackForm';
import DeadlineModal from './DeadlineModal';
import Department from './Department';
import Forms from './Forms';
import styles from './styles.module.css';
import useGetFormsPage from './useGetFormsPage';

const loadArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const activationStatusTextMapping = {
	Edit     : 'Edit Deadline',
	Add      : 'Add Deadline',
	disabled : 'Edit Deadline',
};

function FeedbackForms() {
	const router = useRouter();

	const [openActivateModal, setOpenActivateModal] = useState(false);

	const {
		formsParams, setFormsParams, formId, setFormId, refetchedLists, setRefetchedLists, openCreateForm,
		setOpenCreateForm, formStage, setFormStage,
	} = useGetFormsPage();

	const { department, designation } = formsParams;

	const { data = [], loading = true, getListDepartments } = useListDepartments();

	const { list: departments = [] } = data;

	const [{ loading: deadlineDataLoading = false, data: deadlineData = {} }, trigger] = useIrisRequest({
		url    : 'get_iris_get_form_deadline',
		method : 'get',
	}, { manual: false });

	const { form_deadline = null } = deadlineData;

	const localizedFormDeadline = new Date(form_deadline);
	const currentDeadlineMonth = getMonth(localizedFormDeadline);
	const currentDeadlineYear = getYear(localizedFormDeadline);

	const currentDate = new Date();

	const nextFeedbackCycle = currentDeadlineMonth === 11 ? new Date(currentDeadlineYear + 1, 0, 1)
		: new Date(currentDeadlineYear, currentDeadlineMonth + 1, 1);

	let activationStatus = '';

	if (localizedFormDeadline > currentDate) {
		activationStatus = 'Edit';
	} else if (localizedFormDeadline < currentDate && currentDate < nextFeedbackCycle) {
		activationStatus = 'disabled';
	} else {
		activationStatus = 'Add';
	}

	const buttonText = activationStatusTextMapping[activationStatus];

	const routeToHRDashboard = () => {
		router.push('/performance-management/hr-dashboard');
	};

	useEffect(() => {
		if (refetchedLists) {
			getListDepartments();
		}
		setRefetchedLists(false);
	}, [getListDepartments, refetchedLists, setRefetchedLists]);

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

				<Tooltip
					content={<div style={{ wordBreak: 'break-word' }}>Forms disabled for this Month.</div>}
					placement="left"
					disabled={activationStatus !== 'disabled'}
				>
					<Button
						size="lg"
						onClick={() => setOpenActivateModal(true)}
						disabled={activationStatus === 'disabled'}
						loading={deadlineDataLoading}
					>
						{buttonText}
					</Button>
				</Tooltip>

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
								key={dept}
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
								activationStatus={activationStatus}
								setFormStage={setFormStage}
								setFormId={setFormId}
							/>
						)}
				</div>

				{openActivateModal && (
					<Modal show={openActivateModal} onClose={() => setOpenActivateModal(false)}>
						<Modal.Header title={`${activationStatus} Form Deadline`} />
						<Modal.Body>
							<DeadlineModal
								onSubmitText={buttonText}
								setOpenActivateModal={setOpenActivateModal}
								refetchFormDeadline={trigger}
								formDeadline={form_deadline}
							/>
						</Modal.Body>
					</Modal>
				)}
			</div>
		</div>

	);
}

export default FeedbackForms;
