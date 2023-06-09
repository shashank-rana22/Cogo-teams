import { Accordion, Pill } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';

import BankDetails from './BankDetails';
import EducationalQualification from './EducationalQualification';
import EmploymentHistory from './EmploymentHistory';
import Resume from './Resume';
import styles from './styles.module.css';

const INDEX = 0;

function AdditionalInformation({ setInformationPage, data, getEmployeeDetails }) {
	const { progress_stats = {}, bank_details:bankDetails } = data || {};
	const { additional_info_added = {} } = progress_stats;

	const {
		bank_details = false,
		educational_qualification = false,
		employment_history = false,
		resume = false,
	} = additional_info_added;

	const CONTENT_MAPPING = [
		{
			title       : 'EMPLOYMENT HISTORY',
			content     : EmploymentHistory,
			isCompleted : employment_history,
		},
		{
			title       : 'EDUCATIONAL QUALIFICATION',
			content     : EducationalQualification,
			isCompleted : educational_qualification,
		},
		{
			title       : 'RESUME',
			content     : Resume,
			isCompleted : resume,
		},
		{
			title       : 'BANK DETAILS',
			content     : BankDetails,
			key         : 'bank_details',
			isCompleted : bank_details,
		},
	];

	const renderPills = ({ isCompleted, key }) => {
		if (isCompleted) {
			return <Pill color="green">Completed</Pill>;
		}

		if (bankDetails?.[INDEX]?.status === 'active' && key === 'bank_details') {
			return <Pill color="orange">Waiting for approval</Pill>;
		}

		return <Pill color="yellow">Pending</Pill>;
	};

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
				{CONTENT_MAPPING.map((item) => {
					const { content: Component, isCompleted, key } = item;

					return (
						<div
							key={key}
							role="presentation"
							className={styles.accordion}
						>
							<Accordion
								type="text"
								title={(
									<div className={styles.status}>
										<div className={styles.accordion_title}>{item.title}</div>
										{renderPills({ isCompleted, key })}
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
