import { cl } from '@cogoport/components';
import { IcMRoundtrip, IcMUp } from '@cogoport/icons-react';

import LikeDislike from '../../../../../../../common/LikeDislike';

import styles from './styles.module.css';

const IMAGE_MAPPING = {
	one_way : IcMUp,
	round   : IcMRoundtrip,
};

const LABEL_MAPPING = {
	one_way : 'One Way',
	round   : 'Round Trip',
};

const RATE_SOURCE_MAPPING = {
	spot_rates            : 'System Rate',
	spot_negotiation_rate : 'Enquiry Reverted Rate',
	predicted             : 'System Rate',
	promotional           : 'Promotional',
	spot_booking          : 'Spot booking',
};

function Header({
	rate = {},
	detail = {},
}) {
	const { source = '' } = rate;

	const { trip_type = '' } = detail;

	const ImageComponent = IMAGE_MAPPING[trip_type] || null;

	return (
		<div className={styles.container}>
			<span className={cl`${styles.source_tag} ${styles[source]}`}>
				{RATE_SOURCE_MAPPING[source] || 'System Rates'}
			</span>

			<div className={styles.left_section}>
				{ImageComponent ? (
					<ImageComponent className={cl`${styles.trip_type_icon} ${styles[trip_type]}`} />
				) : null}

				<span className={styles.trip_type_label}>
					{LABEL_MAPPING[trip_type]}
				</span>
			</div>

			<div className={styles.right_section}>
				<LikeDislike rateCardData={rate} detail={detail} />
			</div>
		</div>
	);
}

export default Header;
