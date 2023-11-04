import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import { getFieldController } from '../../../../../../common/Form/getFieldController';
import QUEST_MODE_KEYS from '../../configurations/quest-mode-key-mappings';

import controls from './get-quest-controls';
import useCreateQuest from './hooks/useCreateQuest';
import styles from './styles.module.css';

const { CREATE, EDIT } = QUEST_MODE_KEYS;

function QuestForm({ setParams = () => {}, data = {} }) {
	const {
		loading,
		control,
		errors,
		reset,
		handleClick,
		handleSubmit,
	} = useCreateQuest({ setParams, data });

	const MODE = isEmpty(data) ? CREATE : EDIT;

	return (
		<form onSubmit={handleSubmit(handleClick)}>
			<div className={styles.form_container}>
				{controls.map((controlItem) => {
					const { type, label, name, style = {} } = controlItem || {};

					const isRequired = !!controlItem?.rules?.required;

					const Element = getFieldController(type);

					return (
						<div className={styles.control_item} key={name} style={style}>
							<p className={styles.label}>
								{label}
								{isRequired ? <sup className={styles.sup}>*</sup> : null}
							</p>

							<div>
								<Element
									control={control}
									{...controlItem}
									disabled={MODE === EDIT}
								/>

								{errors[name]
                                        && <div className={styles.error_msg}>{errors[name]?.message}</div>}
							</div>
						</div>
					);
				})}
			</div>
			{MODE === CREATE
				? (
					<div className={styles.button_container}>
						<Button themeType="secondary" onClick={() => reset()}>
							Reset
						</Button>
						<Button
							type="submit"
							themeType="primary"
							loading={loading}
						>
							Create new
						</Button>
					</div>
				) : null}
		</form>
	);
}

export default QuestForm;
