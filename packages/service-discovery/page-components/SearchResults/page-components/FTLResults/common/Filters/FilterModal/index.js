import { Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';

import { getControls } from '../filter-controls';

import FilterContent from './FilterContent';
import styles from './styles.module.css';

function FilterModal({
	show = false,
	setShow = () => {},
	filters = {},
	setFilters = () => {},
	loading = false,
	DEFAULT_VALUES = {},
	openAccordian = '',
	transitTime = {},
}) {
	const controls = getControls({ transitTime });

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

	const handleReset = (key) => {
		setFilters((prev) => ({
			...prev,
			[key]: DEFAULT_VALUES[key],
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
