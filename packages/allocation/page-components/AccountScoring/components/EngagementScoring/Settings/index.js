import BiasSetting from './BiasSetting';
import DistributionSetting from './DistributionSetting';
import PercentileSetting from './PercentileSetting';
import styles from './styles.module.css';

function Settings() {
	return (
		<div className={styles.container}>
			<PercentileSetting />

			<BiasSetting />

			<DistributionSetting />
		</div>

	);
}

export default Settings;
