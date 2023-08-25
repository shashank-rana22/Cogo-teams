// import { Card, Input } from '@cogoport/components';
// import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
// import { useSelector } from '@cogoport/store';
import { useState } from 'react';

// import Item from '../../../commons/Layout/Item';
import List from '../../../commons/List/index.tsx';
// import { AUDIT_CONFIG, AUDIT_DATA } from '../columns/auditConfig';
import useGetAudit from '../hooks/useGetAudit';

import AuditHeader from './AuditHeader';
// import FooterCard from './FooterCard';
import renderFunction from './renderFunction';
// import Header from './Header';
import styles from './styles.module.css';

function GoToAudit() {
	// const { push } = useRouter();
	// const { general } = useSelector((state) => state);
	// const partner_ids = general?.query?.partner_id;

	// const country = getKeyByValue(
	// 	GLOBAL_CONSTANTS.country_entity_ids,
	// 	partner_ids,
	// );
	// const contextCountry = useMemo(() => ({ country }), [country]);
	const [remarks, setRemarks] = useState({});
	const {
		loading,
		auditData,
		config,
		setGlobalFilters,
		globalFilters,
		updateInvoice,
		updateLoading,
	} = useGetAudit();

	const { totalNumberOfInvoices = 0 } = auditData || {};
	const FIRST_PAGE = 1;

	const onClick = (type, value, invoice_id) => {
		updateInvoice(type, value, invoice_id);
	};

	const { functions } = renderFunction({ remarks, updateLoading, setRemarks, onClick });

	return (
		<div>
			<AuditHeader
				totalNumberOfInvoices={totalNumberOfInvoices}
				globalFilters={globalFilters}
				setGlobalFilters={setGlobalFilters}
			/>
			{/* <FooterCard /> */}
			<div className={styles.list_container}>
				<List
					itemData={auditData}
					loading={loading}
					config={config}
					functions={functions}
					setGlobalFilters={setGlobalFilters}
					rowStyle="border"
					showPagination
					pageSize={10}
					paginationType="number"
					page={globalFilters?.pageIndex || FIRST_PAGE}
					handlePageChange={(val) => setGlobalFilters((prev) => ({
						...prev,
						pageIndex: val,
					}))}
				/>

			</div>
			{/* <AcceptAudit
				item={AUDIT_DATA.list[0]}
				remarks={remarks}
				onClick={onClick}
				updateLoading={updateLoading}
			/> */}
			{/* <div>
				<BankPair itemData={AUDIT_DATA.list[GLOBAL_CONSTANTS.zeroth_index]} />
				<AcceptAudit
					item={AUDIT_DATA.list[GLOBAL_CONSTANTS.zeroth_index]}
					remarks={remarks}
					updateInvoice={updateInvoice}
				/>
				<InvoiceDetailsTimeLine item={AUDIT_DATA.list[GLOBAL_CONSTANTS.zeroth_index]} />
				<AuditRemarks
					item={AUDIT_DATA.list[GLOBAL_CONSTANTS.zeroth_index]}
					remarks={remarks}
					setRemarks={setRemarks}
				/>
			</div> */}

		</div>
	);
}
export default GoToAudit;
