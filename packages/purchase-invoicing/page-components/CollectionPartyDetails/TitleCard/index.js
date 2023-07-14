import { startCase } from '@cogoport/utils';

import getFormattedAmount from '../../../common/helpers/formatAmount';
import ToolTipWrapper from '../../../common/ToolTipWrapper';

import styles from './styles.module.css';

const SERVICE_WRAPPER_LAST_INDEX = 2;
const SERVICE_WRAPPER_START_INDEX = 0;
const DEFAULT_COLECTION_PARTY_COUNT = 0;
const MAX_LEN_FOR_TOOLTIP = 25;
const LAST_INDEX = 1;

function Serviceswrapper({ allservices = [], toolTipContent = false }) {
	return (
		<>
			{toolTipContent
			&& (allservices || []).map((service, i) => (
				<span key={service}>
					{`${startCase(service)} ${allservices.length - LAST_INDEX === i ? '' : ', '}`}
				</span>
			))}
			{!toolTipContent && (allservices || []).map((service) => (
				<div key={service}>
					{startCase(service)}
				</div>
			))}
		</>
	);
}

function TitleCard({
	collectionParty = {},
	services = [],
}) {
	return (
		<div className={styles.container_title}>
			<div className={styles.customer}>
				<div className={styles.heading}>
					<ToolTipWrapper
						text={collectionParty?.service_provider?.business_name}
						maxlength={MAX_LEN_FOR_TOOLTIP}
					/>
				</div>
				<div className={styles.servicename}>
					<span className={styles.spankey}>Services :</span>
					<ToolTipWrapper
						text={services}
						maxlength={SERVICE_WRAPPER_LAST_INDEX}
						render
						content={(
							<Serviceswrapper allservices={services} />
						)}
					>
						<Serviceswrapper
							allservices={services?.slice(
								SERVICE_WRAPPER_START_INDEX,
								SERVICE_WRAPPER_LAST_INDEX,
							) || []}
							toolTipContent="true"
						/>
						{services?.length > SERVICE_WRAPPER_LAST_INDEX ? '...' : ''}
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
					<span className={styles.party_count}>
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
