import getElementController from '../../../../../../../configurations/getElementController';

import controls from './controls';
import styles from './styles.module.css';

function BasicFields({ control = {}, errors = {}, showForm = false }) {
	return (
		<div className={styles.container}>
			{controls?.map((controlItem) => {
				const { type, label, name } = controlItem || {};

				const Element = getElementController(type);

				return (
					<div className={styles.control_item} key={name}>
						<div className={styles.label}>
							{label}
							<sup className={styles.sup}>*</sup>
						</div>

						<div>
							<Element
								control={control}
								{...controlItem}
								disabled={showForm}
							/>
							{errors[name] ? <div className={styles.error_msg}>This is required</div> : null}
						</div>
					</div>
				);
			})}
		</div>

	);
}

export default BasicFields;
