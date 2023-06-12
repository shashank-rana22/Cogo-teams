import { Accordion, Pill } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import BankDetails from './BankDetails';
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
		},
		{
			name        : 'educational_qualifications',
			content     : EducationalQualifications,
			isCompleted : educational_qualification,
		},
		{
			name        : 'resume',
			content     : Resume,
			isCompleted : resume,
		},
		{
			name        : 'bank_details',
			content     : BankDetails,
			isCompleted : bank_details,
		}];

	return (
		<div className={styles.container}>
			{(COMPONENT_MAPPING || []).map((item) => {
				const { content: Component, isCompleted, name } = item;

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
