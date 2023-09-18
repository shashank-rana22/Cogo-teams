import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import Layout from '../../../../common/Layout';
import LABEL_MAPPING from '../../../../config/countryIdMapping.json';
import SERVICE_TRADE_TYPE_OPTION_MAPPING from '../../../../config/service-to-trade-type-mappings';
import getShowElements from '../../../../helpers/getShowElements';

import controls from './filter-controls';
import styles from './styles.module.css';

function Filters({ filters = {}, setFilters = () => {}, setShow = () => {} }) {
	const finalControls = controls;
	const { page, ...restFilters } = filters || {};

	const { control, handleSubmit, watch } = useForm({ defaultValues: restFilters });
	const { service = '', trade_type = '' } = watch();

	finalControls.forEach((ctrl, index) => {
		if (ctrl?.name === 'country_id') {
			finalControls[index].label = LABEL_MAPPING?.[trade_type] || LABEL_MAPPING.default;
		}

		if (ctrl?.name === 'trade_type') {
			finalControls[index].options = SERVICE_TRADE_TYPE_OPTION_MAPPING[service];
		}
	});

	const showElements = getShowElements({ service, trade_type, controls });

	const onReset = () => {
		setFilters({ page: 1 });
		setShow(false);
	};

	const onSubmit = (values) => {
		setFilters({ ...restFilters, ...(values || {}), page: 1 });
		setShow(false);
	};

	return (
		<div>
			<div className={styles.button_container}>
				<Button onClick={onReset} themeType="secondary">Reset</Button>

				<Button onClick={handleSubmit(onSubmit)}>Show Result</Button>
			</div>

			<div>
				<Layout controls={finalControls} control={control} showElements={showElements} />
			</div>
		</div>
	);
}

export default Filters;
