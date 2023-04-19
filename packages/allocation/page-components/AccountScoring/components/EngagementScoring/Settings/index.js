import { IcMArrowBack } from '@cogoport/icons-react';

import BiasSetting from './BiasSetting';
import DistributionSetting from './DistributionSetting';
import PercentileSetting from './PercentileSetting';
import styles from './styles.module.css';

function Settings(props) {
	const { setToggleComponent = () => {} } = props;
	return (
		<div className={styles.container}>
			<div className={styles.back_container}>
				<IcMArrowBack width={20} height={20} fill="#4f4f4f" />
				<div
					role="presentation"
					className={styles.back_text}
					onClick={() => setToggleComponent('warmth_scoring')}
				>
					Account Scoring

				</div>
			</div>
			<PercentileSetting />

			<BiasSetting />

			<DistributionSetting />
		</div>

	);
}

export default Settings;
