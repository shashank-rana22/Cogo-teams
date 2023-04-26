import { getFieldController } from '../../../../../common/Form/getFieldController';
import controls from '../../../configurations/get-leaderboard-filters-controls';

import styles from './styles.module.css';

function HeaderFilters(props) {
	const { control, errors } = props;

	return (
		<div className={styles.form_container}>
			{controls.map((filterItem) => {
				const Element = getFieldController(filterItem.type);

				return (
					<div className={styles.form_group}>
						<span className={styles.label}>{filterItem.label}</span>

						<div className={styles.input_group}>
							<Element
								{...filterItem}
								key={filterItem.name}
								control={control}
							/>
						</div>

						<div className={styles.error_message}>
							{errors?.[filterItem.name]?.message}
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default HeaderFilters;
