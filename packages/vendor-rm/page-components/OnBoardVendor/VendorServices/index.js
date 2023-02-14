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
				control={control}
				errors={errors}
			/>
		</div>
	);
}

export default VendorServices;
