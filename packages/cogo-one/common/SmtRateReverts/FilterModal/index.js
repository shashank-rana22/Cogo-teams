import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import smtRateRevertsFilters from '../../../configurations/smtRateRevertsFilters';
import { ADMIN_VIEW_REQUIRED_FOR } from '../../../constants/rateRevertsConstants';
import { getFieldController } from '../../../utils/getFieldController';

import styles from './styles.module.css';

function FilterModal({
	filterValues = {},
	defaultValues = {},
	setParams = () => {},
	setShowFilters = () => {},
	triggeredFrom = '',
	viewType = '',
	setFiltersData = () => {},
}) {
	const {
		control,
		handleSubmit = () => {},
		reset = () => {},
		watch = () => {},
	} = useForm({ defaultValues: filterValues });

	const serviceType = watch('service');
	const controls = smtRateRevertsFilters({ triggeredFrom, viewType, setFiltersData, serviceType });

	const sourceValue = JSON.parse(localStorage.getItem('smt_rate_data_source'));

	const onSubmit = (val) => {
		setShowFilters(false);

		localStorage.setItem('smt_rate_data_filter', JSON.stringify({
			source              : sourceValue?.source,
			relevant_to         : val?.relevant_to,
			service             : val?.service,
			service_provider_id : val?.service_provider_id,
			shipment_serial_id  : val?.shipment_serial_id,
			startDate           : val?.dateRange?.startDate,
			endDate             : val?.dateRange?.endDate,
			filterApplied       : true,
		}));

		setParams((prev) => ({
			...prev,
			...val,
			page: 1,
		}));
	};

	const handleReset = () => {
		localStorage.setItem('smt_rate_data_filter', JSON.stringify({}));

		reset(defaultValues);

		setParams((prev) => ({
			source      : prev?.source,
			service     : 'fcl_freight',
			relevant_to : ADMIN_VIEW_REQUIRED_FOR.includes(viewType) ? 'all' : '',
			page        : 1,
			dateRange   : {
				startDate : new Date((new Date()).setHours(0, 0, 0, 0)),
				endDate   : new Date((new Date()).setHours(23, 59, 59, 59)),
			},
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
