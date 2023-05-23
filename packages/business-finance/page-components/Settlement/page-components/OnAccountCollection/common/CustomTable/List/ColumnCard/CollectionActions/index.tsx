import { Button, Modal, Popover } from '@cogoport/components';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { useState } from 'react';

import useCollectionActions from '../../../../../../../hooks/useCollectionActions';
import ManualEntry from '../../../../../Header/ManualEntry';

import styles from './styles.module.css';

interface PermissionInterface {
	show?:boolean
	id?:string
	isDelete?:boolean
}

interface CollectionActionInterface {
	itemData?:{
		id?:string
		accMode?:string
		paymentDocumentStatus?:string
		entityType?:number
	}
	refetch?:() => void
}

interface SelectedInterface {
	id?:string
}

const GET_STATUS = ['POSTED', 'APPROVED', 'POSTING_FAILED', 'FINAL_POSTED'];

const GET_ENTITY = [101, 201, 301, 401];

function checkPostedValue(STATUS) {
	const conditionalStatus = ['POSTED', 'FINAL_POSTED'];
	return !conditionalStatus.includes(STATUS);
}

function CollectionActions({ itemData = {}, refetch }:CollectionActionInterface) {
	const [show, setShow] = useState(false);
	const [selectedId, setSelectedId] = useState<SelectedInterface>();
	const [selectedItem, setSelectedItem] = useState();
	const [permissionModal, setPermissionModal] = useState<PermissionInterface>({
		show: false,
	});
	const [modalFinalPost, setModalFinalPost] = useState(false);
	// const { isConditionMatches } = useGetPermission();
	// const isDeleteAllowed = isConditionMatches(
	// 	CC.SEE_DELETE_BUTTON_ON_ACCOUNT,
	// 	'and',
	// );
	const closePermissionModal = () => {
		setPermissionModal({
			show: false,
		});
	};
	const { accMode, paymentDocumentStatus, entityType, id } = itemData || {};

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

	const closePopover = () => {
		setSelectedId('');
		setShow(true);
	};

	const handlePermissionModal = (item, isDelete) => {
		setPermissionModal({
			show : true,
			id   : item.id,
			isDelete,
		});
	};

	const handleFinalPostFromSage = () => {
		finalPostFromSage(id);
	};
	const content = () => (
		<div className={styles.container}>
			{accMode === 'AR' && (
				<>
					<div className={styles.styled_text} role="presentation" onClick={closePopover}>Edit</div>

					<div className={styles.hr} />
				</>
			)}

			<div
				className={styles.styled_text}
				role="presentation"
				onClick={() => handlePermissionModal(itemData, true)}
			>
				Delete
			</div>

			<div className={styles.hr} />

			<div
				className={styles.styled_text}
				role="presentation"
				onClick={() => handlePermissionModal(itemData, false)}
			>
				Approve
			</div>
		</div>
	);
	const contentIsPosted = () => (
		<div className={styles.container}>
			<div
				className={styles.styled_text}
				role="presentation"
				onClick={() => handlePermissionModal(itemData, true)}
			>
				Delete
			</div>
			{GET_ENTITY.includes(entityType) && (
				<>
					<div className={styles.hr} />
					<div
						className={styles.styled_text}
						role="presentation"
						onClick={() => handlePermissionModal(itemData, false)}
					>
						Post
					</div>
				</>
			)}
		</div>
	);

	const { sagePaymentInfo = {}, platformPaymentInfo = {} } = finalSageInfoData || {};

	const {
		sage_payment_num:sagePaymentNum = '',
		platform_payment_num:platformPaymentNumber = '',
		bpr_number:bprNumber = '',
		gl_code:glCode = '',
		currency = '',
		entity_code:entity = '',
		amount = 0,
		sage_status:sageStatus = '',
		organization_name:organizationName = '',
	} = sagePaymentInfo || {};

	const {
		sage_ref_number:sageRefNumber = '',
		organization_name: orgNamePlatform = '',
		payment_num_value:paymentNumValue = '',
		sage_organization_id: bprNumberPlatForm = '',
		acc_code:accCode = '',
		currency: currencyPlatform = '',
		entity_code: entityCodePlateform = '',
		amount: amountPlatform = 0,
		status: statusPlatform = '',
	} = platformPaymentInfo || {};

	const contentIsFinalPosted = () => (
		<div className={styles.final_container}>
			<Button
				themeType="accent"
				onClick={() => {
					finalPostSageInfo();
				}}
				disabled={finalSageInfoDataLoading}
				type="button"
			>
				{paymentDocumentStatus === 'FINAL_POSTED'
					? 'Information'
					: 'Final Post'}
			</Button>
		</div>
	);
	const handleData = (item) => {
		setSelectedId(item?.id);
		setSelectedItem(item);
	};

	const handlePermission = () => {
		entryAction(permissionModal?.id);
	};
	const handlePermissionPostToSage = () => {
		PostToSageAction(permissionModal?.id);
	};

	const loadingText = permissionModal.isDelete ? 'Deleting' : 'Approving';
	const btnText = permissionModal.isDelete ? 'Delete' : 'Approve';

	const isPostToSage = paymentDocumentStatus === 'APPROVED' && !permissionModal.isDelete;

	const checkPosted = GET_STATUS.includes(paymentDocumentStatus);

	const getFinalDetails = [
		{
			id   : 'SAGE',
			name : organizationName,
			sagePaymentNum,
			platformPaymentNumber,
			sageStatus,
			bprNumber,
			currency,
			glCode,
			entity,
			amount,
		},
		{
			id                    : 'Platform',
			name                  : orgNamePlatform,
			sagePaymentNum        : sageRefNumber,
			platformPaymentNumber : paymentNumValue,
			sageStatus            : statusPlatform,
			bprNumber             : bprNumberPlatForm,
			currency              : currencyPlatform,
			glCode                : accCode,
			entity                : entityCodePlateform,
			amount                : amountPlatform,
		},
	];
	const rest = { onClickOutside: () => { setSelectedId(undefined); } };

	return (
		<>
			{paymentDocumentStatus === 'CREATED' && (
				<Popover
					placement="left"
					render={content()}
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
				>
					{/* <ModalFinalPost
						getFinalDetails={getFinalDetails}
						finalPostFromSageLoading={finalPostFromSageLoading}
						handleFinalPostFromSage={handleFinalPostFromSage}
						platformPaymentInfo={platformPaymentInfo}
						paymentDocumentStatus={paymentDocumentStatus}
					/> */}
				</Modal>
			)}

			{checkPosted && (
				<Popover
					placement="left"
					render={
						checkPostedValue(paymentDocumentStatus)
							? contentIsPosted()
							: GET_ENTITY.includes(entityType) && contentIsFinalPosted()
					}
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

			{show && (
				<ManualEntry
					show={show}
					onClose={() => setShow(false)}
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
					<div className={styles.modal_show}>
						<div className={styles.text_value}>
							Are you sure you want to
							{' '}
							{isPostToSage ? 'Post To Sage' : btnText}
							{' '}
							this entry?
						</div>

						<div className={styles.flex_data}>
							<Button
								style={{ marginRight: '10px' }}
								onClick={closePermissionModal}
								disabled={isPostToSage ? postToSageLoading : loading}
								type="button"
								themeType="secondary"
							>
								Cancel
							</Button>
							{isPostToSage ? (
								<Button
									onClick={handlePermissionPostToSage}
									disabled={postToSageLoading}
									type="button"
								>
									Post To Sage
								</Button>
							) : (
								<Button onClick={handlePermission} disabled={loading}>
									{loading ? loadingText : btnText}
								</Button>
							)}
						</div>
					</div>
				</Modal>
			)}
		</>
	);
}

export default CollectionActions;
