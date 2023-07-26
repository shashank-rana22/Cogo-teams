import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMDownload } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
import React from 'react';

import { ANDRIOD_APK } from '../../../constants';

import styles from './styles.module.css';

function AndroidApp() {
	return (
		<div className={styles.download_apk}>
			<div
				role="presentation"
				className={styles.download_div}
				onClick={() => window.open(ANDRIOD_APK, '_blank')}
			>
				<Image
					src={GLOBAL_CONSTANTS.image_url.cogo_logo_without_bg}
					alt="bot"
					height={16}
					width={15}
					className={styles.bot_icon_styles}
				/>
				<div className={styles.text_styles}>
					<div className={styles.flex_container}>
						<IcMDownload
							className={styles.download_icon}
						/>
						<div>Get the</div>
					</div>
					app now
				</div>
			</div>
		</div>
	);
}

export default AndroidApp;
