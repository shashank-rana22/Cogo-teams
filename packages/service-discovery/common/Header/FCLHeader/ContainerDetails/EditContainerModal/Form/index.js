import Layout from '../../../../../Layout';

import styles from './styles.module.css';

function Form({
	controls = [],
	control = () => {},
	watch = () => {},
	handleSubmit = () => {},
	setValue = () => {},
	errors = {},
}) {
	return (
		<div className={styles.container}>
			<div className={styles.header}>Container Details</div>

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
