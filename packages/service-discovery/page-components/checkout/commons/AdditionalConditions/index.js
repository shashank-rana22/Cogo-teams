import AdditionalTnc from './components/AdditionalTnc';
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
	];

	return (
		<div className={styles.container}>
			{MAPPING.map((item) => {
				const {
					key,
					component: ActiveComponent,
					props: activeComponentProps,
					condition,
				} = item;

				if (!condition) {
					return null;
				}

				return (
					<div key={key} className={styles.ind_container}>
						<ActiveComponent {...activeComponentProps} />
					</div>
				);
			})}
		</div>
	);
}

export default AdditionalConditions;
