import { Accordion, Pill } from '@cogoport/components';

import BankDetails from './BankDetails';
import EducationalQualifications from './EducationalQualifications';
import EmploymentHistory from './EmploymentHistory';
import Resume from './Resume';
import styles from './styles.module.css';

function AdditionalDetails({ profileData, getEmployeeDetailsLoading }) {
	const { progress_stats = {} } = profileData || {};
	const {
		additional_info_added = {},
	} = progress_stats;
	const {
		bank_details = false,
		educational_qualification = false,
		employment_history = false,
		resume = false,
	} = additional_info_added;

	const data = [
		{
			title     : 'EMPLOYMENT HISTORY',
			content   : EmploymentHistory,
			isPending : employment_history,
		},
		{
			title     : 'EDUCATIONAL QUALIFICATION',
			content   : EducationalQualifications,
			isPending : educational_qualification,
		},
		{
			title     : 'RESUME',
			content   : Resume,
			isPending : resume,
		},
		{
			title     : 'BANK DETAILS',
			content   : BankDetails,
			isPending : bank_details,
		}];

	return (
		<div className={styles.container}>
			{data.map((item) => {
				const { content: Component, isPending } = item;

				return (
					<div
						key={item.title}
						role="presentation"
						className={styles.accordion}
					>
						<Accordion
							type="text"
							title={(
								<div className={styles.status}>
									<div className={styles.accordion_title}>{item.title}</div>

									{isPending
										? <Pill color="green">Completed</Pill>
										: <Pill color="yellow">Pending</Pill>}

								</div>
							)}
						>
							<Component
								profileData={profileData}
								getEmployeeDetailsLoading={getEmployeeDetailsLoading}
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
