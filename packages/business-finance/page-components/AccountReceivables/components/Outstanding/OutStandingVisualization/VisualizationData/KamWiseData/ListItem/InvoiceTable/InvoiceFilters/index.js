import { Input, Select } from '@cogoport/components';
import { IcMCross, IcMSearchdark } from '@cogoport/icons-react';

import { STATUS_OPTIONS } from '../../../../../../../../constants/account-type';

import styles from './styles.module.css';

function InvoiceFilters({
	setSearchQuery = () => {},
	searchQuery = '',
	setParams = () => {},
	params = {},
	setInvoiceStatus = () => {},
	invoiceStatus = '',
}) {
	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<Select
					placeholder="Select Status"
					options={STATUS_OPTIONS}
					size="sm"
					value={invoiceStatus}
					multiple
					onChange={(e) => {
						setParams({ ...params, page: 1 });
						setInvoiceStatus(e);
					}}
				/>
			</div>
			<div className={styles.flex}>
				<Input
					prefix={<IcMSearchdark size={1} />}
					suffix={(
						<IcMCross
							onClick={() => {
								setSearchQuery('');
								setParams({ ...params, page: 1 });
							}}
							size={1}
							cursor="pointer"
							style={{ marginRight: '4px' }}
						/>
					)}
					onChange={(e) => {
						setParams({ ...params, page: 1 });
						setSearchQuery(e);
					}}
					value={searchQuery}
					placeholder="Search by Invoice Number"
					type="text"
					size="sm"
				/>
			</div>
		</div>
	);
}

export default InvoiceFilters;
