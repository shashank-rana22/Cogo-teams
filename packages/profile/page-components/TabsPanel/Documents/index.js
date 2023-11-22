import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React, { useState } from 'react';

import PopupModal from '../../../common/Modal';
import StyledTable from '../../../common/StyledTable';
import { getTablesData } from '../../../utils/constants';
import { otherDocumentsInfo } from '../../../utils/otherInfo';
import RightGlance from '../RightGlance';

import AddUploadModal from './AddUploadModal';
import styles from './styles.module.css';
import UploadModal from './UploadModal';
import useGetColumns from './useGetColumns';
import useGetSignedDocuments from './useGetSignedDocuments';

function Documents({ data: employeeData = {}, getEmployeeDetails }) {
	const [show, setShow] = useState(false);
	const [showAddUploadModal, setShowAddUploadModal] = useState(false);
	const [name, setName] = useState('');
	const [url, setUrl] = useState('');
	const [uploadShow, setUploadShow] = useState(false);
	const [docno, setdocno] = useState(null);
	const [documentUrl, setDocumentUrl] = useState('');
	const [flagUpload, setFlagUpload] = useState(true);
	const { signed_documents, other_documents, user_role, employee_detail } = employeeData;
	const { id:employee_detail_id } = employee_detail || {};
	const columns = useGetColumns({
		setShow, setName, setUrl, setdocno, setUploadShow, setDocumentUrl, user_role,
	});
	const signedColumns = useGetSignedDocuments({
		setShow,
		setName,
		setUrl,
		setdocno,
		setUploadShow,
		setDocumentUrl,
		user_role,
	});

	const handleModal = () => {
		setUploadShow(false);
	};
	const tablesData = getTablesData(
		signed_documents,
		other_documents,
		showAddUploadModal,
		setShowAddUploadModal,
		flagUpload,
	);
	const otherInfo = otherDocumentsInfo;

	return (
		<div className={styles.tab_content}>
			<div className={styles.main_container}>
				<div className={styles.heading}>
					<span className={styles.personal}>EMPLOYMENT DETAILS</span>
					<span className={styles.detail}>View and manage employee details</span>
				</div>
				<div className={styles.info_subcontainer} key={tablesData?.[GLOBAL_CONSTANTS.zeroth_index]?.heading}>
					<span className={styles.info_heading}>{tablesData?.[GLOBAL_CONSTANTS.zeroth_index]?.heading}</span>
					<StyledTable
						columns={signedColumns}
						data={tablesData?.[GLOBAL_CONSTANTS.zeroth_index]?.data}
						className="salary_table"
					/>
					<PopupModal show={show} onClose={() => setShow(false)} name={name} url={url} key={name} />
				</div>

				<div className={styles.info_subcontainer} key={tablesData?.[GLOBAL_CONSTANTS.one]?.heading}>
					<span className={styles.info_heading}>{tablesData?.[GLOBAL_CONSTANTS.one]?.heading}</span>
					<StyledTable
						columns={columns}
						data={tablesData?.[GLOBAL_CONSTANTS.one]?.data}
						className="salary_table"
					/>
					<PopupModal show={show} onClose={() => setShow(false)} name={name} url={url} key={name} />
					<UploadModal
						show={uploadShow}
						handleModal={handleModal}
						docno={tablesData[1]?.data.find((doc) => doc.name === name)?.number}
						documentUrl={documentUrl}
						name={name}
						getEmployeeDetails={getEmployeeDetails}
						notrequired={docno}
					/>
					<AddUploadModal
						showAddUploadModal={showAddUploadModal}
						setShowAddUploadModal={setShowAddUploadModal}
						name={name}
						employee_detail_id={employee_detail_id}
						getEmployeeDetails={getEmployeeDetails}
						other_documents={other_documents}
						flagUpload={flagUpload}
						setFlagUpload={setFlagUpload}
					/>
				</div>
			</div>
			<RightGlance otherInfo={otherInfo} data={employeeData} />
		</div>
	);
}

export default Documents;
