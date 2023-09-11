import React from 'react';

import StyledTable from '../../../common/StyledTable';
import { getTablesData } from '../../../utils/constants';
import { otherDocumentsInfo } from '../../../utils/otherInfo';
import RightGlance from '../RightGlance';

import styles from './styles.module.css';
import useGetColumns from './useGetColumns';

function Documents({ data: employeeData = {} }) {
	const columns = useGetColumns();

	const { signed_documents, other_documents } = employeeData;
	const tablesData = getTablesData(signed_documents, other_documents);

	const otherInfo = otherDocumentsInfo;

	return (
		<div className={styles.tab_content}>
			<div className={styles.main_container}>
				<div className={styles.heading}>
					<span className={styles.personal}>EMPLOYMENT DETAILS</span>
					<span className={styles.detail}>View and manage employee details</span>
				</div>
				{tablesData.map(
					({ heading, data }) => (
						<div className={styles.info_subcontainer} key={heading}>
							<span className={styles.info_heading}>{heading}</span>
							<StyledTable columns={columns} data={data} className="salary_table" />
						</div>
					),
				)}
			</div>
			<RightGlance otherInfo={otherInfo} data={employeeData} />
		</div>
	);
}

export default Documents;
