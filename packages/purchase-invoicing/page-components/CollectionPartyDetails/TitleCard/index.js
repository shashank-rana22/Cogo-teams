import getFormattedAmount from '../../../common/helpers/formatAmount';
import ToolTipWrapper from '../../../common/ToolTipWrapper';
import styles from '../styles.module.css';

const SERVICE_WRAPPER_LAST_INDEX = 2;
const SERVICE_WRAPPER_START_INDEX = 0;
const DEFAULT_COLECTION_PARTY_COUNT = 0;
const MAX_LEN_FOR_TOOLTIP = 25;

function TitleCard({
	collectionParty = {},
	services = [],
	serviceswrapper = () => {},

}) {
	return (
		<div className={styles.container_title}>
			<div className={styles.customer}>
				<div className={styles.heading}>
					<ToolTipWrapper text={collectionParty?.service_provider?.business_name} maxlength={25} />
				</div>
				<div className={styles.servicename}>
					<span className={styles.spankey}>Services :</span>
					<ToolTipWrapper
						text={services}
						maxlength={SERVICE_WRAPPER_LAST_INDEX}
						render
						content={(
							<>
								{serviceswrapper(services)}
							</>
						)}
					>
						{serviceswrapper(services?.slice(
							SERVICE_WRAPPER_START_INDEX,
							SERVICE_WRAPPER_LAST_INDEX,
						) || [])}
						{services.length > SERVICE_WRAPPER_LAST_INDEX ? '...' : ''}
					</ToolTipWrapper>
				</div>
			</div>
			<div className={styles.invoices}>
				<div>Total Invoice Value -</div>
				<div className={styles.value}>
					<ToolTipWrapper
						text={getFormattedAmount(
							collectionParty.invoice_total,
							collectionParty.invoice_currency,
						)}
						maxlength={MAX_LEN_FOR_TOOLTIP}
					/>
					<span className={styles.paddingleft}>
						{`- (${collectionParty?.collection_parties?.length || DEFAULT_COLECTION_PARTY_COUNT})`}
					</span>
				</div>
			</div>
			<div className={styles.lineitems}>
				<div>
					{`No. Of Line Items 
                - ${collectionParty?.total_line_items} | Locked - ${collectionParty?.locked_line_items}`}
				</div>
			</div>
			<div className={styles.mode}>
				Cash
			</div>
		</div>
	);
}

export default TitleCard;
