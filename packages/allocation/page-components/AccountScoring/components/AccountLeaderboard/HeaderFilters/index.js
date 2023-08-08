import { getFieldController } from '../../../../../common/Form/getFieldController';

import styles from './styles.module.css';

function HeaderFilters(props) {
	const { control, filterControls } = props;

	return (
		<div className={styles.form_container}>
			{filterControls.map((filterItem) => {
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
