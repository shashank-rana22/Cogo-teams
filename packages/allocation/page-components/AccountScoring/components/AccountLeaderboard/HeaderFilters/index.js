import { getFieldController } from '../../../../../common/Form/getFieldController';
import controls from '../../../configurations/get-leaderboard-filters-controls';

import styles from './styles.module.css';

function HeaderFilters(props) {
	const { control, service } = props;

	const mutatedControls = controls.map((singleControl) => {
		let newControl = { ...singleControl };

		if (newControl.name === 'user_id' && service) {
			newControl = {
				...newControl,
				disabled: false,
			};
		}

		return newControl;
	});

	return (
		<div className={styles.form_container}>
			{mutatedControls.map((filterItem) => {
				const Element = getFieldController(filterItem.type);

				return (
					<div className={styles.form_group} key={filterItem.name}>
						<span className={styles.label}>{filterItem.label}</span>

						<div className={styles.input_group}>
							<Element
								{...filterItem}
								key={filterItem.name}
								control={control}
							/>
						</div>

					</div>
				);
			})}
		</div>
	);
}

export default HeaderFilters;
