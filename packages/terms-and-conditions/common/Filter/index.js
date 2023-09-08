import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import getShowElements from '../../utlis/getShowElements';
import getOptions from '../../utlis/service-to-trade-type-mappings';
import Layout from '../Layout';

import styles from './styles.module.css';

function Filters({ controls = [], filters = {}, setFilters = () => {}, setShow = () => {} }) {
	const finalControls = controls;
	const { page, ...restFilters } = filters || {};

	const { control, handleSubmit, watch } = useForm({ defaultValues: restFilters });
	const { service = '', trade_type = '' } = watch();

	const newField = finalControls.map((field) => {
		const { name } = field;
		let newControl = { ...field };

		if (name === 'country_id') {
			newControl = {
				...newControl,

				label:
				(trade_type === 'import' && 'Import To')
				|| (trade_type === 'export' && 'Export From')
				|| 'Country',
			};
		}

		if (name === 'trade_type') {
			newControl = {
				...newControl,
				options: getOptions[service],
			};
		}
		return { ...newControl };
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
				<Layout controls={newField} control={control} showElements={showElements} />
			</div>
		</div>
	);
}

export default Filters;
