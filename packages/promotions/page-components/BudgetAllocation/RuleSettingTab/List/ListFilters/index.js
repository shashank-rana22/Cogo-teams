import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useCallback } from 'react';

import Layout from '../../../../../common/Layout';

import controls from './controls';
import styles from './styles.module.css';

function ListFilters({
	filters = {},
	setFilters = () => {},
	setShowPopover = () => {},
}) {
	const { control, handleSubmit, reset } = useForm();

	const onClickReset = useCallback(() => {
		setShowPopover(false);
		const existingSerialId = filters?.serial_id;
		if (existingSerialId) {
			setFilters({ serial_id: existingSerialId });
		} else {
			setFilters({});
		}
		reset();
	}, [setShowPopover, filters.serial_id, reset, setFilters]);

	const onSave = (values) => {
		const existingSerialId = filters?.serial_id;

		const filter = Object.fromEntries(
			Object.entries(values).filter(([, value]) => value),
		);

		if (existingSerialId) {
			filter.serial_id = existingSerialId;
		}

		setFilters({ ...filter });

		setShowPopover(false);
	};

	return (
		<div className={styles.container}>
			<Layout controls={controls} control={control} />
			<div className={styles.btn_container}>
				<Button
					themeType="secondary"
					style={{ marginRight: 8 }}
					onClick={onClickReset}
				>
					RESET
				</Button>
				<Button onClick={handleSubmit(onSave)}>APPLY</Button>
			</div>
		</div>
	);
}

export default ListFilters;
