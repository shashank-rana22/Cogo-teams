import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMDown, IcMArrowDown } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
import { useState } from 'react';

import ShowMoreStats from './ShowMoreStats';
import styles from './styles.module.css';

function PunchInOut() {
	const [showDetails, setShowDetails] = useState(false);

	return (
		<div className={styles.container}>
			<div className={cl`${styles.hide_div} ${showDetails ? styles.show_div : ''}`}>
				{showDetails && <ShowMoreStats setShowDetails={setShowDetails} showDetails={showDetails} />}
			</div>
			<div
				role="presentation"
				className={styles.minimize_container}
				onClick={() => setShowDetails((prev) => !prev)}
			>
				<Image src={GLOBAL_CONSTANTS.image_url.sad_icon} alt="sad-emoji" width={18} height={18} />
				<div className={styles.break_time}>4.5</div>
				<IcMDown className={styles.down_icon} />
				<Image src={GLOBAL_CONSTANTS.image_url.clock_icon} alt="clock" width={18} height={18} />
				<div className={styles.shift_time}>07:45:15</div>
				<IcMArrowDown className={cl`${showDetails ? styles.up_arrow : styles.arrow_down}`} />
			</div>
		</div>
	);
}

export default PunchInOut;
