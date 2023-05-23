import { IcMArrowNext } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import AdditionalDocuments from './AdditionalDocuments';
import CogoAcademy from './CogoAcademy';
import CompanyPolicies from './CompanyPolicies';
import Day1 from './Day1';
import Maps from './Maps';
import NewHireInformation from './NewHireInformation';
import OfferLetter from './OfferLetter';
import SignYourDocuments from './SignYourDocuments';
import styles from './styles.module.css';

function TabComponents({ data, informationPage, setInformationPage }) {
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

	const MAPPING = {
		new_hire_information : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/image 180.png',
		company_policies     : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/image 180.png',
		offer_letter         : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/image 182.png',
		sign_your_docs       : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/image 183.png',
		day_1                : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/image 181.png',
		maps                 : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/image 183.png',

	};

	if (informationPage) {
		const PageComponent = component_mapping[informationPage];
		return <PageComponent setInformationPage={setInformationPage} data={data} />;
	}

	return (
		<div className={styles.container}>
			<div className={styles.header}>Meanwhile, get started with</div>
			<div style={{ display: 'flex', flexWrap: 'wrap' }}>
				{
				(Object.keys(MAPPING)).map((item) => (
					<div
						key={item}
						role="presentation"
						className={styles.options}
						onClick={() => setInformationPage(item)}
					>
						<div>
							<img
								src={MAPPING[item]}
								alt="address icon"
								width="60"
								height="60"
							/>
							<div className={styles.card_header}>{startCase(item)}</div>
						</div>

						<div className={styles.arrow_wrapper}>
							<IcMArrowNext width={20} height={20} />

						</div>

					</div>
				))
			}
			</div>

		</div>
	);
}

export default TabComponents;
