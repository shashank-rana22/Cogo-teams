import { Accordion, Pill } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';

import BankDetails from './BankDetails';
import EducationalQualification from './EducationalQualification';
import EmploymentHistory from './EmploymentHistory';
import Resume from './Resume';
import styles from './styles.module.css';

const DEFAULT_INDEX = 0;

const KEY_CONTENT_MAPPING = {
	employment_history: {
		title   : 'EMPLOYMENT HISTORY',
		content : EmploymentHistory,
	},
	educational_qualification: {
		title   : 'EDUCATIONAL QUALIFICATION',
		content : EducationalQualification,
	},
	resume: {
		title   : 'RESUME',
		content : Resume,
	},
	bank_details: {
		title   : 'BANK DETAILS',
		content : BankDetails,
	},
};

function RenderPills({ isCompleted, key, bankDetails }) {
	if (isCompleted) {
		return <Pill color="green">Completed</Pill>;
	}

	if (bankDetails?.[DEFAULT_INDEX]?.status === 'active' && key === 'bank_details') {
		return <Pill color="orange">Waiting for approval</Pill>;
	}

	return <Pill color="yellow">Pending</Pill>;
}

function AdditionalInformation({ setInformationPage, data, getEmployeeDetails }) {
	const { progress_stats = {}, bank_details: bankDetails } = data || {};
	const { additional_info_added = {} } = progress_stats;

	const {
		bank_details = false,
		educational_qualification = false,
		employment_history = false,
		resume = false,
	} = additional_info_added;

	const CONTENT_MAPPING = [
		{
			key         : 'employment_history',
			isCompleted : employment_history,
		},
		{
			key         : 'educational_qualification',
			isCompleted : educational_qualification,
		},
		{
			key         : 'resume',
			isCompleted : resume,
		},
		{
			key         : 'bank_details',
			isCompleted : bank_details,
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
				{CONTENT_MAPPING.map((item) => {
					const { isCompleted, key } = item || {};
					const { content: Component, title } = KEY_CONTENT_MAPPING[key];

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
										<div className={styles.accordion_title}>{title}</div>
										<RenderPills isCompleted={isCompleted} key={key} bankDetails={bankDetails} />
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
