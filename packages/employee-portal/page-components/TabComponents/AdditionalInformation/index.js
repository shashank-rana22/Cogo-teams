import { Accordion } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';

import IdentificationDocuments from '../NewHireInformation/IdentificationDocuments';

import BankDetails from './BankDetails';
import EmploymentHistory from './EmploymentHistory';
import Resume from './Resume';
import styles from './styles.module.css';

const content_mapping = [
	{ title: 'EMPLOYMENT HISTORY', content: EmploymentHistory },
	{ title: 'IDENTIFICATION DOCUMENTS', content: IdentificationDocuments },
	{ title: 'RESUME', content: Resume },
	{ title: 'BANK DETAILS', content: BankDetails },
];

function AdditionalInformation({ setInformationPage, data }) {
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
