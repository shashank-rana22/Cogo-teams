import { Button, Modal, Popover } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { useState } from 'react';

import useCollectionActions from '../../../../../../../hooks/useCollectionActions';
import ManualEntry from '../../../../../Header/ManualEntry';

import { content, contentIsFinalPosted, contentIsPosted } from './collectiveData';
import ModalFinalPost from './ModalFinalPost';
import PostToSageModal from './PostToSageModal';

interface PermissionInterface {
	show?:boolean
	id?:string
	isDelete?:boolean
}

interface CollectionActionInterface {
	itemData?:{
		customerName?:string
		accCode?:string
		bankAccountNumber?:string
		orgSerialId?:string
		bankName?:string
		paymentNumValue?:string
		amount?:string
		utr?:string
		entityType?:string
		currency?:string
		id?:string
		paymentDocumentStatus?:string
		accMode?:string
		paymentCode?:string
		sageOrganizationId?:string
	}
	refetch?:() => void
}

interface SelectedInterface {
	id?:string
}

const GET_STATUS = ['POSTED', 'APPROVED', 'POSTING_FAILED', 'FINAL_POSTED'];

const GET_ENTITY = [];

Object.keys(GLOBAL_CONSTANTS.cogoport_entities).slice(0, -1).forEach((i) => { GET_ENTITY.push(Number(i)); });

function checkPostedValue(STATUS) {
	const CONDITIONAL_STATUS = ['POSTED', 'FINAL_POSTED'];
	return !CONDITIONAL_STATUS.includes(STATUS);
}

function CollectionActions({ itemData = {}, refetch }:CollectionActionInterface) {
	const [show, setShow] = useState(false);
	const [selectedId, setSelectedId] = useState<SelectedInterface>();
	const [selectedItem, setSelectedItem] = useState();
	const [permissionModal, setPermissionModal] = useState<PermissionInterface>({
		show: false,
	});
	const [modalFinalPost, setModalFinalPost] = useState(false);

	const closePermissionModal = () => {
		setPermissionModal({
			show: false,
		});
	};

	const {
		entryAction,
		loading,
		finalPostSageInfo,
		finalSageInfoData,
		finalSageInfoDataLoading,
		finalPostFromSage,
		finalPostFromSageLoading,
		PostToSageAction,
		postToSageLoading,
	} = useCollectionActions({
		closePermissionModal,
		permissionModal,
		refetch,
		itemData,
		setSelectedId,
		setModalFinalPost,
	});

	const { accMode, paymentDocumentStatus, entityType, id } = itemData || {};

	const closePopover = () => {
		setSelectedId(undefined);
		setShow(true);
	};

	const handlePermissionModal = (item, isDelete) => {
		setSelectedId(undefined);
		setPermissionModal({
			show : true,
			id   : item.id,
			isDelete,
		});
	};

	const handleFinalPostFromSage = () => {
		finalPostFromSage(id);
	};

	const { sagePaymentInfo = {}, platformPaymentInfo = {} } = finalSageInfoData || {};

	const handleData = (item) => {
		setSelectedId(item?.id);
		setSelectedItem(item);
	};

	const checkPosted = GET_STATUS.includes(paymentDocumentStatus);

	const rest = { onClickOutside: () => { setSelectedId(undefined); } };

	return (
		<>
			{paymentDocumentStatus === 'CREATED' && (
				<Popover
					placement="left"
					render={content(accMode, itemData, handlePermissionModal, closePopover)}
					visible={selectedId === id}
					{...rest}
				>
					<div>
						<IcMOverflowDot
							onClick={() => handleData(itemData)}
							style={{ cursor: 'pointer', width: 24, height: 24 }}
						/>
					</div>
				</Popover>
			)}

			{modalFinalPost && (
				<Modal
					show={modalFinalPost}
					onClose={() => {
						setModalFinalPost(false);
					}}
					size="xl"
				>
					<Modal.Header title="Final Post To SAGE" />
					<ModalFinalPost sagePaymentInfo={sagePaymentInfo} platformPaymentInfo={platformPaymentInfo} />
					<Modal.Footer>
						{paymentDocumentStatus !== 'FINAL_POSTED' ? (
							<Button
								disabled={finalPostFromSageLoading}
								onClick={handleFinalPostFromSage}
								type="button"
							>
								Post Payment To SAGE
							</Button>

						) : null}

					</Modal.Footer>
				</Modal>
			)}

			{checkPosted && (
				<Popover
					placement="left"
					visible={selectedId === id}
					render={
						checkPostedValue(paymentDocumentStatus)
							? contentIsPosted(GET_ENTITY, itemData, handlePermissionModal, entityType)
							: GET_ENTITY.includes(entityType)
							&& contentIsFinalPosted(finalPostSageInfo, finalSageInfoDataLoading, paymentDocumentStatus)
					}
					{...rest}
				>
					<div>
						<IcMOverflowDot
							onClick={() => handleData(itemData)}
							style={{ cursor: 'pointer', width: 24, height: 24 }}
						/>
					</div>
				</Popover>
			)}

			{show && (
				<ManualEntry
					show={show}
					setShow={setShow}
					isEdit
					selectedItem={selectedItem}
					refetch={refetch}
					itemData={itemData}
				/>
			)}

			{permissionModal.show && (
				<Modal
					show={permissionModal.show}
					onClose={closePermissionModal}
				>
					<PostToSageModal
						entryAction={entryAction}
						PostToSageAction={PostToSageAction}
						permissionModal={permissionModal}
						paymentDocumentStatus={paymentDocumentStatus}
						closePermissionModal={closePermissionModal}
						postToSageLoading={postToSageLoading}
						loading={loading}
					/>
				</Modal>
			)}
		</>
	);
}

export default CollectionActions;
