import { useSelector } from '@cogoport/store';
import { startCase } from '@cogoport/utils';

import { formatDate } from '../../../../../commons/utils/formatDate';

import styles from './styles.module.css';

interface Data {
	vendorName?:string,
	expenseCategory?:string,
	payableAmount?:number | string,
	currency?:string,
	invoiceCurrency?:string,
	invoiceDate?: Date,
	stakeholderName?:string,
}
interface Props {
	text?:string,
	isBody?:boolean,
	mailData?:Data,
}

function Details({
	text = '',
	isBody = false,
	mailData = {},
}:Props) {
	const {
		vendorName = '',
		expenseCategory = '',
		payableAmount,
		currency,
		invoiceCurrency,
		invoiceDate,
		stakeholderName,
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
					{vendorName || '-'}
				</div>
				<div>
					Category:
					{' '}
					{startCase(expenseCategory)}
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
					{currency || invoiceCurrency || ''}
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
