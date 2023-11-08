import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMRefresh } from '@cogoport/icons-react';

import Layout from '../../../common/Layout';

import getFilterControls from './filterControls';
import styles from './styles.module.css';

function FilterPopover({ setVisible = () => {}, setFilters = () => {} }) {
	const controls = getFilterControls();
	const { control, formState:{ errors = {} }, handleSubmit, reset } = useForm();
	const handleCancel = () => {
		setVisible(false);
	};

	const handleApply = (val) => {
		setFilters((prev) => ({ ...prev, ...val }));
		setVisible(false);
	};
	const handleReset = () => {
		reset();
		setFilters({});
		setVisible(false);
	};
	return (
		<div className={styles.body}>
			<div className={styles.header}>
				<div>Filters</div>
				<div className={styles.btn_section}>
					<Button
						className={styles.reset_btn}
						size="sm"
						themeType="tertiary"
						onClick={() => handleReset()}
					>
						<IcMRefresh className={styles.refersh_icon} />
						Reset
					</Button>
					<Button
						className={styles.cancel_btn}
						size="sm"
						onClick={() => handleCancel()}
						themeType="secondary"
					>
						Cancel

					</Button>
					<Button
						onClick={handleSubmit(handleApply)}
						className={styles.apply_btn}
						size="sm"
						themeType="primary"
					>
						Apply

					</Button>
				</div>
			</div>
			<Layout
				control={control}
				errors={errors}
				controls={controls}
			/>
		</div>
	);
}
export default FilterPopover;
