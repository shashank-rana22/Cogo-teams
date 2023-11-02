import { useForm } from '@cogoport/forms';

import getElementController from '../../../../../../../configs/getElementController';

import { fclControls } from './controls';
import styles from './styles.module.css';

function MainCard({ shippingLines }) {
	const shippingLineOptions = shippingLines.map((item) => ({ value: item?.id, label: item?.short_name }));

	const controls = fclControls({ shippingLineOptions });

	const { control, handleSubmit, setValue, formState:{ errors } } = useForm();

	const [shippingLineControl, ...restControls] = controls;

	const SelectController = getElementController('select');

	return (
		<div className={styles.container}>
			<div className={styles.left_container}>
				<div className={styles.element_div}>
					<div className={styles.label}>{shippingLineControl.label}</div>
					<SelectController {...shippingLineControl} control={control} />
				</div>

				<div className={styles.time_div}>
					{restControls.map((currControls) => {
						const ActiveElement = getElementController(currControls.type);

						return (
							<div key={currControls.name} className={styles.element_div}>
								<div className={styles.label}>{currControls.label}</div>
								<ActiveElement {...currControls} control={control} />
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default MainCard;
