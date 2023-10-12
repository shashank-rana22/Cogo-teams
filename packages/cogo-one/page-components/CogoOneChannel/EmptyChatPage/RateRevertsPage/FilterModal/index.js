import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import { serviceOptions } from '../../../../../constants/rateRevertsFilters';
import { getFieldController } from '../../../../../utils/getFieldController';

import styles from './styles.module.css';

const controls = [
	{
		label        : 'Select Services',
		name         : 'service_type',
		controllType : 'select',
		placeholder  : 'select',
		options      : serviceOptions,
	},
];

function FilterModal({ setParams = () => {}, setShowFilters = () => {} }) {
	const {
		control,
		handleSubmit = () => {},
		reset = () => {},
	} = useForm();

	const onSubmit = (val) => {
		const { service_type } = val || {};

		setShowFilters((prev) => ({
			...prev,
			isApplied : true,
			show      : false,
		}));

		setParams((prev) => ({
			...prev,
			service: service_type,
		}));
	};

	const handleReset = () => {
		reset();
		setParams((prev) => ({
			...prev,
			service: '',
		}));
		setShowFilters({
			show      : false,
			isApplied : false,
		});
	};

	return (
		<div>
			{controls?.map((controlItem) => {
				const { label = '', name = '', controllType = '' } = controlItem || {};
				const Element = getFieldController(controllType);

				if (!Element) {
					return null;
				}

				return (
					<div className={styles.wrap} key={name}>
						<div className={styles.label}>{label}</div>
						<Element control={control} {...controlItem} />
					</div>
				);
			})}
			<div className={styles.button_section}>
				<Button size="sm" themeType="secondary" onClick={handleReset}>Reset</Button>
				<Button size="sm" themeType="primary" onClick={handleSubmit(onSubmit)}>Apply</Button>
			</div>
		</div>
	);
}

export default FilterModal;
