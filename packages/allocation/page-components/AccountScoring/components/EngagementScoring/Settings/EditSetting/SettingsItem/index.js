import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useTranslation } from 'next-i18next';

import { getFieldController } from '../../../../../../../common/Form/getFieldController';

import styles from './styles.module.css';

function SettingsItem(props) {
	const { t } = useTranslation(['allocation']);

	const {
		item = {}, useGetControls = () => {},
		index = 0, inputStyle, control, errors,
	} = props;

	const controls = useGetControls(item, t);

	return (
		<div className={styles.container}>
			<div className={styles.input_row}>
				{controls.map((element) => {
					const Element = getFieldController(element.type);

					return (
						<div key={element.name} className={styles?.[inputStyle] || styles.input}>
							{index === GLOBAL_CONSTANTS.zeroth_index && (
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
