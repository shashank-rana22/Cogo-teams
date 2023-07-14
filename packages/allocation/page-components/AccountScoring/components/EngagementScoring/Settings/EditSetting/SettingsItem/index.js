import { getFieldController } from '../../../../../../../common/Form/getFieldController';

import styles from './styles.module.css';

function SettingsItem(props) {
	const {
		item = {}, useGetControls = () => {},
		index = 0, inputStyle, control, errors,
	} = props;

	const controls = useGetControls(item);

	return (
		<div className={styles.container}>
			<div className={styles.input_row}>
				{controls.map((element) => {
					const Element = getFieldController(element.type);

					return (
						<div key={element.name} className={styles?.[inputStyle] || styles.input}>
							{index === 0 && (
								<div className={styles.label}>
									{element.label}
								</div>
							)}

							<Element
								{...element}
								key={element.name}
								control={control}
							/>

							<div className={styles.error_message}>
								{errors?.[element.name]?.message}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default SettingsItem;
