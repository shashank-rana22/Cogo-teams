import { Placeholder, Radio, cl } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

function AddressCard({
	info = {},
	selectedAddress,
	setSelectedAddress,
	loading = false,
}) {
	const geo = getGeoConstants();
	const { t } = useTranslation(['cargoInsurance']);

	const { id = '', name = '', address = '', tax_number = '' } = info || {};

	const isAddressSelected = id === selectedAddress?.id;

	if (loading) {
		return (
			<div className={styles.container}>
				<div className={styles.icon_container}>
					<Placeholder type="circle" radius="30px" />
				</div>
				<div className={styles.info_container}>
					<Placeholder height="10px" width="30%" margin="0px 0px 10px 0px" />
					<Placeholder height="15px" margin="0px 0px 10px 0px" />
					<Placeholder height="15px" margin="0px 0px 10px 0px" />
					<Placeholder height="15px" width="50%" margin="0px 0px 10px 0px" />
				</div>
			</div>
		);
	}

	return (
		<div
			className={cl`${styles.container} ${
				isAddressSelected ? styles.selected_card : null
			}`}
			onClick={() => setSelectedAddress(info)}
			role="presentation"
		>
			<div className={cl`${styles.icon_container}`}>
				<div className={styles.icon}>
					<Image
						src={GLOBAL_CONSTANTS.image_url.globe_sub}
						width={24}
						height={24}
						className={styles.globe_icon}
						alt="globe"
					/>
				</div>
			</div>

			<div className={styles.info_container}>
				<p className={styles.address_title}>{name}</p>
				<p className={styles.info}>{address}</p>
				{tax_number ? (
					<p className={styles.info}>
						{`${
							geo.others.registration_number.label
						} ${t('cargoInsurance:number')} : ${tax_number}`}

					</p>
				) : null}
			</div>

			<div className={styles.checkbox_container}>
				<Radio checked={isAddressSelected} />
			</div>
		</div>
	);
}

export default AddressCard;
