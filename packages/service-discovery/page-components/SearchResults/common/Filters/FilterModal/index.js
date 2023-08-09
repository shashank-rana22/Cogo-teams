import { Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import FilterContent from '../FilterContent';

import styles from './styles.module.css';

function FilterModal({
	show = false,
	setShow = () => {},
	filters = {},
	setFilters = () => {},
	loading = false,
	DEFAULT_VALUES = {},
	controls = [],
}) {
	const defaultValues = { ...DEFAULT_VALUES, ...filters };

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

		setFilters({ ...filters, ...finalValues });
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
