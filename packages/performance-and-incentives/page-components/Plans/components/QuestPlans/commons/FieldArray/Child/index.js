import { IcMDelete } from '@cogoport/icons-react';

import { getFieldController } from '../../../../../../../common/Form/getFieldController';
import getControls from '../../../CreateQuest/QuestConfig/get-quest-config-controls';

import styles from './styles.module.css';

const FIRST_INDEX = 1;

function Child(props) {
	const {
		field,
		control,
		index,
		name,
		remove,
		showDeleteButton = true,
		noDeleteButtonTill = 0,
		disabled = false,
		error = {},
		config_id = null,
		watch = () => {},
		onChangeChild = () => {},
		onDeleteChild = () => {},
		...rest
	} = props;

	const {
		agent_scoring_block_name,
		agent_scoring_block_id,
	} = watch('agent_scoring_quest_configurations')[index];

	const controls = getControls({ config_id, agent_scoring_block_name, agent_scoring_block_id });

	return (
		<div className={styles.content}>
			{controls.map((controlItem) => {
				const Element = getFieldController(controlItem?.type);

				if (!Element) return null;

				return (
					<div key={controlItem?.name} className={styles.list}>
						<div className={styles.label}>{controlItem?.label}</div>

						<Element
							{...rest}
							key={`${name}.${index}.${controlItem?.name}`}
							control={control}
							id={`create_form_${controlItem?.name}_field`}
							{...controlItem}
							name={`${name}.${index}.${controlItem?.name}`}
							onChange={(val, obj) => onChangeChild({ val, obj, index, name: controlItem?.name })}
						/>

						<div className={styles.error_message}>
							{error?.[controlItem?.name]?.message}
						</div>
					</div>
				);
			})}

			{showDeleteButton && index >= noDeleteButtonTill && !disabled ? (
				<IcMDelete
					className={`form-fieldArray-${name}-remove`}
					onClick={() => { remove(index, FIRST_INDEX); onDeleteChild({ index }); }}
					style={{
						height    : '20px',
						width     : '20px',
						marginTop : '24px',
						cursor    : 'pointer',
					}}
				/>
			) : null}
		</div>
	);
}
export default Child;
