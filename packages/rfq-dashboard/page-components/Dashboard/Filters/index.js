import getControls from '../../../configurations/filter-controls';
import { getFieldController } from '../../../utils/getFieldController';

import styles from './styles.module.css';

function Filters({ formProps }) {
	const { control } = formProps;
	const controls = getControls();

	return (
		<div className={styles.container}>
			<div className={styles.title}>Filters</div>
			<form>
				{controls.map((controlItem) => {
					const el = { ...controlItem };
					const Element = getFieldController(el.type);

					if (!Element) return null;

					return (
						<>
							{el.name === 'start_date'
								? (
									<div className={styles.date_text}>
										Filter by Created Date
									</div>
								) : null}
							<div
								key={controlItem.name}
								className={styles.control_container}
							>
								{el.label && <div className={styles.label}>{el.label}</div>}
								<Element
									{...el}
									size="sm"
									key={el.name}
									control={control}
									id={`${el.name}_input`}
								/>
							</div>
						</>
					);
				})}
			</form>

		</div>
	);
}

export default Filters;
