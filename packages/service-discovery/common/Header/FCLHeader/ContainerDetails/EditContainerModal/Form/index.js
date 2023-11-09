import { IcMCross } from '@cogoport/icons-react';

import Layout from '../../../../../Layout';

import styles from './styles.module.css';

function Form({
	controls = [],
	control = () => {},
	watch = () => {},
	handleSubmit = () => {},
	setValue = () => {},
	onClose = () => {},
	errors = {},
	isMobile = false,
}) {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.heading}>Container Details</div>

				{isMobile ? (
					<IcMCross onClick={onClose} />
				) : null}
			</div>

			<Layout
				control={control}
				controls={controls}
				handleSubmit={handleSubmit}
				errors={errors}
				watch={watch}
				setValue={setValue}
			/>
		</div>
	);
}

export default Form;
