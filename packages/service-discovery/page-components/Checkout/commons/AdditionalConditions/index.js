import AdditionalTnc from './components/AdditionalTnc';
import CreditApprovalCard from './components/CreditApprovalCard';
import KycMessage from './components/KycMessage';
import OverallRisk from './components/OverallRisk';
import styles from './styles.module.css';

function AdditionalConditions({
	detail = {},
	updateCheckout = () => {},
	updateLoading = () => {},
	tncPresent = false,
	showSendTncEmail = false,
	showOverallCreditRisk = false,
	kycShowCondition = false,
	setIsVeryRisky = () => {},
	orgData = {},
	getCheckout = () => {},
	loading = false,
	source = 'locked',
}) {
	const { importer_exporter_id } = detail;

	const MAPPING = [
		{
			key       : 'additional_tnc',
			component : AdditionalTnc,
			condition : !tncPresent,
			show      : ['locked'],
			props     : {
				detail,
				updateLoading,
				updateCheckout,
			},
		},
		{
			key       : 'overall_risk',
			component : OverallRisk,
			condition : showOverallCreditRisk,
			show      : ['booking_confirmation'],
			props     : {
				detail,
				setIsVeryRisky,
			},
		},
		{
			key       : 'kyc',
			component : KycMessage,
			condition : kycShowCondition,
			show      : ['locked'],
			props     : {
				detail,
				status       : orgData.data?.kyc_status,
				importer_exporter_id,
				organization : orgData?.data,
				getCheckout,
			},
		},
		{
			key       : 'credit_approval',
			component : CreditApprovalCard,
			condition : showSendTncEmail,
			style     : { flexBasis: '100%' },
			show      : ['booking_confirmation'],
			props     : {
				detail,
				updateLoading,
				updateCheckout,
				loading,
				getCheckout,
			},
		},
	];

	return (
		<div className={styles.container}>
			{MAPPING.map((item) => {
				const {
					key,
					component: ActiveComponent,
					props: activeComponentProps,
					condition,
					style = {},
					show = [],
				} = item;

				if (!condition || !show.includes(source)) {
					return null;
				}

				return (
					<div key={key} style={style} className={styles.ind_container}>
						<ActiveComponent {...activeComponentProps} />
					</div>
				);
			})}
		</div>
	);
}

export default AdditionalConditions;
