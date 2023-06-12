import { IcMArrowNext } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import { Image }from '@cogoport/next';
import AdditionalInformation from './AdditionalInformation';
import CompanyPolicies from './CompanyPolicies';
import Day1 from './Day1';
// import Maps from './Maps';
import NewHireInformation from './NewHireInformation';
import OfferLetter from './OfferLetter';
import SignYourDocuments from './SignYourDocuments';
import styles from './styles.module.css';

function TabComponents({ data, informationPage, setInformationPage, getEmployeeDetails, getEmployeeDetailsLoading }) {
	const { offer_letter, progress_stats } = data || {};

	const {
		offer_letter_signed,
		documents_signed, additional_info_added,
		company_policies_read,
	}	= progress_stats || {};

	const signDocEnableContd = offer_letter_signed?.get_offer_letter_signed
	&& Object.keys(additional_info_added).every((key) => (additional_info_added[key]));

	const MAPPING = {
		new_hire_information: {
			icon      : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/image 180.png',
			component : NewHireInformation,
			enable    : true,
		},
		offer_letter: {
			icon      : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/image 182.png',
			component : OfferLetter,
			enable    : !isEmpty(offer_letter),
		},
		additional_information: {
			icon      : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/image 180.png',
			component : AdditionalInformation,
			enable    : offer_letter_signed?.get_offer_letter_signed,
		},
		sign_your_docs: {
			icon      : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/image 182.png',
			component : SignYourDocuments,
			enable    : signDocEnableContd,
		},
		company_policies: {
			icon      : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/image 180.png',
			component : CompanyPolicies,
			enable    : signDocEnableContd && documents_signed?.documents_signed,
		},
		day_1: {
			icon      : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/image 181.png',
			component : Day1,
			enable    : signDocEnableContd && company_policies_read?.company_policies_read,
		},
		// maps: {
		// 	icon      : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/image 183.png',
		// 	component : Maps,
		// 	enable    : signDocEnableContd && company_policies_read?.company_policies_read,
		// },
	};

	if (informationPage) {
		const PageComponent = MAPPING[informationPage]?.component;

		return (
			<PageComponent
				setInformationPage={setInformationPage}
				data={data}
				getEmployeeDetails={getEmployeeDetails}
				getEmployeeDetailsLoading={getEmployeeDetailsLoading}
			/>
		);
	}

	const onClickTiles = ({ item }) => {
		if (MAPPING[item]?.enable) {
			setInformationPage(item);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>Meanwhile, get started with</div>
			<div style={{ display: 'flex', flexWrap: 'wrap' }}>
				{(Object.keys(MAPPING)).map((item) => (
					<div
						key={item}
						role="presentation"
						className={styles.options}
						onClick={() => onClickTiles({ item })}
						style={{
							opacity : MAPPING[item]?.enable ? '1' : '0.5',
							cursor  : MAPPING[item]?.enable ? 'pointer' : 'not-allowed',
						}}
					>
						<div>

							<Image
								src={MAPPING[item]?.icon}
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
				))}
			</div>
		</div>
	);
}

export default TabComponents;
