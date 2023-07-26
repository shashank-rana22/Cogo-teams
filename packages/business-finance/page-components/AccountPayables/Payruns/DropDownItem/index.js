import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import formatDate from '@cogoport/globalization/utils/formatDate';

import RenderTooltip from '../../../commons/RenderTooltip';

import LoadingState from './LoadingState';
import styles from './styles.module.css';

function DropDownItem({ data = [], loadingDropDown = false }) {
	return (
		<div>
			<div className={styles.hr} />
			{(data).map((item) => {
				const {
					objectNumber = '', cogoBankName = '', transactionRef = '', payrunName = '',	paidTdsAmount = '',
					paidAmount = '', paymentDate = '', transactionType = '', objectCurrency = '',
				} = item || {};
				return (
					<div key={objectNumber}>
						{loadingDropDown ? (
							<LoadingState />
						) : (
							<div className={styles.container}>

								<div className={styles.sub_container}>
									<div className={styles.div_container} style={{ width: '400px' }}>
										<div className={styles.label}>COGO Bank</div>
										<div className={styles.value}>
											<RenderTooltip
												content={cogoBankName || 'N/A'}
												maxLength={16}
											/>
										</div>
									</div>
									<div className={styles.div_container} style={{ width: '400px' }}>
										<div className={styles.label}>Bill Number</div>
										<div className={styles.value}>{objectNumber}</div>
									</div>
									<div className={styles.div_container} style={{ width: '450px' }}>
										<div className={styles.label}>UTR/BRN</div>
										<div className={styles.value}>
											<RenderTooltip
												content={transactionRef || 'N/A'}
												maxLength={16}
											/>
										</div>
									</div>
									<div className={styles.div_container} style={{ width: '400px' }}>
										<div className={styles.label}>Payrun Name</div>
										<div className={styles.value}>
											<RenderTooltip content={payrunName || 'N/A'} maxLength={16} />
										</div>
									</div>
									<div className={styles.div_container} style={{ width: '250px' }}>
										<div className={styles.label}>TDS Amount</div>
										<div className={styles.value}>
											{formatAmount({
												amount   : paidTdsAmount,
												currency : objectCurrency,
												options  : {
													style                 : 'currency',
													currencyDisplay       : 'code',
													maximumFractionDigits : 2,
												},
											})}
										</div>
									</div>
									<div className={styles.div_container} style={{ width: '250px' }}>
										<div className={styles.label}>Paid Amount</div>
										<div className={styles.value}>
											{formatAmount({
												amount   : paidAmount,
												currency : objectCurrency,
												options  : {
													style                 : 'currency',
													currencyDisplay       : 'code',
													maximumFractionDigits : 2,
												},
											})}
										</div>
									</div>
									<div className={styles.div_container} style={{ width: '300px' }}>
										<div className={styles.label}> Payment Date</div>
										<div className={styles.value}>
											{formatDate({
												date: paymentDate,
												dateFormat:
													GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
												formatType: 'date',
											})}
										</div>
									</div>

									<div className={styles.ribbons}>
										<div
											className={styles.ribbon}
											style={{ background: transactionType === 'PAYRUN' ? '#dfd9c8' : '#d5ddd6' }}
										>
											{transactionType}

										</div>
									</div>
								</div>
							</div>
						)}
					</div>
				);
			})}
		</div>
	);
}
export default DropDownItem;
