import React from 'react';

import styles from './styles.module.css';

const DATA_MAPPING = {
	whatsapp: {
		label    : 'Assisted Bookings via Whatsapp',
		valueKey : 'whatsapp_bookings',
	},
	email: {
		label    : 'Assisted Bookings via Email',
		valueKey : 'email_bookings',
	},
	platform: {
		label    : 'Bookings via Platform',
		valueKey : 'platform_bookings',
	},
	bot: {
		label    : 'Bookings via BOT (Whatsapp)',
		valueKey : 'whatsapp_bot_bookings',
	},
};

const DATA = {
	whatsapp_bot_bookings : 0,
	platform_bookings     : 1,
	email_bookings        : 2,
	whatsapp_bookings     : 3,
};

function TooltipContent() {
	return (
		<div className={styles.tooltip_container}>
			{Object.entries(DATA_MAPPING).map(
				([name, dataKeys]) => (
					<div
						key={name}
						className={styles.row_container}
					>
						<div className={styles.tooltip_label}>
							{dataKeys.label}
						</div>

						<div className={styles.tooltip_value}>
							{DATA?.[dataKeys.valueKey]}
						</div>
					</div>
				),
			)}
		</div>
	);
}

export default TooltipContent;
