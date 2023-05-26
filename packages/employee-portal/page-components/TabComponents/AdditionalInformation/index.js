import { Accordion, Pill } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import BankDetails from './BankDetails';
import EducationalQualification from './EducationalQualification';
import EmploymentHistory from './EmploymentHistory';
import Resume from './Resume';
import styles from './styles.module.css';

function AdditionalInformation({ setInformationPage, data }) {
	const content_mapping = [
		{
			title     : 'EMPLOYMENT HISTORY',
			content   : EmploymentHistory,
			isPending : isEmpty(data?.detail?.employee_experience_details),
		},
		{
			title     : 'EDUCATIONAL QUALIFICATION',
			content   : EducationalQualification,
			isPending : isEmpty(data?.detail?.employee_education_details),
		},
		{
			title     : 'RESUME',
			content   : Resume,
			isPending : isEmpty(data?.documents),
		},
		{
			title     : 'BANK DETAILS',
			content   : BankDetails,
			key       : 'bank_details',
			isPending : isEmpty(data?.bank_details),
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

					const getStatus = () => {
						if (data[isPending]) {
							return false;
						}
						return true;
					};

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
										<Pill color="green">
											{getStatus()
												? 'Completed' : 'Pending'}
										</Pill>
									</div>
								)}
								animate
							>
								<Component data={data} />
							</Accordion>
						</div>
					);
				})}

			</div>
		</div>
	);
}

export default AdditionalInformation;
