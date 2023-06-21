import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowNext } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
import { isEmpty, startCase } from '@cogoport/utils';

import AdditionalInformation from './AdditionalInformation';
import CompanyPolicies from './CompanyPolicies';
import Day1 from './Day1';
// import Maps from './Maps';
import NewHireInformation from './NewHireInformation';
import OfferLetter from './OfferLetter';
import SignYourDocuments from './SignYourDocuments';
import styles from './styles.module.css';

const KEY_COMPONENT_MAPPING = {
	new_hire_information: {
		icon      : GLOBAL_CONSTANTS.image_url.document_icon_png,
		component : NewHireInformation,
	},
	offer_letter: {
		icon      : GLOBAL_CONSTANTS.image_url.books_png,
		component : OfferLetter,
	},
	additional_information: {
		icon      : GLOBAL_CONSTANTS.image_url.document_icon_png,
		component : AdditionalInformation,
	},
	sign_your_docs: {
		icon      : GLOBAL_CONSTANTS.image_url.books_png,
		component : SignYourDocuments,
	},
	company_policies: {
		icon      : GLOBAL_CONSTANTS.image_url.document_icon_png,
		component : CompanyPolicies,
	},
	day_1: {
		icon      : GLOBAL_CONSTANTS.image_url.day_one_png,
		component : Day1,
	},
};

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
		new_hire_information   : true,
		offer_letter           : !isEmpty(offer_letter),
		additional_information : offer_letter_signed?.get_offer_letter_signed,
		sign_your_docs         : signDocEnableContd,
		company_policies       : signDocEnableContd && documents_signed?.documents_signed,
		day_1                  : signDocEnableContd && company_policies_read?.company_policies_read,
		// maps: {
		// icon: GLOBAL_CONSTANTS.image_url.map_png,
		// 	component : Maps,
		// 	enable    : signDocEnableContd && company_policies_read?.company_policies_read,
		// },
	};

	const onClickTiles = ({ item }) => {
		if (MAPPING[item]) {
			setInformationPage(item);
		}
	};

	if (informationPage) {
		const PageComponent = KEY_COMPONENT_MAPPING[informationPage]?.component;

		return (
			<PageComponent
				setInformationPage={setInformationPage}
				data={data}
				getEmployeeDetails={getEmployeeDetails}
				getEmployeeDetailsLoading={getEmployeeDetailsLoading}
			/>
		);
	}

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
							opacity : MAPPING[item] ? '1' : '0.5',
							cursor  : MAPPING[item] ? 'pointer' : 'not-allowed',
						}}
					>
						<div>
							<Image
								src={KEY_COMPONENT_MAPPING[item]?.icon}
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
