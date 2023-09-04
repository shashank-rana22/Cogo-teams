import { useTranslation } from 'next-i18next';

import ACTIVE_MODE_KEYS_MAPPING from '../../../../../constants/active-mode-keys-mapping';

import Header from './Header';
import Objectives from './Objectives';
import styles from './styles.module.css';
import useEditWeightage from './useEditWeightage';

const { CREATE } = ACTIVE_MODE_KEYS_MAPPING;

function ListCard(props) {
	const { t } = useTranslation(['allocation']);

	const { item, refetch, setActiveMode, setRefCallback } = props;

	const { objectives = [], ...userDetails } = item;

	const { user = {}, role = {}, partner = {} } = userDetails || {};

	const {
		mode,
		setMode,
		formProps,
		onSaveChanges,
		onDistributeEqually,
		onDiscardChanges,
		loading,
	} = useEditWeightage({ objectives, userDetails, refetch, t });

	const { control, handleSubmit } = formProps;

	return (
		<div className={styles.card_container}>
			<Header
				userDetails={userDetails}
				mode={mode}
				setMode={setMode}
				handleSubmit={handleSubmit}
				onSaveChanges={onSaveChanges}
				onDistributeEqually={onDistributeEqually}
				onDiscardChanges={onDiscardChanges}
				loading={loading}
				objectivesCount={(objectives || []).length}
			/>

			<Objectives
				objectives={objectives}
				mode={mode}
				control={control}
			/>

			<div
				className={styles.create_new}
				role="presentation"
				onClick={() => {
					setActiveMode(CREATE);
					setRefCallback({ role, user, partner });
				}}
			>
				{t('allocation:create_new_objective_for_agent')}
			</div>
		</div>
	);
}

export default ListCard;
