import controls from '../../../configurations/filter-controls';
import { getFieldController } from '../../../utils/getFieldController';

import styles from './styles.module.css';

function Filters({ formProps }) {
	const { control } = formProps;

	return (
		<div className={styles.container}>
			<div className={styles.title}>Filters</div>

			<form className={styles.form}>
				{controls.map((controlItem) => {
					const el = { ...controlItem };

					const Element = getFieldController(el.type);

					if (!Element) return null;

					return (
						<div className={styles.control_container}>
							{el.label && <div className={styles.label}>{el.label}</div>}
							<Element
								{...el}
								size="sm"
								key={el.name}
								control={control}
								id={`${el.name}_input`}
							/>
						</div>
					);
				})}
			</form>

		</div>
	);
}

export default Filters;
