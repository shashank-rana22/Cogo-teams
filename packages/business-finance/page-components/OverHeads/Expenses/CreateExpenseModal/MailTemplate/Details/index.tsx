import { Textarea } from '@cogoport/components';
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
	setMailData?:(p:object)=>void,
}

function Details({
	text = '',
	isBody = false,
	mailData = {},
	setMailData = () => {},
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
				<Textarea
					className={styles.text}
					name="bodyText"
					size="md"
					placeholder="Type here..."
					onChange={(e:string) => setMailData({
						...mailData,
						mailText: e,
					})}
				/>
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
					<span style={{ color: 'red' }}>Reject</span>
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
