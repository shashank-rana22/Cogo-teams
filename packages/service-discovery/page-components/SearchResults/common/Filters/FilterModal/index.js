import { Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import { EXTRA_FILTERS_DEFAULT_VALUES } from '../../../utils/getPrefillForm';
import FilterContent from '../FilterContent';
import getFilterControls from '../FilterContent/getControls';

import styles from './styles.module.css';

const SERVICE_KEY = 'search_type';

const checkIfFiltersChanged = (defaultValues, finalValues) => {
	let isApplied = false;

	Object.entries(finalValues).forEach(([key, value]) => {
		if (key === 'shipping_line_id') {
			value.forEach((shipping_line) => {
				if (!defaultValues[key].includes(shipping_line)) {
					isApplied = true;
				}
			});
		} else if ((value && !defaultValues[key]) || (!value && defaultValues[key])
		|| (value && value !== defaultValues[key])) {
			isApplied = true;
		}
	});

	return isApplied;
};

function FilterModal({
	data = {},
	show = false,
	setShow = () => {},
	filters = {},
	setFilters = () => {},
	setFiltersApplied = () => {},
	loading = false,
}) {
	const controls = getFilterControls(data, SERVICE_KEY, false, true);

	const defaultValues = { ...EXTRA_FILTERS_DEFAULT_VALUES, ...filters };

	const {
		control,
		formState: { errors },
		watch,
		handleSubmit,
		setValue,
	} = useForm({ defaultValues });

	const handleApply = async (values) => {
		if (!isEmpty(errors)) {
			return;
		}

		const finalValues = { ...values };

		delete finalValues.container;

		const isChanged = checkIfFiltersChanged(EXTRA_FILTERS_DEFAULT_VALUES, finalValues);

		setFilters({ ...filters, ...finalValues });
		setFiltersApplied(isChanged);
		setShow(false);
	};

	return (
		<Modal
			animate
			size="md"
			show={show}
			onClose={() => setShow(false)}
			placement="right"
			className={styles.modal}
		>
			<Modal.Body>
				<FilterContent
					controls={controls}
					control={control}
					watch={watch}
					errors={errors}
					setValue={setValue}
					handleSubmit={handleSubmit}
				/>
			</Modal.Body>

			<Modal.Footer>
				<Button
					type="button"
					size="xl"
					themeType="accent"
					className={styles.button}
					loading={loading}
					disabled={loading}
					onClick={handleSubmit(handleApply)}
				>
					Apply Filters
				</Button>
			</Modal.Footer>

		</Modal>
	);
}

export default FilterModal;
