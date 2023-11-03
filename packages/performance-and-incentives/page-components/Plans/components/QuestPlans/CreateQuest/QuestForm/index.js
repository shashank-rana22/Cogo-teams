import { Button } from '@cogoport/components';

import { getFieldController } from '../../../../../../common/Form/getFieldController';

import controls from './get-quest-controls';
import useCreateQuest from './hooks/useCreateQuest';
import styles from './styles.module.css';

function QuestForm({ setParams = () => {}, refetch = () => {} }) {
	const {
		loading,
		control,
		errors,
		reset,
		handleClick,
		handleSubmit,
	} = useCreateQuest({ setParams, refetch });

	return (
		<form onSubmit={handleSubmit(handleClick)}>
			<div className={styles.form_container}>
				{controls.map((controlItem) => {
					const { type, label, name, style = {} } = controlItem || {};

					const Element = getFieldController(type);

					return (
						<div className={styles.control_item} key={name} style={style}>
							<p className={styles.label}>
								{label}
								<sup className={styles.sup}>*</sup>
							</p>

							<div>
								<Element
									control={control}
									{...controlItem}
								/>

								{errors[name]
                                        && <div className={styles.error_msg}>{errors[name]?.message}</div>}
							</div>
						</div>
					);
				})}
			</div>
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
		</form>
	);
}

export default QuestForm;
