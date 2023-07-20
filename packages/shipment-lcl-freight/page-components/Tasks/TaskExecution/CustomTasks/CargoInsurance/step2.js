import { Button, cl } from '@cogoport/components';
import { Layout } from '@cogoport/ocean-modules';

import useGetInsuranceRate from '../../../../../hooks/useGetInsuranceRate';
import useSaveDraft from '../../../../../hooks/useSaveDraft';

import { cargoControls } from './controls/cargoControls';
import PremiumRate from './PremiumRate';
import styles from './styles.module.css';
import getPayload from './utils/getPayload';
import mutatedFields from './utils/mutateFields';

const BACK_STEP = 1;
const LAST_STEP = 3;
const INCREMENT_FACTOR = 1;

function Step2({
	setStep = () => {},
	step = 0,
	insuranceDetails = {},
	shipmentData = {},
	policyId = '',
	addressId = '',
	billingData = {},
	formProps = {},
}) {
	const {
		handleSubmit = () => {},
		watch,
		setValue,
		control,
		formState: { errors },
	} = formProps;

	const formValues = watch();

	const refetch = (key) => {
		if (key === 'next_step') {
			setStep(() => (step !== LAST_STEP ? step + INCREMENT_FACTOR : step));
		}
	};

	const { premiumData, premiumLoading } = useGetInsuranceRate({
		insuranceDetails,
		formValues,
	});

	const { loading, saveData } = useSaveDraft({
		shipmentData,
		step,
		refetch,
	});

	const newControls = mutatedFields({
		fields: cargoControls({ insuranceDetails }),
		setValue,
		formValues,
		watch,
	});

	const handleNextStep = (key) => {
		handleSubmit((values) => {
			const newFormValues = { ...insuranceDetails, ...values };
			const payload = getPayload({
				policyId,
				insuranceDetails : newFormValues,
				billingData,
				policyForSelf    : insuranceDetails?.policyForSelf,
				addressId,
				premiumData,
			});
			saveData({ key, payload });
		})();
	};

	return (
		<div className={styles.container}>
			<div className={styles.label_val}>Cargo Details</div>

			<div className={styles.flex_row}>
				<div className={cl`${styles.flex_row} ${styles.flex}`}>
					<Layout
						control={control}
						fields={newControls}
						errors={errors}
					/>
				</div>

				<PremiumRate
					premiumData={premiumData}
					premiumLoading={premiumLoading}
				/>
			</div>

			<div className={styles.button_container}>
				<Button
					size="md"
					themeType="secondary"
					onClick={() => setStep(BACK_STEP)}
					disabled={loading}
				>
					Back
				</Button>

				<Button
					size="md"
					onClick={handleNextStep}
					disabled={loading}
					className={styles.btn_div}
				>
					Save As Draft
				</Button>

				<Button
					size="md"
					onClick={() => handleNextStep('next_step')}
					disabled={loading}
					className={styles.btn_div}
				>
					Next Step
				</Button>
			</div>
		</div>
	);
}

export default Step2;
