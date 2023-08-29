import { Input, Card } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';

import NavBar from './NavBar';
import styles from './styles.module.css';

function AuditHeader({ totalNumberOfInvoices = 0, globalFilters = {}, payrunName = '', setGlobalFilters = () => {} }) {
	return (
		<div>
			<NavBar />

			<div className={styles.container}>
				<div className={styles.data_container}>
					<div className={styles.invoice_data}>
						<Card className={styles.card}>
							Tolerence Level -
							{' '}
							{100}
							%
						</Card>
						<Card className={styles.card}>
							Total No. of Invoices -
							{' '}
							{totalNumberOfInvoices}
						</Card>

						<Card className={styles.card}>
							Sample Size -
							{' '}
							{totalNumberOfInvoices}
							{' '}
							Invoices
						</Card>
					</div>
				</div>

				<div className={styles.payrun_container}>
					<Card className={styles.card}>{payrunName}</Card>

					<Input
						name="search"
						size="sm"
						value={globalFilters?.search || ''}
						onChange={(val) => setGlobalFilters((p) => ({ ...p, search: val, pageIndex: 1 }))}
						placeholder="Search By Invoice Number/SID"
						suffix={(
							<IcMSearchlight
								height={20}
								width={20}
								color="#CACACA"
								className={styles.search_icon}
							/>
						)}
						className={styles.search}
					/>
				</div>
			</div>
		</div>
	);
}

export default AuditHeader;
