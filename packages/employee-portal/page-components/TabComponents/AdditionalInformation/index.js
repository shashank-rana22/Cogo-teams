import { Accordion, Pill } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';

import BankDetails from './BankDetails';
import EducationalQualification from './EducationalQualification';
import EmploymentHistory from './EmploymentHistory';
import Resume from './Resume';
import styles from './styles.module.css';

function AdditionalInformation({ setInformationPage, data, getEmployeeDetails }) {
	const { progress_stats = {} } = data || {};
	const {
		additional_info_added = {},
	} = progress_stats;
	const {
		bank_details = false,
		educational_qualification = false,
		employment_history = false,
		resume = false,
	} = additional_info_added;
	const content_mapping = [
		{
			title     : 'EMPLOYMENT HISTORY',
			content   : EmploymentHistory,
			isPending : employment_history,
		},
		{
			title     : 'EDUCATIONAL QUALIFICATION',
			content   : EducationalQualification,
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
			key       : 'bank_details',
			isPending : bank_details,
		},
	];

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<IcMArrowBack
					role="presentation"
					className={styles.back_icon}
					width={20}
					height={20}
					onClick={() => setInformationPage('')}
				/>
				<div className={styles.title}>Additional Information</div>
			</div>
			<div className={styles.subcontainer}>

				{content_mapping.map((item) => {
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
								animate
							>
								<Component data={data} getEmployeeDetails={getEmployeeDetails} />
							</Accordion>
						</div>
					);
				})}

			</div>
		</div>
	);
}

export default AdditionalInformation;
