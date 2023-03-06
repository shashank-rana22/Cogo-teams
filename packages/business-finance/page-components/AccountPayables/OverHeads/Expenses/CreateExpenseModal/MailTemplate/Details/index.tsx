import { Textarea } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import { formatDate } from '../../../../../../commons/utils/formatDate';

import styles from './styles.module.css';

interface Data {
	vendorName?:string,
	expenseCategory?:string,
	totalPayable?:number | string,
	invoiceDate?: Date
}
interface Props {
	text?:string,
	isBody?:boolean,
	nonRecurringData?:Data,
	setNonRecurringData?:(p:object)=>void,
}

function Details({
	text = '',
	isBody = false,
	nonRecurringData = {},
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	setNonRecurringData = (p:object) => {},
}:Props) {
	const { vendorName = '', expenseCategory = '', totalPayable, invoiceDate } = nonRecurringData || {};

	if (!isBody) {
		return <div className={styles.section}>{text}</div>;
	}
	return (
		<div className={styles.section}>
			<div>Hi Zubin Khanna,</div>

			<div className={styles.textarea}>
				<Textarea
					className={styles.text}
					name="bodyText"
					size="md"
					placeholder="Type here..."
					onChange={(e:string) => setNonRecurringData({
						...nonRecurringData,
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
						? formatDate(invoiceDate, 'dd/MMM/yy', {}, false) : 'N/A'}
				</div>
				<div>
					Payable Amount:
					{' '}
					{totalPayable || 'N/A'}
				</div>
				<div>Requested By:</div>
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
