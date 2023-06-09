import { Accordion, Pill } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import BankDetails from './BankDetails';
import EducationalQualifications from './EducationalQualifications';
import EmploymentHistory from './EmploymentHistory';
import Resume from './Resume';
import styles from './styles.module.css';

function AdditionalDetails({ profileData, getEmployeeDetailsLoading, getEmployeeDetails }) {
	const { progress_stats = {}, bank_details:bankDetails } = profileData || {};
	const { additional_info_added = {} } = progress_stats;
	
	const {
		bank_details = false,
		educational_qualification = false,
		employment_history = false,
		resume = false,
	} = additional_info_added;

	const data = [
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

	const renderPills = ({ isCompleted, name }) => {
		if (isCompleted) {
			return <Pill color="green">Completed</Pill>;
		}

		if (bankDetails?.[0]?.status === 'active' && name === 'bank_details') {
			return <Pill color="orange">Approval pending</Pill>;
		}

		return <Pill color="yellow">Pending</Pill>;
	};

	return (
		<div className={styles.container}>
			{data.map((item) => {
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
									{renderPills({ isCompleted, name })}

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
