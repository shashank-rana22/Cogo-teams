import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty, startCase } from '@cogoport/utils';

import GetTableValue from './GetTableValue';
import styles from './styles.module.css';

const NUMBERS = {
	ONE     : 1,
	TWO     : 2,
	HUNDRED : 100,
};
const columnTitle = [
	'profitability', 'buy_price', 'sell_price', 'shipping_line_/_airline',
	'service_provider', 'active_booking', 'alloc_ratio', 'fulfill_ratio',
];
const getBackGround = (key) => {
	if (key === 'buy_price') return '#849E4C';
	if (key === 'sell_price') return '#EE3425';
	return '#221f20';
};
const getServiceLabel = ({ service, isHead }) => {
	const Label = service.split('_');
	if (isHead) {
		let columnLabel = '';
		Label.map((item) => {
			columnLabel += `${startCase(item)} `;
			return null;
		});
		return columnLabel;
	}
	return `${startCase(Label[GLOBAL_CONSTANTS.zeroth_index])} ${startCase(Label[NUMBERS.ONE])}`;
};

function ColumnHeader({ list = {}, priceData = {}, supplierPayload = {} }) {
	let showHeader = false;
	Object.keys(supplierPayload).forEach((payload) => {
		if (payload.lenght) {
			showHeader = true;
		}
	});
	return (
		<div>
			{showHeader && (
				<div className={styles.outerContainer}>
					{columnTitle.map((title) => (
						<div key={title} className={styles.title}>
							{getServiceLabel({ service: title, isHead: true })}
						</div>
					))}
				</div>
			)}

			<div className={styles.tableContainer}>
				{Object.keys(list).map((service, index) => {
					const serviceIndex = index;
					return (
						<div key={service} className={styles.tableRow}>
							{Object.keys(list[service]).map((rowData, idx) => (
								<div
									key={rowData}
									style={{ background: serviceIndex % NUMBERS.TWO ? '#f9f9f9' : '#fff' }}
								>
									{!isEmpty(list[service][rowData]) ? (
										<div className={styles.serviceType}>
											{`${getServiceLabel({ service, isHead: false })} - ${(idx + NUMBERS.ONE)}`}
										</div>
									) : null}
									{(list[service][rowData]).map((rowItem, idxx) => (
										<div key={rowItem} className={styles.tableData}>
											<div className={styles.prefTitle}>
												<div>
													Preference :
													{' '}
													{idxx + NUMBERS.ONE}

												</div>
											</div>
											{columnTitle.map((key) => (
												<div
													key={key}
													style={{ color: getBackGround(key) }}
													className={styles.rowBox}
												>
													{GetTableValue({ key, rowItem, priceData, service_id: rowData })}
												</div>
											))}
										</div>
									))}
								</div>
							))}
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default ColumnHeader;
