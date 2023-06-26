import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcCFtick, IcMInformation } from '@cogoport/icons-react';

import { getDetentionDemurrageDays } from './getDetentionDemurrageDays';
import styles from './styles.module.css';

const PROGRESS = 53;

const BL_STATUS_MAPPING = {
	import : 'B/L release in 24hrs of ETA.',
	export : 'B/L release in 24hrs of ETD.',
};

function ConfirmationTexts({
	primaryService,
	trade_type,
	detailedServices = [],
	services = [],
	detail = {},
}) {
	const { source } = detail;

	const {
		originDetention,
		originDemurrage,
		destinationDemurrage,
		destinationDetention,
	} = getDetentionDemurrageDays({
		services,
		detailedServices,
		source,
		trade_type,
		primaryService,
	});

	return (
		<div className={styles.container}>
			<div className={styles.text_div}>
				<IcCFtick className={styles.tick_icon} />

				<div className={styles.text}>
					<div className={styles.bold_text}>Free Days at Origin:</div>
					<div className={`${styles.text} ${styles.detention_demurrage}`}>
						{originDetention}
						{' '}
						detention day(s),
						{' '}
						{originDemurrage}
						{' '}
						demurrage day(s)
						{' '}
					</div>
					<div className={styles.inner_text}>For extra day(s) charges refer T&C </div>
				</div>
			</div>

			<div className={styles.text_div}>
				<IcCFtick className={styles.tick_icon} />
				<div className={styles.text}>
					<div className={styles.bold_text}>Free Days at Destination:</div>
					<div className={`${styles.text} ${styles.detention_demurrage}`}>
						{destinationDetention}
						{' '}
						detention day(s),
						{' '}
						{destinationDemurrage}
						{' '}
						demurrage day(s)
						{' '}
					</div>
					<div className={styles.inner_text}>For extra day(s) charges refer T&C </div>
				</div>
			</div>

			<div className={styles.text_div}>
				<IcCFtick className={styles.tick_icon} />

				<div className={styles.text}>
					<div className={styles.bold_text}>B/L Release:</div>
					{BL_STATUS_MAPPING[trade_type]}
					<div className={styles.inner_text}>Subject to Payment Received</div>
				</div>
			</div>

			<div className={styles.text_div}>
				<IcCFtick className={styles.tick_icon} />
				<div className={styles.text}>
					<div className={styles.bold_text}>Booking Comfirmation</div>

					<div style={{ fontSize: '12px' }}>Confirmation in 24 Hrs</div>
					<div className={styles.inner_text}>
						<div className={styles.progress_div}>
							<Tooltip
								theme="light"
								content={<div>Probability of Confirmation</div>}
							>
								<div className={styles.progress_percent}>
									{primaryService?.reliability_score || PROGRESS}
									%
									<IcMInformation className={styles.info_icon} />
								</div>
							</Tooltip>

							<div
								className={styles.progress_bar}
								style={{ width: `${primaryService?.reliability_score || PROGRESS}%` }}
							>
								<span />
							</div>
						</div>
					</div>
				</div>
			</div>

			{source === 'spot_line_booking' ? (
				<div className={styles.text_div}>
					<IcCFtick className={styles.tick_icon} />
					<div className={styles.text}>
						Higher cancellation may apply for spot line booking

						<div className={styles.inner_text}>For more details please read T&Cs</div>
					</div>
				</div>
			) : null}

			{primaryService?.terminal_cutoff ? (
				<div className={styles.text_div}>
					<IcCFtick className={styles.tick_icon} />
					<div className={styles.text}>
						Terminal Deadline
						<div className={styles.inner_text}>
							{formatDate({
								date       : primaryService.terminal_cutoff,
								dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
								formatType : 'date',
							})}
						</div>
					</div>
				</div>
			) : null}
		</div>
	);
}

export default ConfirmationTexts;
