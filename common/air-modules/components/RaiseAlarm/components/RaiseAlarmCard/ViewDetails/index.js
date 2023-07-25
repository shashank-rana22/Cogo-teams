import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase, isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function ModalContent({ content = {} }) {
	const { alarm_reason } = content || {};
	const contents = [
		{
			label : 'Fraud Reason :',
			value : alarm_reason?.fraud_reason?.split('-')[GLOBAL_CONSTANTS.zeroth_index],
		},
		{ label: 'Source :', value: alarm_reason?.source },
		{ label: 'Detailed Explanation :', value: alarm_reason?.detailed_explain },
		{ label: 'Name of the yard :', value: alarm_reason?.name_of_yard },
		{ label: 'Delayed document :', value: alarm_reason?.air_import },
		{ label: 'Delayed document :', value: alarm_reason?.air_export },
		{ label: 'Delayed document :', value: alarm_reason?.customs },
		{
			label: `Is it escalated to ${
				alarm_reason?.supplier ? 'supply' : 'sales'
			}? :`,
			value: alarm_reason?.escalated_to_sales,
		},
		{ label: 'Cargo Value :', value: alarm_reason?.value_of_cargo },
		{ label: 'Proof :', value: alarm_reason?.proof_url?.url },
	];

	const handleValue = (item) => {
		if (item.label === 'Proof :') {
			return (
				<a href={alarm_reason?.proof_url?.url} target="_blank" rel="noreferrer">
					View Proof
				</a>
			);
		}

		if (item.label === 'Delayed document :') {
			return startCase(item?.value).toUpperCase();
		}

		return startCase(item?.value);
	};

	return (
		<div className={styles.content}>
			{contents?.map((item) => {
				if (!isEmpty(item?.value)) {
					return (
						<div className={styles.field} key={item.label}>
							<span className={styles.bold}>{item.label}</span>
							{handleValue(item)}
						</div>
					);
				}
				return undefined;
			})}
		</div>
	);
}

export default ModalContent;
