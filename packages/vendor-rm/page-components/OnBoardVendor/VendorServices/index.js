import FormComponent from './FormComponent';
import Header from './Header';
// eslint-disable-next-line import/no-cycle
import useVendorServices from './hooks/useVendorServices';
import styles from './styles.module.css';

function VendorServices({
	activeStepper = {},
	setActiveStepper = () => {},
	setVendorInformation = () => {},
}) {
	const {
		controls = [],
		handleSubmit = () => {},
		control,
		errors = {},
		onSubmit = () => {},
		loading = false,
		onBack = () => {},
	} = useVendorServices({
		setActiveStepper,
		setVendorInformation,
	});

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
				loading={loading}
				activeStepper={activeStepper}
			/>
		</div>
	);
}

export default VendorServices;
