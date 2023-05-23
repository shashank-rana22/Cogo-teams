import { useState } from 'react';

import AdditionalDocuments from './AdditionalDocuments';
import CogoAcademy from './CogoAcademy';
import CompanyPolicies from './CompanyPolicies';
import Day1 from './Day1';
import Maps from './Maps';
import NewHireInformation from './NewHireInformation';
import OfferLetter from './OfferLetter';
import SignYourDocuments from './SignYourDocuments';
import styles from './styles.module.css';

function TabComponents({ data }) {
	const [informationPage, setInformationPage] = useState('');

	const component_mapping = {
		new_hire_information : NewHireInformation,
		offer_letter         : OfferLetter,
		additional_docs      : AdditionalDocuments,
		sign_your_docs       : SignYourDocuments,
		company_policies     : CompanyPolicies,
		day_1                : Day1,
		cogo_academy         : CogoAcademy,
		maps                 : Maps,
	};

	if (informationPage) {
		const PageComponent = component_mapping[informationPage];
		return <PageComponent setInformationPage={setInformationPage} data={data} />;
	}

	return (
		<div className={styles.container}>
			<p>Meanwhile, get started with</p>
			<div className={styles.components}>
				<div
					role="presentation"
					className={styles.options}
					onClick={() => setInformationPage('new_hire_information')}
				>
					NEW HIRE INFORMATION
				</div>
				<div
					role="presentation"
					className={styles.options}
					onClick={() => setInformationPage('offer_letter')}
				>
					OFFER LETTER
				</div>
				<div
					role="presentation"
					className={styles.options}
					onClick={() => setInformationPage('additional_docs')}
				>
					ADDITIONAL DOCUMENTS
				</div>
				<div
					role="presentation"
					className={styles.options}
					onClick={() => setInformationPage('sign_your_docs')}
				>
					SIGN YOUR DOCUMENTS
				</div>
				<div
					role="presentation"
					className={styles.options}
					onClick={() => setInformationPage('company_policies')}
				>
					COMPANY POLICIES
				</div>
				<div
					role="presentation"
					className={styles.options}
					onClick={() => setInformationPage('day_1')}
				>
					DAY 1
				</div>
				<div
					role="presentation"
					className={styles.options}
					onClick={() => setInformationPage('cogo_academy')}
				>
					COGOACADEMY
				</div>
				<div
					role="presentation"
					className={styles.options}
					onClick={() => setInformationPage('maps')}
				>
					MAPS
				</div>
			</div>

		</div>
	);
}

export default TabComponents;
