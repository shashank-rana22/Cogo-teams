import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';

import useGetEngagementScoringAccountStats from '../../../../hooks/useGetEngagementScoringAccountStats';
import useUpdateBiasSettings from '../../../../hooks/useUpdateBiasSettings';
import useUpdateDistributionSettings from '../../../../hooks/useUpdateDistributionSettings';
import useUpdatePercentileSettings from '../../../../hooks/useUpdatePercentileSettings';

import DistributionSettingsItem from './DistributionSettingsItem';
import Header from './Header';
import SettingsItem from './SettingsItem';
import styles from './styles.module.css';

const FIRST_INDEX = 1;

function EditSetting(props) {
	const {
		useGetControls, inputStyle = 'input',
		setEditing = () => {}, heading = '', tooltipData = '',
		refetch = () => {},
		preFilledList = [],
		control,
		handleSubmit,
		errors,
		watch,
		setValue = () => {},
		reset = () => {},
	} = props;

	const {
		updatePercentile = () => {},
	} = useUpdatePercentileSettings();

	const {
		updateBias = () => {},
	} = useUpdateBiasSettings();

	const {
		updateDistribution = () => {},
	} = useUpdateDistributionSettings();

	const onClose = () => {
		reset();
		setEditing((pv) => !pv);
	};

	const onSave = async (formValues, e) => {
		e.preventDefault();

		if (inputStyle === 'percentile_input') {
			updatePercentile(formValues, onClose, refetch, preFilledList);
		} else if (inputStyle === 'bias_input') {
			updateBias(formValues, onClose, refetch, preFilledList);
		} else if (inputStyle === 'distribution_input') {
			updateDistribution(formValues, onClose, refetch, preFilledList);
		}
	};

	const {
		statsLoading, statsList = [],
		onUpdateStats = () => {},
	} = useGetEngagementScoringAccountStats();

	const handleClick = () => {
		const watchFields = watch();

		const VALUES_FOR_PREFILLING = [];

		(preFilledList || []).forEach((element) => {
			const { id = '' } = element;

			const SCORES = {};

			Object.keys(watchFields).forEach((ele) => {
				const idx = ele.indexOf('_');

				if (ele.substring(GLOBAL_CONSTANTS.zeroth_index, idx) === id) {
					const attribute = ele.substring(idx + FIRST_INDEX);

					SCORES[attribute] = watchFields[ele];
					SCORES.warmth = element.warmth;
				}
			});

			if (!isEmpty(SCORES)) {
				VALUES_FOR_PREFILLING.push(SCORES);
			}
		});

		const LIMIT = [];

		VALUES_FOR_PREFILLING.forEach((element) => {
			const OBJ = {};
			OBJ.warmth = element.warmth || undefined;
			OBJ.lower_limit = element.range_from || undefined;
			OBJ.upper_limit = element.range_to || undefined;

			LIMIT.push(OBJ);
		});

		onUpdateStats(LIMIT);
	};

	return (
		<form onSubmit={handleSubmit(onSave)}>
			<div className={styles.container}>
				<Header
					heading={heading}
					tooltipData={tooltipData}
					onClose={onClose}
				/>

				{preFilledList.map((item, index) => (
					<div key={item.id} className={styles.item}>
						{
							inputStyle === 'distribution_input'
								? (
									<DistributionSettingsItem
										item={item}
										useGetControls={useGetControls}
										index={index}
										inputStyle={inputStyle}
										control={control}
										errors={errors}
										handleClick={handleClick}
										statsList={statsList}
										statsLoading={statsLoading}
									/>
								)
								: (
									<SettingsItem
										item={item}
										useGetControls={useGetControls}
										index={index}
										inputStyle={inputStyle}
										control={control}
										errors={errors}
										setValue={setValue}
									/>
								)
						}
					</div>
				))}
			</div>
		</form>
	);
}

export default EditSetting;
