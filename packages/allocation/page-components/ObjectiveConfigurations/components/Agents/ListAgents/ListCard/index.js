import { useForm } from '@cogoport/forms';
import { useState } from 'react';

import TAB_PANNEL_KEYS from '../../../../constants/tab-pannel-keys-mapping';

import Header from './Header';
import Objectives from './Objectives';
import styles from './styles.module.css';

const { OBJECTIVES } = TAB_PANNEL_KEYS;

function ListCard(props) {
	const { item, setActiveTabDetails } = props;

	const { objectives, ...rest } = item;

	const [mode, setMode] = useState('view');

	const DEFAULT_VALUES = {};
	objectives.forEach((objective) => { DEFAULT_VALUES[`${objective.id}_weightage`] = objective.weightage; });

	const { control, handleSubmit } = useForm({
		defaultValues: DEFAULT_VALUES,
	});

	return (
		<div className={styles.card_container}>
			<Header mode={mode} setMode={setMode} handleSubmit={handleSubmit} {...rest} />

			<Objectives objectives={objectives} mode={mode} control={control} />

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
