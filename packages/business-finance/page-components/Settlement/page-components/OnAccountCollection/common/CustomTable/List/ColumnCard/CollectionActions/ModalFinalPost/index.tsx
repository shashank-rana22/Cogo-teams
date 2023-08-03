import { Tooltip } from '@cogoport/components';

import { getFinalDetails } from '../collectiveData';

import styles from './styles.module.css';

const CALC_NAME_LEN = 20;
const AMOUNT_LENGTH = 6;

interface ModalFinalInterface {
	sagePaymentInfo?: object
	platformPaymentInfo?:object
}

function ModalFinalPost({
	sagePaymentInfo, platformPaymentInfo,
}:ModalFinalInterface) {
	return (
		<div className={styles.card_style}>
			{(getFinalDetails(sagePaymentInfo, platformPaymentInfo) || []).map((item) => {
				const {
					name = '',
					id = '',
					sagePaymentNum = '',
					platformPaymentNumber = '',
					sageStatus = '',
					bprNumber = '',
					currency: currencyItem = '',
					glCode = '',
					entity = '',
					amount: amountItem = 0,
				} = item || {};

				const showLabelName = id === 'SAGE' ? 'SAGE' : 'Platform';

				const nameLength = name?.length;
				const amountLength = amountItem?.toString().length;

				const getMapData = [
					{ title: 'Sage Payment Number', value: sagePaymentNum || '-' },
					{
						title : 'Platform Payment Number',
						value : platformPaymentNumber || '-',
					},
					{
						title : 'SAGE Status',
						value : sageStatus || '-',
					},
					{
						title : 'BPR Number',
						value : bprNumber || '-',
					},
					{
						title : 'GL Code',
						value : glCode || '-',
					},
					{
						title : 'Entity',
						value : entity || '-',
					},
					{
						title : 'Currency',
						value : currencyItem || '-',
					},
				];

				return (
					<div key={id}>
						<div className={styles.div_value}>
							Payment Details on
							{' '}
							{showLabelName}
						</div>

						<div className={styles.card}>
							<div className={styles.heading}>
								Name
								{nameLength > CALC_NAME_LEN ? (
									<Tooltip
										content={name}
										placement="top"
									>
										<div className={styles.div_bold_wrapper}>{name || '-'}</div>
									</Tooltip>
								) : (
									<div className={styles.div_bold}>{name || '-'}</div>
								)}
							</div>

							{(getMapData || []).map((val) => {
								const { title = '', value = '' } = val || {};
								return (
									<div className={styles.heading} key={title}>
										{title}
										<div className={styles.div_bold}>{value || '-'}</div>
									</div>
								);
							})}

							<div className={styles.heading}>
								Amount
								{amountLength > AMOUNT_LENGTH ? (
									<Tooltip
										content={amountItem.toFixed(2) || '-'}
										placement="top"
									>
										<div className={styles.div_bold_wrapper}>
											{amountItem.toFixed(2) || '-'}
										</div>
									</Tooltip>
								) : (
									<div className={styles.div_bold}>{amountItem.toFixed(2) || '-'}</div>
								)}
							</div>
						</div>
					</div>
				);
			})}

		</div>
	);
}
export default ModalFinalPost;
