/* eslint-disable import/no-cycle */
import FormComponent from './FormComponent';
import Header from './Header';
import useVendorServices from './hooks/useVendorServices';
import styles from './styles.module.css';

function VendorServices({
	activeStepper = {},
	setActiveStepper = () => {},
	vendorInformation = {},
	setVendorInformation = () => {},
}) {
	const {
		controls = [],
		handleSubmit = () => {},
		control,
		errors = {},
		onSubmit = () => {},
		loading = false,
		handleBackLink = () => {},
		watch = () => {},
		setValue,
	} = useVendorServices({
		setActiveStepper,
		vendorInformation,
		setVendorInformation,
	});

	return (
		<div className={styles.container}>
			<Header
				activeStepper={activeStepper}
				onBack={handleBackLink}
			/>
			<FormComponent
				controls={controls}
				handleSubmit={handleSubmit}
				onSubmit={onSubmit}
				control={control}
				errors={errors}
				loading={loading}
				activeStepper={activeStepper}
				watch={watch}
				setValue={setValue}
			/>
		</div>
	);
}

export default VendorServices;
