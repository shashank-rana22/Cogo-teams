import { Button, Placeholder, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMDelete } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect, useCallback } from 'react';

import List from '../../../../commons/List/index';
import useDeletePayrunInvoice from '../../hooks/useDeletePayrunInvoice';
import useDeleteTaggedDocuments from '../../hooks/useDeleteTaggedDocuments';
import useListTaggedInvoice from '../../hooks/useListTaggedInvoice';
import useMergedPdf from '../../hooks/useMergedPdf';
import OVERSEAS_FINAL_CONFIRMATION_LIST from '../Configurations/overseasFinalConfirmationListConfig.json';
import GetData from '../utils/GetData';
import GetInvoiceData from '../utils/GetInvoiceData';

import ConfirmationModal from './ConfirmationModal/index';
import styles from './styles.module.css';

const FIRST_PAGE = 1;
const TOOLTIP_SHOW_CONDITION = 15;
const SUBSTRING_CONDITON_MAX = 15;
const SUBSTRING_CONDITON_MIN = 0;
const TAGGED_DOC_CONDITION = 4;

function MergeDocuments({ setActive = () => {}, allowed = true, setAllowed = () => {}, setBLData = () => {} }) {
	const [showConfirmationModal, setShowConfirmationModal] = useState(false);
	const [selectBankShow, setSelectBankShow] = useState(false);

	const {
		data = {},
		loadingList = false,
		setParams = () => {},
		params = {},
		generateInvoice = () => {},
	} = useListTaggedInvoice();

	const { deleteInvoices = () => {} } = useDeletePayrunInvoice({ generateInvoice });
	const { deleteTaggedDocuments = () => {} } = useDeleteTaggedDocuments({ generateInvoice });
	const { loadingMerged = false, mergeInvoices = () => {} } = useMergedPdf({ generateInvoice });

	const { documents = {}, list = [] } = data || {};

	const checkShipmentPdfUrl = !!documents?.shipmentPdfUrl;
	const billPdfUrl = !!documents?.billPdfUrl;

	const getDate = (date) => formatDate({
		date,
		dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
		formatType : 'date',
	});

	const handleDelete = (itemData) => {
		deleteInvoices(itemData?.id);
	};

	const handelMergeInvoices = () => {
		setShowConfirmationModal(false);
		mergeInvoices();
	};

	const changeBlData = useCallback(() => {
		if (!isEmpty(data)) {
			setBLData(data);
		}
	}, [data, setBLData]);

	useEffect(() => {
		changeBlData();
	}, [changeBlData]);

	const allowedCheck = useCallback(() => {
		const isTagged = checkShipmentPdfUrl && billPdfUrl;
		setSelectBankShow(isTagged);
		setAllowed(!isTagged);
	}, [checkShipmentPdfUrl, billPdfUrl, setAllowed]);

	useEffect(() => {
		allowedCheck();
	}, [allowedCheck]);

	const FUNCTIONS = {
		renderTrashInvoice: (itemData) => {
			if (!selectBankShow) {
				return (
					<IcMDelete
						width={16}
						height={16}
						onClick={() => handleDelete(itemData)}
						className={styles.trash_invoice}
					/>
				);
			}
			return null;
		},

		renderTaggedDocument: (itemData) => {
			const { taggedDocuments = '' } = itemData || {};
			const value = taggedDocuments?.split('/')[TAGGED_DOC_CONDITION]?.replaceAll('%20', '');
			return (
				<Button
					themeType="linkUi"
					onClick={() => window.open(itemData?.taggedDocuments, '_blank')}
				>
					{value?.length > TOOLTIP_SHOW_CONDITION ? (
						<Tooltip interactive theme="light" placement="top" content={value}>
							<div
								className={styles.text_dev}
							>
								{`${value.substring(SUBSTRING_CONDITON_MIN, SUBSTRING_CONDITON_MAX)}...`}
							</div>
						</Tooltip>
					) : (
						<div className={styles.text_dev}>{value}</div>
					)}
				</Button>
			);
		},
	};

	const documentsList = [
		{
			docName        : 'Purchase Invoices',
			documentUrl    : documents?.billPdfUrl || '',
			uploadedAt     : documents?.createdAt,
			showDeleteIcon : true,
		},
		{
			docName        : 'Shipment Documents',
			documentUrl    : documents?.shipmentPdfUrl || '',
			uploadedAt     : documents?.createdAt,
			showDeleteIcon : true,
		},
	];

	return (
		<>
			<div className={styles.container}>

				<div className={styles.left}>
					<div className={styles.header}>
						Invoice - BL Tagging
						<div className={styles.dash} />
					</div>

					<div className={styles.list_container}>
						<List
							itemData={data}
							loading={loadingList}
							config={OVERSEAS_FINAL_CONFIRMATION_LIST}
							functions={FUNCTIONS}
							page={params?.pageIndex || FIRST_PAGE}
							pageSize={10}
							handlePageChange={(val) => setParams({
								...params,
								pageIndex: val,
							})}
							rowStyle="border"
							showPagination
							paginationType="number"
						/>
					</div>

					<div className={styles.merge_btn_container}>

						{loadingMerged || loadingList ? (
							<div className={styles.skeleton}>
								<Placeholder width="80%" height="35px" />
							</div>
						) : (
							<GetInvoiceData
								selectBankShow={selectBankShow}
								setShowConfirmationModal={setShowConfirmationModal}
								list={list}
							/>
						)}
					</div>
				</div>

				<div className={styles.right}>
					<div className={styles.header}>
						<div>
							Merged Documents
							<div className={styles.dash} />
						</div>
						<div>
							{!allowed
								? (
									<IcMDelete
										width={24}
										height={24}
										className={styles.delete}
										onClick={() => {
											deleteTaggedDocuments();
											setSelectBankShow(false);
											setAllowed(true);
										}}
									/>
								)
								: null}
						</div>
					</div>

					<div className={styles.merged_doc}>
						{loadingList || loadingMerged ? (documentsList || [])?.map((item) => (
							<div className={styles.skeleton} key={item.docName}>
								<Placeholder width="80%" height="35px" />
							</div>
						))
							: (
								<GetData
									documents={documents}
									documentsList={documentsList}
									getDate={getDate}
								/>
							)}
					</div>
				</div>
			</div>

			{showConfirmationModal ? (
				<ConfirmationModal
					showConfirmationModal={showConfirmationModal}
					setShowConfirmationModal={setShowConfirmationModal}
					handelMergeInvoices={handelMergeInvoices}
					data={data}
					setAllowed={setAllowed}
				/>
			) : null}

			<div className={styles.btn_container}>
				<Button
					size="md"
					className={styles.btn}
					onClick={() => {
						setActive('upload_documents');
					}}
					disabled={!selectBankShow}
				>
					Save & Proceed
				</Button>
			</div>
		</>
	);
}

export default MergeDocuments;
