import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import smtRateRevertsFilters from '../../../configurations/smtRateRevertsFilters';
import { getFieldController } from '../../../utils/getFieldController';

import styles from './styles.module.css';

function FilterModal({
	filterValues = {},
	defaultValues = {},
	setParams = () => {},
	setShowFilters = () => {},
	triggeredFrom = '',
	setShipmentObj = () => {},
}) {
	const {
		control,
		handleSubmit = () => {},
		reset = () => {},
	} = useForm({ defaultValues: filterValues });

	const controls = smtRateRevertsFilters({ triggeredFrom, setShipmentObj });

	const onSubmit = (val) => {
		setShowFilters(false);

		setParams((prev) => ({
			...prev,
			...val,
			page: 1,
		}));
	};

	const handleReset = () => {
		reset(defaultValues);

		setParams((prev) => ({
			...prev,
			...defaultValues,
			page: 1,
		}));

		setShowFilters(false);
	};

	return (
		<div className={styles.container}>
			{controls?.map(
				(controlItem) => {
					const {
						label = '',
						name = '',
						controlType = '',
					} = controlItem || {};

					const Element = getFieldController(controlType);

					if (!Element) {
						return null;
					}

					return (
						<div className={styles.wrap} key={name}>
							<div className={styles.label}>
								{label}
							</div>

							<Element
								control={control}
								{...controlItem}
							/>
						</div>
					);
				},
			)}

			<div className={styles.button_section}>
				<Button
					size="md"
					themeType="secondary"
					onClick={handleReset}
				>
					Reset
				</Button>

				<Button
					size="md"
					themeType="primary"
					onClick={handleSubmit(onSubmit)}
				>
					Apply
				</Button>
			</div>
		</div>
	);
}

export default FilterModal;
