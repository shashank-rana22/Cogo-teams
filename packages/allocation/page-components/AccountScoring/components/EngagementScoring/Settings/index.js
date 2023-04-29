import { useForm } from '@cogoport/forms';
import { IcMArrowBack } from '@cogoport/icons-react';

import useGetDistributionScoringSettings from '../../../hooks/useGetDistributionScoringSettings ';
import useGetEngagementScoringSettings from '../../../hooks/useGetEngagementScoringSettings';

import BiasSetting from './BiasSetting';
import DistributionSetting from './DistributionSetting';
import PercentileSetting from './PercentileSetting';
import styles from './styles.module.css';

function Settings({ setToggleComponent = () => {} }) {
	const formProps = useForm();
	const { control, handleSubmit, formState: { errors }, watch } = formProps;

	const {
		settingsLoading = false,
		percentileList = [],
		biasList = [],
		settingsRefetch = () => {},
	} = useGetEngagementScoringSettings();

	const {
		distributionLoading = false, distributionRefetch = () => {},
		distributionList = [],
	} = useGetDistributionScoringSettings();

	return (
		<div className={styles.container}>
			<div
				role="presentation"
				className={styles.back_container}
				onClick={() => setToggleComponent('warmth_scoring')}
			>
				<IcMArrowBack width={20} height={20} fill="#4f4f4f" />
				<div
					className={styles.back_text}
				>
					Account Scoring

				</div>
			</div>

			<PercentileSetting
				settingsLoading={settingsLoading}
				percentileList={percentileList}
				settingsRefetch={settingsRefetch}
				control={control}
				handleSubmit={handleSubmit}
				errors={errors}
			/>

			<BiasSetting
				settingsLoading={settingsLoading}
				biasList={biasList}
				settingsRefetch={settingsRefetch}
				control={control}
				handleSubmit={handleSubmit}
				errors={errors}
			/>

			<DistributionSetting
				settingsLoading={distributionLoading}
				settingsRefetch={distributionRefetch}
				distributionList={distributionList}
				control={control}
				handleSubmit={handleSubmit}
				errors={errors}
				watch={watch}
			/>
		</div>

	);
}

export default Settings;
