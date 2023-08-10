import { getFieldController } from '../../../../../../../utils/getFieldController';

import styles from './styles.module.css';

function Form({ control = {}, controls = [], showElements = {} }) {
	return (
		<div className={styles.container}>
			{controls.map((eachControl) => {
				const { controlType, name } = eachControl || {};
				const Element = getFieldController(controlType);

				const show = !(name in showElements) || showElements[name];

				if (!Element || !show) {
					return null;
				}

				return (
					<div className={styles.each_element} key={name}>
						<Element control={control} {...eachControl} />
					</div>
				);
			})}
		</div>
	);
}
export default Form;
