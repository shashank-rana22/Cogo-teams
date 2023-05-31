import { Button } from '@cogoport/components';

import getElementController from '../../../../../../../configs/getElementController';

import controls from './controls';
import styles from './styles.module.css';

function FilterContent({
	control,
	handleSubmit,
	onSubmit,
	onClickReset,
}) {
	return (
		<form className={styles.filter_container} onSubmit={handleSubmit(onSubmit)}>
			{controls.map((item) => {
				const { label, type, name } = item || {};

				const Element = getElementController(type);

				return (
					<div key={name}>
						<div className={styles.title}>{label}</div>

						<Element
							control={control}
							{...item}
						/>
					</div>
				);
			})}

			<div className={styles.button_container}>
				<Button
					type="button"
					themeType="secondary"
					style={{ marginRight: '8px' }}
					onClick={onClickReset}
					size="sm"
				>
					Reset
				</Button>

				<Button
					size="sm"
					themeType="primary"
					type="submit"
				>
					Apply
				</Button>
			</div>
		</form>
	);
}

export default FilterContent;
