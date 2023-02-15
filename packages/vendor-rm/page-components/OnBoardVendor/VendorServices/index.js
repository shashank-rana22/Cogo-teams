import FormComponent from './FormComponent';
import Header from './Header';
import useVendorServices from './hooks/useVendorServices';
import styles from './styles.module.css';

function VendorServices({
	activeStepper = {},
	setActiveStepper = () => {},
	onBack = () => {},
}) {
	const {
		controls = [],
		handleSubmit = () => {},
		control,
		errors = {},
		onSubmit = () => {},
	} = useVendorServices();

	return (
		<div className={styles.container}>
			<Header
				activeStepper={activeStepper}
				setActiveStepper={setActiveStepper}
				onBack={onBack}
			/>
			<FormComponent
				controls={controls}
				handleSubmit={handleSubmit}
				onSubmit={onSubmit}
				control={control}
				errors={errors}
			/>
		</div>
	);
}

export default VendorServices;
