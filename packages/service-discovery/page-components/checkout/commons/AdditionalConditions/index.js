import AdditionalTnc from './components/AdditionalTnc';
import CreditApprovalCard from './components/CreditApprovalCard';
import KycMessage from './components/KycMessage';
import OverallRisk from './components/OverallRisk';
import styles from './styles.module.css';

function AdditionalConditions({
	detail = {},
	updateCheckout,
	updateLoading,
	tncPresent,
	showSendTncEmail,
	showOverallCreditRisk,
	kycShowCondition,
	setIsVeryRisky,
	orgData,
	getCheckout,
	loading,
}) {
	const { importer_exporter_id } = detail;

	const MAPPING = [
		{
			key       : 'additional_tnc',
			component : AdditionalTnc,
			condition : !tncPresent,
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
			props     : {
				detail,
				setIsVeryRisky,
			},
		},
		{
			key       : 'kyc',
			component : KycMessage,
			condition : kycShowCondition,
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
				} = item;

				if (!condition) {
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
