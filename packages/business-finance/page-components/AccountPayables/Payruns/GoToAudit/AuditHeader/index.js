import { Input, Card } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';

import NavBar from './NavBar';
import styles from './styles.module.css';

function AuditHeader({ totalNumberOfInvoices = 0, globalFilters = {}, payrunName = '', setGlobalFilters = () => {} }) {
	return (
		<>
			<NavBar />

			<div className={styles.container}>
				<div className={styles.data_container}>
					<Card className={styles.card}>
						Tolerence Level - 100%
					</Card>
					<Card className={styles.card}>
						{`Total No. of Invoices - ${totalNumberOfInvoices}`}
					</Card>

					<Card className={styles.card}>
						{`Sample Size -	${totalNumberOfInvoices} Invoices`}
					</Card>
				</div>

				<div className={styles.payrun_container}>
					<Card className={styles.card}>
						<div className={styles.payrun_div}>
							<span className={styles.payrun_name}>PayRun Name :</span>
							<span className={styles.name_container}>{payrunName}</span>
						</div>
					</Card>

					<Input
						name="search"
						size="sm"
						value={globalFilters?.search || ''}
						onChange={(val) => setGlobalFilters((prev) => ({ ...prev, search: val, pageIndex: 1 }))}
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
		</>
	);
}

export default AuditHeader;
