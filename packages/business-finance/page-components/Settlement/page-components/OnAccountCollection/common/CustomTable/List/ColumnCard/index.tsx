import { Tooltip } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';

import CollectionActions from './CollectionActions';
import RenderStatus from './RenderStatus';
import RenderUploadedBy from './RenderUploadedBy';
import styles from './styles.module.css';
import ToolTipWrapper from './ToolTipWrapper';

const MAX_BANK_LENGTH = 12;
const MAX_LENGTH_ECLIPSES = 12;
const MAX_LENGTH_VISIBLE = 12;

interface ColumnCardInterface {
	refetch?: () => void;
	item?: {
		customerName?: string;
		accCode?: string;
		bankAccountNumber?: string;
		orgSerialId?: string;
		bankName?: string;
		paymentNumValue?: string;
		amount?: string;
		utr?: string;
		entityType?: string;
		currency?: string;
		id?: string;
		paymentDocumentStatus?: string;
		accMode?: string;
		paymentCode?: string;
		sageOrganizationId?: string;
	};
	getTableBodyCheckbox: (val: object) => JSX.Element;
}

function ColumnCard({ item, refetch, getTableBodyCheckbox }: ColumnCardInterface) {
	const {
		customerName = '',
		bankName = '',
		accCode = '',
		bankAccountNumber = '',
		orgSerialId = '',
		paymentNumValue = '',
		amount = '',
		utr = '',
		entityType = '',
		currency = '',
	} = item || {};
	const calcBankLength = bankName.length;

	return (
		<div>
			<div className={styles.flex}>
				<div className={styles.checkbox}>
					{getTableBodyCheckbox(item)}
				</div>

				<div className={styles.customerName}>
					<ToolTipWrapper
						text={customerName || '---'}
						maxlength={20}
					/>
				</div>

				<div className={styles.orgSerialId}>{orgSerialId || '---'}</div>

				<div className={styles.entityType}>{entityType || '---'}</div>

				<div className={styles.accCode}>
					<div>
						{calcBankLength >= MAX_BANK_LENGTH ? (
							<Tooltip
								placement="top"
								content={(
									<>
										<div>{bankName}</div>
										{' '}
										A/C No. -
										{bankAccountNumber || accCode}
									</>
								)}
								interactive
							>
								<div>
									{bankName.substring(0, MAX_LENGTH_ECLIPSES)}
									...
									<div>
										{(
											bankAccountNumber || accCode
										).substring(0, MAX_LENGTH_ECLIPSES)}
										...
									</div>
								</div>
							</Tooltip>
						) : (
							<div>
								<div>{bankName}</div>
								A/C No. -
								{bankAccountNumber || accCode}
							</div>
						)}
					</div>
				</div>

				<div className={styles.paymentNumValue}>
					{(
						<ToolTipWrapper
							text={paymentNumValue || '---'}
							maxlength={MAX_LENGTH_VISIBLE}
						/>
					) || '---'}
				</div>

				<div className={styles.amount}>
					{formatAmount({
						amount,
						currency,
						options: {
							style                 : 'currency',
							currencyDisplay       : 'code',
							maximumFractionDigits : 2,
						},
					}) || '---'}
				</div>

				<div className={styles.upload}>
					<RenderUploadedBy item={item} />
				</div>

				<div className={styles.utr}>
					<ToolTipWrapper text={utr || '---'} maxlength={12} />
				</div>

				<div className={styles.status}>
					<RenderStatus item={item} />
				</div>

				<div className={styles.collection}>
					<CollectionActions itemData={item} refetch={refetch} />
				</div>
			</div>
		</div>
	);
}

export default ColumnCard;
