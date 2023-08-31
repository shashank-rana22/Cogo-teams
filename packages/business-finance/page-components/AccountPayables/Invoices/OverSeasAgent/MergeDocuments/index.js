/* eslint-disable max-lines-per-function */
import { Button, Placeholder, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMDelete, IcMPdf, IcCFtick } from '@cogoport/icons-react';
import { saveAs } from 'file-saver';
import React, { useState, useEffect } from 'react';

import List from '../../../../commons/List/index.tsx';
import useListTaggedInvoice from '../../hooks/useListTaggedInvoice';
import { OVERSEAS_FINAL_CONFIRMATION_LIST } from '../Configurations/overseasFinalConfirmationListConfig';

import ConfirmationModal from './ConfirmationModal/index';
import styles from './styles.module.css';

const FIRST_PAGE = 1;
const TOOLTIP_SHOW_CONDITION = 15;
const SUBSTRING_CONDITON_MAX = 15;
const SUBSTRING_CONDITON_MIN = 0;
const TAGGED_DOC_CONDITION = 4;

function GetInvoiceData({ selectBankShow = false, setShowConfirmationModal = () => {}, list = {} }) {
	return (
		selectBankShow
			? (
				<div style={{ display: 'flex' }}>
					<IcCFtick />
					<div className={styles.success}>
						Invoices successfully merged
					</div>
				</div>
			)
			:						(
				<Button
					onClick={() => setShowConfirmationModal(true)}
					disabled={!list.length}
				>
					Merge Invoices
				</Button>
			)
	);
}

function GetData({
	documents = {},
	documentsList = [],
	getDate = () => {},
	deleteTaggedDocuments = () => {},
	setSelectBankShow = () => {},
}) {
	if (
		documents.billPdfUrl === undefined
		&& documents.shipmentPdfUrl === undefined
	) {
		return (
			<div className={styles.merge_doc_msg}>
				PLEASE MERGE INVOICES
			</div>
		);
	}

	return documentsList.map((item) => {
		if (item.documentUrl !== '') {
			return (
				<div className={styles.document_card} key={item.docName}>
					<div className={styles.document_sub_card}>
						<div className={styles.pdf_container}>
							<div>
								<IcMPdf width={30} height={30} />
							</div>
							<div>
								<div>
									<div className={styles.doc_name_text}>{item.docName}</div>
									<div className={styles.uploaded_by}>
										uploaded at:
										{' '}
										{getDate(item.uploadedAt)}
									</div>
								</div>
							</div>
						</div>

						<div className={styles.download_doc}>
							<Button
								style={{ marginRight: '20px' }}
								onClick={() => window.open(item.documentUrl, '_blank')}
								themeType="linkUi"
							>
								View
							</Button>

							<Button
								onClick={() => saveAs(item.documentUrl)}
								themeType="linkUi"
							>
								Download
							</Button>

							{item.showDeleteIcon && (
								<IcMDelete
									width={24}
									height={24}
									onClick={() => {
										deleteTaggedDocuments(item);
										setSelectBankShow(false);
									}}
								/>
							)}
						</div>
					</div>
				</div>
			);
		}
		return null;
	});
}

function MergeDocuments({ setActive = () => {} }) {
	const [showConfirmationModal, setShowConfirmationModal] = useState(false);
	const [selectBankShow, setSelectBankShow] = useState(false);

	const {
		data,
		loadingList,
		loadingMerged,
		mergeInvoices,
		deleteInvoices,
		setParams,
		deleteTaggedDocuments,
		params,
	} = useListTaggedInvoice({ setSelectBankShow });

	const { documents = ' ', list = [] } = data || {};

	const checkShipmentPdfUrl = !!documents.shipmentPdfUrl;
	const billPdfUrl = !!documents.billPdfUrl;

	const getDate = (date) => formatDate({
		date,
		dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
		formatType : 'date',
	});

	const handleDelete = (itemData) => {
		deleteInvoices(itemData.id);
	};

	const handelMergeInvoices = () => {
		setShowConfirmationModal(false);
		mergeInvoices();
		setSelectBankShow(true);
	};

	useEffect(() => {
		const isTagged = checkShipmentPdfUrl && billPdfUrl;
		setSelectBankShow(isTagged);
	}, [data, checkShipmentPdfUrl, billPdfUrl]);

	const FUNCTIONS = {
		renderTrashInvoice: (itemData) => {
			if (!selectBankShow) {
				return (
					<IcMDelete
						width={16}
						height={16}
						onClick={() => handleDelete(itemData)}
					/>
				);
			}
			return null;
		},

		renderTaggedDocument: (itemData) => {
			const { taggedDocuments } = itemData || {};
			const value = taggedDocuments?.split('/')[TAGGED_DOC_CONDITION].replaceAll('%20', '');
			return (
				<Button
					themeType="linkUi"
					onClick={() => window.open(itemData.taggedDocuments, '_blank')}
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
			documentUrl    : documents.billPdfUrl || '',
			uploadedAt     : documents.createdAt,
			showDeleteIcon : true,
		},
		{
			docName        : 'Shipment Documents',
			documentUrl    : documents.shipmentPdfUrl || '',
			uploadedAt     : documents.createdAt,
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
						Merged Documents
						<div className={styles.dash} />
					</div>

					<div className={styles.merged_doc}>
						{loadingList || loadingMerged ? documentsList.map((item) => (
							<div className={styles.skeleton} key={item.docName}>
								<Placeholder width="80%" height="35px" />
							</div>
						))
							: (
								<GetData
									documents={documents}
									documentsList={documentsList}
									getDate={getDate}
									deleteTaggedDocuments={deleteTaggedDocuments}
									setSelectBankShow={setSelectBankShow}
								/>
							)}
					</div>
				</div>
			</div>

			{showConfirmationModal && (
				<ConfirmationModal
					showConfirmationModal={showConfirmationModal}
					setShowConfirmationModal={setShowConfirmationModal}
					handelMergeInvoices={handelMergeInvoices}
					data={data}
				/>
			)}

			<div className={styles.btn_container}>
				<div className={styles.btn}>
					<Button
						size="md"
						onClick={() => {
							setActive('upload_documents');
						}}
						disabled={!selectBankShow}
					>
						Save & Proceed
					</Button>
				</div>
			</div>
		</>
	);
}

export default MergeDocuments;
