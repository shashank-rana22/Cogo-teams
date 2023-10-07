import { Button, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { Image } from '@cogoport/next';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import PersonalDetailsModal from './PersonalDetailsModal';
import styles from './styles.module.css';

const POC_DETAILS = {
	insuredFirstName : 'Irshad',
	insuredLastName  : 'weernvkl',
	phoneNo          : '9029585025',
	email            : 'irshad1421@gmail.com',
};

const MAPPING = {
	insuredFirstName : 'First Name',
	insuredLastName  : 'Last Name',
	edit             : 'edit',
	phoneNo          : 'Contact No',
	email            : 'Email ID',
};

const POLICY_LINE_ITEM = [
	{
		id                : '87cde93d-419c-4d11-a828-05feaff9ff3d',
		policyId          : '4f0161de-bee9-4673-81b4-4e5834d497c7',
		serviceName       : 'premium',
		gstApplicable     : true,
		totalCharges      : 1110.07,
		gstCharges        : 199.81,
		netCharges        : 1309.88,
		saasProductCodeId : '910b0a65-ea46-4a04-a0ef-a678dacd19b6',
		createdAt         : '2023-10-03T07:53:54.879+00:00',
		updatedAt         : '2023-10-03T07:53:54.717+00:00',
	},
	{
		id                : 'a15d4d7a-e3ce-4c8b-9055-027a27cfaf02',
		policyId          : '4f0161de-bee9-4673-81b4-4e5834d497c7',
		serviceName       : 'platform_charges',
		gstApplicable     : true,
		totalCharges      : 100,
		gstCharges        : 18.00,
		netCharges        : 118.00,
		saasProductCodeId : 'a713e932-4222-4c3b-a61f-29fc20010e39',
		createdAt         : '2023-10-03T07:53:54.896+00:00',
		updatedAt         : '2023-10-03T07:53:54.717+00:00',
	},
	{
		id                : '1d58daf3-f424-46b5-903c-e48718461b1a',
		policyId          : '4f0161de-bee9-4673-81b4-4e5834d497c7',
		serviceName       : 'convenience_charges',
		gstApplicable     : true,
		totalCharges      : 44.40,
		gstCharges        : 7.99,
		netCharges        : 52.39,
		saasProductCodeId : 'ae8724e9-0c34-4050-9c8e-4c772bb787f5',
		createdAt         : '2023-10-03T07:53:54.993+00:00',
		updatedAt         : '2023-10-03T07:53:54.717+00:00',
	},
];

const INSURANCE_PROVIDER = {
	BAJAJ: GLOBAL_CONSTANTS.image_url.bajaj_insurance,
};

const getFormatedAmount = ({ currency = 'INR', value }) => formatAmount({
	amount  : value,
	currency,
	options : {
		style           : 'currency',
		currencyDisplay : 'code',
	},
});

function SideBar() {
	const [detailModal, setDetailModal] = useState({
		openModal : false,
		info      : POC_DETAILS,
	});

	return (
		<div style={{ width: '30%' }}>

			<div className={cl`${styles.section} ${styles.personal_detail}`}>
				<h3>Personal Details</h3>

				<div className={cl`${styles.container} ${styles.flex_box}`}>
					{Object.keys(MAPPING).map((detail) => {
						if (detail === 'edit') {
							return (
								<Button
									size="sm"
									key={detail}
									className={styles.edit_btn}
									themeType="secondary"
									onClick={() => setDetailModal({
										openModal : true,
										info      : POC_DETAILS,
									})}
								>
									Edit
								</Button>
							);
						}

						return (
							<div key={detail} className={styles.col}>
								<p className={styles.label}>{MAPPING[detail]}</p>
								<p className={styles.value}>{POC_DETAILS[detail]}</p>
							</div>
						);
					})}
				</div>

			</div>

			<div className={styles.section}>
				<h3>Rate Card</h3>
				<div className={styles.container}>
					<div className={cl`${styles.header} ${styles.flex_box}`}>
						<Image
							src={GLOBAL_CONSTANTS.image_url.insurance_pkg}
							className={styles.pkg_img}
							width={60}
							height={60}
							alt="package"
						/>
						<div className={styles.title_container}>
							<Image
								src={INSURANCE_PROVIDER.BAJAJ}
								width={140}
								height={14}
								alt="BAJAJ"
							/>
							<h3 className={styles.total_price}>
								{getFormatedAmount({ value: 250000 })}
							</h3>
						</div>
					</div>
					{POLICY_LINE_ITEM.map((item) => (
						<div key={item?.id} className={styles.line_item_flex}>
							<span>{startCase(item?.serviceName)}</span>
							<span>{getFormatedAmount({ value: item?.netCharges })}</span>
						</div>
					))}
				</div>
			</div>
			<PersonalDetailsModal detailModal={detailModal} setDetailModal={setDetailModal} />
		</div>
	);
}

export default SideBar;
