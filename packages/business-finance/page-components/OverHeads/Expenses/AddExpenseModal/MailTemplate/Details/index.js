import { useSelector } from '@cogoport/store';
import { startCase } from '@cogoport/utils';

import { formatDate } from '../../../../../commons/utils/formatDate';

import styles from './styles.module.css';

function Details({
	text = '',
	isBody = false,
	mailData = {},
	vendorName,
	category,
}) {
	const {
		payableAmount,
		invoiceDate,
		stakeholderName,
		invoiceCurrency,
		currency,
	} = mailData || {};

	const profileData = useSelector(({ profile }) => profile);
	const userName = profileData?.user.name;

	if (!isBody) {
		return <div className={styles.section}>{text}</div>;
	}

	return (
		<div className={styles.section}>
			<div>
				Hi
				{' '}
				{stakeholderName || '-'}
				,
			</div>

			<div className={styles.textarea}>
				A new expense approval request has been placed for your response.
				Please find the attached invoice for the same.
			</div>

			<div>
				<div>
					Vendor Name:
					{' '}
					{vendorName}
				</div>
				<div>
					Category:
					{' '}
					{startCase(category || '')}
				</div>
				<div>
					Expense date:
					{' '}
					{invoiceDate
						? formatDate(invoiceDate, 'dd/MMM/yy', {}, false) : '-'}
				</div>
				<div>
					Payable Amount:
					{' '}
					{invoiceCurrency || currency || ''}
					{' '}
					{payableAmount || '-'}
				</div>
				<div>
					Requested By:
					{' '}
					{userName}
				</div>
				<div>
					Your Response:
					{' '}
					&nbsp;
					{' '}
					<span style={{ color: 'green' }}>Approve</span>
					&nbsp; &nbsp; &nbsp; &nbsp;
					<span style={{ color: '#EE3425' }}>Reject</span>
				</div>
			</div>

			<div>
				<div>Thank you,</div>
				<div>Cogoport Finance Team</div>
				<div>(finance@cogoport.com)</div>
			</div>
		</div>
	);
}

export default Details;
