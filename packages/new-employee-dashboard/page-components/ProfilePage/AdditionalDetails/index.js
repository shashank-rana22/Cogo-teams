import { Accordion, Pill, Button, Modal } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import BankDetails from './BankDetails';
import EditBankDetails from './EditBankDetails';
import EditEducationalQualifications from './EditEducationalQualifications';
import EditEmployementHistory from './EditEmploymentHistory';
import EditResume from './EditResume';
import EducationalQualifications from './EducationalQualifications';
import EmploymentHistory from './EmploymentHistory';
import Resume from './Resume';
import styles from './styles.module.css';

const BANK_DETAILS_INDEX = 0;

function RenderPills({ isCompleted = false, name = '', bankDetails }) {
	if (isCompleted) {
		return <Pill color="green">Completed</Pill>;
	}

	if (bankDetails?.[BANK_DETAILS_INDEX]?.status === 'active' && name === 'bank_details') {
		return <Pill color="orange">Approval pending</Pill>;
	}

	return <Pill color="yellow">Pending</Pill>;
}

function AdditionalDetails({ profileData, getEmployeeDetailsLoading, getEmployeeDetails }) {
	const { progress_stats = {}, bank_details:bankDetails } = profileData || {};
	const { additional_info_added = {} } = progress_stats;
	const [show, setShow] = useState(false);

	const {
		bank_details = false,
		educational_qualification = false,
		employment_history = false,
		resume = false,
	} = additional_info_added;

	const COMPONENT_MAPPING = [
		{
			name        : 'employment_history',
			content     : EmploymentHistory,
			isCompleted : employment_history,
			component   : EditEmployementHistory,
		},
		{
			name        : 'educational_qualifications',
			content     : EducationalQualifications,
			isCompleted : educational_qualification,
			component   : EditEducationalQualifications,
		},
		{
			name        : 'resume',
			content     : Resume,
			isCompleted : resume,
			component   : EditResume,
		},
		{
			name        : 'bank_details',
			content     : BankDetails,
			isCompleted : bank_details,
			component   : EditBankDetails,
		}];

	return (
		<div className={styles.container}>
			{(COMPONENT_MAPPING || []).map((item) => {
				const { content: Component, isCompleted, name, component: ModalComponent } = item;

				return (
					<div
						key={name}
						role="presentation"
						className={styles.accordion}
					>
						<Accordion
							type="text"
							title={(
								<div className={styles.status}>
									<div className={styles.accordion_title}>{startCase(name)}</div>
									<RenderPills name={name} isCompleted={isCompleted} bankDetails={bankDetails} />
									<Button
										className={styles.styled_button}
										themeType="secondary"
										onClick={() => setShow(name)}
									>
										<IcMEdit style={{ marginRight: '8px' }} />
										Edit
									</Button>
									{show === name ? (
										<Modal
											size="xl"
											show={show}
											onClose={() => setShow(false)}
											placement="top"
											closeOnOuterClick
										>
											<Modal.Header title={name} />
											<div className={styles.styled_body}>
												<Modal.Body>
													<ModalComponent
														data={profileData}
														getEmployeeDetails={getEmployeeDetails}
													/>
												</Modal.Body>
											</div>
										</Modal>
									) : null}
								</div>
							)}
						>
							<Component
								profileData={profileData}
								getEmployeeDetailsLoading={getEmployeeDetailsLoading}
								getEmployeeDetails={getEmployeeDetails}
							/>
							{' '}
						</Accordion>
					</div>
				);
			})}
		</div>
	);
}

export default AdditionalDetails;
