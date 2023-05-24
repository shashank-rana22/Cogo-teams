import { Accordion } from '@cogoport/components';

import BankDetails from './BankDetails';
import EducationalQualifications from './EducationalQualifications';
import EmploymentHistory from './EmploymentHistory';
import Resume from './Resume';
import styles from './styles.module.css';

function AdditionalDetails({ profileData }) {
	const data = [
		{ title: 'EMPLOYMENT HISTORY', content: EmploymentHistory },
		{ title: 'EDUCATIONAL QUALIFICATION', content: EducationalQualifications },
		{ title: 'RESUME', content: Resume },
		{ title: 'BANK DETAILS', content: BankDetails }];

	return (
		<div className={styles.container}>
			{data.map((item) => {
				const { content: Component } = item;

				return (
					<div
						key={item.title}
						role="presentation"
						className={styles.accordion}
					>
						<Accordion
							type="text"
							title={item.title}
						>
							<Component profileData={profileData} />

							{' '}

						</Accordion>
					</div>
				);
			})}
		</div>
	);
}

export default AdditionalDetails;
