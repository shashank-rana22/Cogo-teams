import { Placeholder, Tooltip } from '@cogoport/components';

import getFormattedAmount from '../../../../../../commons/Utils/getFormattedAmount';

import CollectionActions from './CollectionActions';
import RenderStatus from './RenderStatus';
import RenderUploadedBy from './RenderUploadedBy';
import styles from './styles.module.css';
import ToolTipWrapper from './ToolTipWrapper';

const MAX_BANK_LENGTH = 12;
const MAX_LENGTH_ECLIPSES = 12;

function ColumnCard({ item, refetch, loading }) {
	const {
		customerName = '', bankName = '', accCode = '',
		bankAccountNumber = '', orgSerialId = '', paymentNumValue = '',
		amount = '', utr = '', entityType = '', currency = '',
	} = item || {};
	const calcBankLength = bankName.length;
	return (
		<div>
			<div className={styles.flex}>

				<div className={styles.customerName}>
					{loading
						? <Placeholder width="200px" height="30px" />
						: <ToolTipWrapper text={customerName || '---'} maxlength={20} />}
				</div>

				<div className={styles.orgSerialId}>
					{ loading
						? <Placeholder width="100px" height="30px" /> : orgSerialId || '---'}

				</div>

				<div className={styles.entityType}>
					{ loading
						? <Placeholder width="50px" height="30px" /> : entityType || '---'}
				</div>

				<div className={styles.accCode}>
					{loading ? <Placeholder width="100px" height="30px" /> :	(
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
											{(bankAccountNumber || accCode).substring(0, MAX_LENGTH_ECLIPSES)}
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
					)}

				</div>

				<div className={styles.paymentNumValue}>
					{ loading
						? <Placeholder width="100px" height="30px" />
						: <ToolTipWrapper text={paymentNumValue || '---'} maxlength={12} /> || '---'}

				</div>

				<div className={styles.amount}>
					{loading
						? <Placeholder width="100px" height="30px" /> : getFormattedAmount({
							amount,
							currency,
						}) || '---'}
				</div>

				<div className={styles.upload}>
					{loading
						? <Placeholder width="100px" height="30px" /> : <RenderUploadedBy item={item} />}
				</div>

				<div className={styles.utr}>
					{loading
						? <Placeholder width="100px" height="30px" />
						: <ToolTipWrapper text={utr || '---'} maxlength={12} />}
				</div>

				<div className={styles.status}>
					{loading
						? <Placeholder width="100px" height="30px" /> : <RenderStatus item={item} />}
				</div>

				<div className={styles.collection}>
					{loading
						? <Placeholder width="30px" height="30px" />
						: <CollectionActions itemData={item} refetch={refetch} />}
				</div>

			</div>
		</div>
	);
}

export default ColumnCard;
