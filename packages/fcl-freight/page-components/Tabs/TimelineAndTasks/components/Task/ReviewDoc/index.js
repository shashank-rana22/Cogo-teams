/* eslint-disable react/no-unknown-property */
import React, { useState } from 'react';
import { Button, TextArea, toast } from '@cogoport/front/components/admin';
import { startCase } from '@cogoport/front/utils';
import formatDate from '@cogo/globalization/utils/formatDate';
import GLOBAL_CONSTANTS from '@cogo/globalization/constants/globals.json';
import updateShipmentDocument from '../../../hooks/useUpdateShipmentDocument';
import useGetPreRequirements from '../../../hooks/useGetPreRequirements';
import {
	Container,
	DisplayDetails,
	SubHeading,
	SubDetail,
	SubHalfDetail,
	FileView,
	ActionButtons,
	Remark,
	Row,
} from './styles';
import ConfirmationModal from './ConfirmationModal';

const incoTermMapping = {
	cif: 'export',
	cfr: 'export',
	cpt: 'export',
	cip: 'export',
	dat: 'export',
	dap: 'export',
	ddp: 'export',
	fob: 'import',
	exw: 'import',
	fca: 'import',
	fas: 'import',
};

export function Form({
	task,
	shipment_data,
	refetch = () => {},
	onClose = () => {},
}) {
	const { shipment_type = '', inco_term = '' } = shipment_data;

	const { doc_data } = useGetPreRequirements('/list_shipment_documents', {
		filters: { shipment_id: task.shipment_id, id: task.task_field_id },
		performed_by_org_id: task.organization_id,
		service_type: shipment_data.service_type,
	});

	const description = doc_data?.data
		? JSON.parse(doc_data?.data)?.description
		: undefined;

	const [approvalState, setApprovalState] = useState(null);
	const [remarkValue, setRemarkValue] = useState('');
	const [confirmationApproval, setConfirmationApproval] = useState(false);

	const { updateDocument, loading } = updateShipmentDocument({
		remarkValue,
		task,
		doc_data,
		refetch,
		onClose,
	});

	const handleApprove = async () => {
		await updateDocument('document_accepted');
	};

	const handleAmmend = () => {
		setApprovalState({ ammend: true });
	};

	const handleSubmit = async () => {
		if (approvalState?.ammend) {
			if (!remarkValue) {
				toast.error('Please provide amendment reason');
			}
			await updateDocument('document_amendment_requested');
		} else {
			await updateDocument('document_accepted');
		}
	};

	const isLTL = shipment_type === 'ltl_freight';
	const documentUrlData =
		isLTL && doc_data?.data ? JSON.parse(doc_data?.data) : {};

	return (
		<Container>
			<DisplayDetails>
				<SubHalfDetail>
					<Row>
						<SubHeading>Document Type : </SubHeading>
						<SubDetail>{startCase(doc_data.document_type)}</SubDetail>
					</Row>
					<Row>
						<SubHeading>Document State : </SubHeading>
						<SubDetail>{startCase(doc_data.state)}</SubDetail>
					</Row>
				</SubHalfDetail>
				<SubHalfDetail>
					<Row>
						<SubHeading>Uploaded At : </SubHeading>
						<SubDetail>
							{formatDate({
								date: doc_data.Uploaded_at,
								dateFormat: GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
								formatType: 'date',
							})}
						</SubDetail>
					</Row>
					<Row>
						<SubHeading>Uploaded By :</SubHeading>
						<SubDetail>
							{startCase(doc_data.uploaded_by_org?.business_name)}
						</SubDetail>
					</Row>
				</SubHalfDetail>
				{description && shipment_type === 'air_freight' && (
					<SubHalfDetail>
						<SubHeading>Remarks : </SubHeading>
						<SubDetail>{description}</SubDetail>
					</SubHalfDetail>
				)}
				{isLTL ? (
					<div>
						<SubHalfDetail>
							<Row>
								<SubHeading>Amount :</SubHeading>
								<SubDetail>
									{`${documentUrlData?.currency || ''} ${
										documentUrlData?.price || ''
									}`}
								</SubDetail>
							</Row>
							<Row>
								<SubHeading>Invoice Number :</SubHeading>
								<SubDetail>{documentUrlData?.invoice_number || ''}</SubDetail>
							</Row>
						</SubHalfDetail>
						<SubHalfDetail>
							<Row>
								<SubHeading>Payment Reference Number :</SubHeading>
								<SubDetail>
									{documentUrlData?.payment_reference_number || ''}
								</SubDetail>
							</Row>
						</SubHalfDetail>
					</div>
				) : null}
			</DisplayDetails>
			{!approvalState ? (
				<FileView>
					<object
						title="review_file"
						data={doc_data.document_url}
						width="100%"
						type="application/pdf"
						allowFullScreen
					/>
				</FileView>
			) : null}
			{approvalState?.ammend ? (
				<Remark>
					<SubHeading>Please specify the reason for this </SubHeading>
					<TextArea
						className="remark_text"
						value={remarkValue}
						onChange={(e) => setRemarkValue(e?.target?.value)}
						placeholder="Type Remarks"
					/>
				</Remark>
			) : null}
			{!approvalState ? (
				<ActionButtons>
					<Button
						onClick={handleAmmend}
						className="secondary md"
						disabled={loading}
					>
						Amend
					</Button>
					{shipment_type === 'air_freight' &&
					incoTermMapping[inco_term] === 'import' ? (
						<Button onClick={() => setConfirmationApproval(true)}>
							Approve
						</Button>
					) : (
						<Button onClick={handleApprove} disabled={loading}>
							Approve
						</Button>
					)}
				</ActionButtons>
			) : (
				<ActionButtons>
					<Button
						onClick={() => {
							onClose();
						}}
						className="secondary md"
						disabled={loading}
					>
						Cancel
					</Button>
					<Button onClick={handleSubmit} disabled={loading}>
						Submit
					</Button>
				</ActionButtons>
			)}
			{confirmationApproval && (
				<ConfirmationModal
					confirmationApproval={confirmationApproval}
					setConfirmationApproval={setConfirmationApproval}
					updateDocument={updateDocument}
					loading={loading}
				/>
			)}
		</Container>
	);
}

export default Form;
