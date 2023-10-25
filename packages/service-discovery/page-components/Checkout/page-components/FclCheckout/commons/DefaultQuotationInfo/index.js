import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import styles from './styles.module.css';

const MAPPING = [
	{
		key     : 'number_of_bl',
		heading : 'No. of B/L',
		value   : '1 Free, $50 Per Addition',
		icon    : GLOBAL_CONSTANTS.image_url.no_of_bi_s2c_png,
	},
	{
		key     : 'bl_amendment',
		heading : 'B/L Amendment',
		value   : '1 Free, $50 Per Addition',
		icon    : GLOBAL_CONSTANTS.image_url.bi_amendment_s2c_png,
	},
	{
		key     : 'booking_note',
		heading : 'Booking Note',
		value   : '1 Free, $50 Per Addition',
		icon    : GLOBAL_CONSTANTS.image_url.booking_note_s2c_png,
	},
	{
		key     : 'si_amendment',
		heading : 'SI Amendment',
		value   : '1 Free, $50 Per Addition',
		icon    : GLOBAL_CONSTANTS.image_url.si_amendment_s2c_png,
	},
];

function DefaultQuotationInfo() {
	return (
		<div className={styles.container}>
			{MAPPING.map((item) => {
				const { key, heading, value, icon: icon_url } = item || {};

				return (
					<div key={key} className={styles.content}>
						<img
							src={icon_url}
							alt={key}
							width={40}
							height={40}
						/>

						<div className={styles.text_container}>
							<div className={styles.heading}>{heading}</div>
							<div className={styles.value}>{value}</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default DefaultQuotationInfo;
