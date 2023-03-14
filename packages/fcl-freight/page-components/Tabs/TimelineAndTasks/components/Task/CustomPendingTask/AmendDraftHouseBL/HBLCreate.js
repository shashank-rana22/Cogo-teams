import { TradeDocTemplate } from '@cogo/business-modules/components/trade-documents';
import { Button, Flex, FullscreenModal, Text } from '@cogo/commons/components';
import { forwardRef, useRef, useState } from 'react';
import Form from './UploadHbl/form';

const HBLCreate = ({
	onSave = () => {},
	hblData,
	shipmentHblDoc,
	isHBLUploaded,
	handleUploadHBL,
	hblUploadData,
}) => {
	const [show, setShow] = useState(false);
	const ref = useRef();
	const templateInitialValues = { ...hblData };
	const handleSave = () => {
		ref.current.submit().then(onSave);
		setShow(false);
	};
	return (
		<div>
			{isHBLUploaded ? (
				<>
					<Flex display="block">
						<Text marginBottom={8}>
							Click on the following button to amend the existing HBL
						</Text>
						<Button
							ghost={!!hblData}
							onClick={() => setShow(true)}
							size="sm"
							id="bm_pt_draft_hbl_edit_upload_btn"
						>
							{isHBLUploaded ? 'Edit' : 'Upload'} Draft BL
						</Button>
					</Flex>
					<FullscreenModal
						heading="Amend Draft BL"
						headerActions={
							<>
								<Button
									style={{ marginLeft: 8 }}
									onClick={handleSave}
									size="sm"
									id="bm_pt_draft_hbl_amend_save_btn"
								>
									Save
								</Button>
							</>
						}
						show={show}
						setShow={setShow}
					>
						<Flex
							style={{ overflow: 'auto' }}
							bgColor="#E0E0E0"
							padding={16}
							justifyContent="center"
						>
							<TradeDocTemplate
								ref={ref}
								mode="write"
								documentType="bluetide_hbl"
								initialValues={templateInitialValues}
							/>
						</Flex>
					</FullscreenModal>
				</>
			) : (
				<>
					<Button
						ghost
						id="bm_pt_draft_hbl_amend_view_doc_btn"
						size="sm"
						onClick={() => {
							window.open(
								hblUploadData
									? hblUploadData?.url?.url
									: shipmentHblDoc?.document_url,
								'_blank',
							);
						}}
					>
						View Document
					</Button>
					{!hblUploadData && (
						<Form
							shipmentHblDoc={shipmentHblDoc}
							handleUploadHBL={handleUploadHBL}
						/>
					)}
				</>
			)}
		</div>
	);
};

export default forwardRef(HBLCreate);
