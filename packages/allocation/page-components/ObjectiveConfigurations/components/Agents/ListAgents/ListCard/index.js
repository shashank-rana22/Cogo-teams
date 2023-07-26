import TAB_PANNEL_KEYS from '../../../../constants/tab-pannel-keys-mapping';

import Header from './Header';
import Objectives from './Objectives';
import styles from './styles.module.css';
import useEditWeightage from './useEditWeightage';

const { OBJECTIVES } = TAB_PANNEL_KEYS;

function ListCard(props) {
	const { item, refetch, setActiveTabDetails } = props;

	const { objectives = [], user = {}, role = {}, partner = {} } = item;

	const {
		mode,
		setMode,
		formProps,
		onSaveChanges,
		onDistributeEqually,
		onDiscardChanges,
	} = useEditWeightage({ objectives, user, role, refetch });

	const { control, handleSubmit } = formProps;

	return (
		<div className={styles.card_container}>
			<Header
				user={user}
				role={role}
				partner={partner}
				mode={mode}
				setMode={setMode}
				handleSubmit={handleSubmit}
				onSaveChanges={onSaveChanges}
				onDistributeEqually={onDistributeEqually}
				onDiscardChanges={onDiscardChanges}
			/>

			<Objectives
				objectives={objectives}
				mode={mode}
				control={control}
			/>

			<div
				className={styles.create_new}
				role="presentation"
				onClick={() => setActiveTabDetails((pv) => ({
					...pv,
					tab  : OBJECTIVES,
					mode : 'create',
					id   : undefined,
				}))}
			>
				+ Create New Objective For Agent
			</div>
		</div>
	);
}

export default ListCard;
