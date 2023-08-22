import { Button } from '@cogoport/components';
import { Layout } from '@cogoport/ocean-modules';

import useInsuranceCheckoutAndGenerate from '../../../../../hooks/useInsuranceCheckoutAndGenerate';
import useSaveDraft from '../../../../../hooks/useSaveDraft';
import useSendShipmentCargoInsuranceEmail from '../../../../../hooks/useSendShipmentCargoInsuranceEmail';

import { invoiceControls } from './controls/invoiceControls';
import styles from './styles.module.css';
import getPayload from './utils/getPayload';
import getPayloadForUpdateShipment from './utils/getPayloadForUpdateShipment';

const BACK_STEP = 2;

function StepThree({
	setStep = () => {},
	step,
	policyId = '',
	formProps = {},
	insuranceDetails = {},
	shipmentData = {},
	onCancel = () => {},
	refetch = () => {},
	primary_service = {},
	task = {},
	addressId = '',
	billingData = {},
	premiumData = {},
}) {
	const {
		handleSubmit = () => {},
		control,
		formState: { errors },
		watch,
	} = formProps;

	const { loading, saveData } = useSaveDraft({
		shipmentData,
		step,
	});

	const refetchAfterApiCall = () => {
		refetch();
		onCancel();
	};

	const { loading: sendCustomerEmailLoading, sendCustomerEmail } = useSendShipmentCargoInsuranceEmail({
		shipmentData,
	});

	const { loading: policyGenerationLoading, generateInsurance } =	useInsuranceCheckoutAndGenerate({
		policyId,
		insuranceDetails,
		refetch: refetchAfterApiCall,
		shipmentData,
		primary_service,
		task,
	});

	const formData = watch();
	const showLoading =	loading || sendCustomerEmailLoading || policyGenerationLoading;

	const handleMail = () => {
		const serviceChargeList = premiumData?.serviceChargeList || [];
		const payload = {
			cargo_value          : formData?.cargoAmount,
			cargo_value_currency : formData?.policyCurrency,
			net_convenience      : serviceChargeList.find(
				(i) => i?.serviceName === 'convenience_charges',
			)?.netCharges,
			net_platform: serviceChargeList.find(
				(i) => i?.serviceName === 'platform_charges',
			)?.netCharges,
			net_premium: serviceChargeList.find(
				(i) => i?.serviceName === 'premium',
			)?.netCharges,
		};
		sendCustomerEmail(payload);
	};
	const handleNextStep = ({ submit = false }) => {
		handleSubmit((values) => {
			const newFormValues = { ...insuranceDetails, ...values };
			const payload = getPayload({
				policyId,
				insuranceDetails : newFormValues,
				billingData,
				policyForSelf    : insuranceDetails?.policyForSelf,
				addressId,
				billingType      : insuranceDetails?.billingType ? 'INDIVIDUAL' : 'CORPORATE',
			});
			const payloadForUpdateShipment = getPayloadForUpdateShipment(
				{ insuranceDetails, task, shipmentData },
			);

			if (submit) {
				generateInsurance({ payload, payloadForUpdateShipment });
			} else {
				saveData({ payload });
			}
		})();
	};

	return (
		<div className={styles.container}>
			<Layout
				control={control}
				fields={invoiceControls}
				errors={errors}
			/>

			<div className={styles.button_container}>
				<Button
					size="md"
					themeType="secondary"
					onClick={() => setStep(BACK_STEP)}
					disabled={showLoading}
				>
					Back
				</Button>

				<Button
					size="md"
					onClick={handleMail}
					className={styles.btn_div}
				>
					Send email for Customer confirmation
				</Button>

				<Button
					size="md"
					onClick={handleNextStep}
					disabled={showLoading}
					className={styles.btn_div}
				>
					Save As Draft
				</Button>

				<Button
					size="md"
					onClick={() => handleNextStep({ submit: true })}
					disabled={showLoading}
					className={styles.btn_div}
				>
					Generate Policy
				</Button>
			</div>
		</div>
	);
}

export default StepThree;
