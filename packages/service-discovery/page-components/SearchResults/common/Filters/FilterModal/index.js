import { Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import deepEqual from '../../../utils/deepEqual';
import FilterContent from '../FilterContent';

import styles from './styles.module.css';

const removeDefaultValues = (
	defaultValues,
	finalValues,
) => Object.keys(finalValues).reduce((acc, key) => {
	const filterValue = finalValues[key];
	const defaultValue = defaultValues[key];

	if (
		(defaultValue !== undefined && deepEqual(defaultValue, filterValue))
	) {
		return acc;
	}

	return { ...acc, [key]: filterValue };
}, {});

function FilterModal({
	show = false,
	setShow = () => {},
	filters = {},
	setFilters = () => {},
	loading = false,
	openAccordian = '',
	defaultValues:controlsDefaultValues = {},
	controls = [],
}) {
	const defaultValues = {
		...controlsDefaultValues,
		...filters,
		...(!isEmpty(filters?.source) ? {
			source: Array.isArray(filters.source) && filters?.source?.some(
				(value) => ['spot_rates', 'predicted'].includes(value),
			) ? 'system_rate' : filters.source,
		} : {}),
	};

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

		const { source = '' } = values || {};

		const finalValues = {
			...values,
			source: source === 'system_rate' ? ['spot_rates', 'predicted'] : source || controlsDefaultValues.source,
		};

		setFilters(removeDefaultValues(controlsDefaultValues, { ...filters, ...finalValues }) || {});
		setShow(false);
	};

	const handleReset = (key) => {
		setFilters((prev) => ({
			...prev,
			[key]: controlsDefaultValues[key],
		}));
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
					filters={filters}
					openAccordian={openAccordian}
					handleReset={handleReset}
					defaultValues={controlsDefaultValues}
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
