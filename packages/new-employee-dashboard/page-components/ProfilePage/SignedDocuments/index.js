import { Button, Modal } from '@cogoport/components';
import FileUploader from '@cogoport/forms/page-components/Business/FileUploader';
import { IcMUpload } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { React } from 'react';

import EmptyState from '../../../common/EmptyState';
import useListEmployeeSignedDocuments from '../../hooks/useListEmployeeSignedDocuments';
import StyledTable from '../../StyledTable';

import getColumns from './getColumns';
import styles from './styles.module.css';
import useUpdateEmployeeSignedDocument from './useUpdateEmployeeSignedDocument';

const onClickViewDocument = ({ url }) => {
	window.open(url || '', '_blank');
};

function SignedDocuments() {
	const { list = [], loading } = useListEmployeeSignedDocuments();

	const {
		btnloading,
		updateEmployeeSignedDocument,
		selectedFile,
		setSelectedFile,
		showUploaderModal,
		setShowUploaderModal,
	} = useUpdateEmployeeSignedDocument();

	const columns = getColumns({ onClickViewDocument, setShowUploaderModal });

	return (
		<div className={styles.container}>
			{!isEmpty(list) || loading
				? <StyledTable columns={columns} data={list} loading={loading} />
				: (
					<EmptyState
						flexDirection="column"
						emptyText="No Signed Document to Review"
						textSize={20}
					/>
				)}

			{showUploaderModal && (
				<Modal
					show={showUploaderModal}
					onClose={() => setShowUploaderModal(null)}
				>
					<Modal.Header title={(<h2>Upload Document</h2>)} />

					<Modal.Body>
						<FileUploader
							value={selectedFile}
							onChange={(val) => setSelectedFile(val)}
							showProgress
							draggable
							uploadDesc="Upload Document"
							uploadIcon={<IcMUpload height={40} width={40} />}
						/>
					</Modal.Body>

					<Modal.Footer>
						<div className={styles.button_container}>
							<Button
								type="button"
								onClick={() => updateEmployeeSignedDocument()}
								loading={btnloading}
							>
								<div className={styles.upload_icon}>
									<IcMUpload height={14} width={14} />
									<span style={{ paddingLeft: 6 }}>
										Upload
									</span>

								</div>
							</Button>

							<Button
								type="button"
								style={{ marginLeft: '12px' }}
								themeType="secondary"
								onClick={() => setShowUploaderModal(false)}
								disabled={btnloading}
							>
								Cancel
							</Button>
						</div>
					</Modal.Footer>

				</Modal>

			)}

		</div>
	);
}

export default SignedDocuments;
