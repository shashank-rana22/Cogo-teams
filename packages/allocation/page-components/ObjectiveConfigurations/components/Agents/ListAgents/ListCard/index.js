import TAB_PANNEL_KEYS from '../../../../constants/tab-pannel-keys-mapping';

import Header from './Header';
import Objectives from './Objectives';
import styles from './styles.module.css';

function ListCard(props) {
	const { item, setActiveTabDetails } = props;

	const { OBJECTIVES } = TAB_PANNEL_KEYS;

	const { objectives, ...rest } = item;

	return (
		<div className={styles.card_container}>
			<Header {...rest} />

			<Objectives objectives={objectives} />

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
