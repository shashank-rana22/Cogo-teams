import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';

import styles from './styles.module.css';

function SecureNow() {
	return (
		<div>
			<span className={cl`${styles.text} secure_now_text`}>Powered By</span>
			<Image
				className="secure_now_img"
				src={GLOBAL_CONSTANTS.image_url.secure_now}
				width={66}
				height={11}
				alt="secure Now"
			/>
		</div>
	);
}

export default SecureNow;
