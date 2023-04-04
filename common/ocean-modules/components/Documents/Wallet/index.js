import { Popover, Button } from '@cogoport/components';
import { IcMPdf, IcMOverflowDot, IcMImage } from '@cogoport/icons-react';
import { startCase, format } from '@cogoport/utils';
import { saveAs } from 'file-saver';
import React, { useEffect } from 'react';

import EmptyState from '../../../common/EmptyState';
import useListOrganizationDocuments from '../../../hooks/useListOrganizationDocuments';
import useListTradeDocuments from '../../../hooks/useListTradeDocuments';
import useUpdateOrganizationDocument from '../../../hooks/useUpdateOrganizationDocument';

import Loader from './Loader';
import styles from './styles.module.css';

function Wallet({ forModal = false, handleDocClick = () => {}, showWalletDocs, activeWallet = '' }) {
	const { data : tradeDocuments, getList, loading : tradeDocumentsLoading } = useListTradeDocuments();
	const {
		data : organizationDocuments,
		getList : organizationDocumentsList,
		loading : orgDocumentsLoading,
	} =	useListOrganizationDocuments();

	const { deleteDocument } = useUpdateOrganizationDocument({
		refetch: activeWallet === 'trade_documents'
			? getList : organizationDocumentsList,
	});

	useEffect(() => {
		if (activeWallet === 'trade_documents') {
			getList();
		} else {
			organizationDocumentsList();
		}
	}, [activeWallet, getList, organizationDocumentsList]);

	const handleSave = (e, image_url) => {
		e.stopPropagation();
		if (image_url) {
			saveAs(image_url);
		}
	};
	const handleView = (e, image_url) => {
		e.stopPropagation();
		window.open(image_url, '_blank');
	};

	const content = (doc) => (
		<div
			role="button"
			tabIndex="0"
			className={styles.action}
			onClick={() => {
				deleteDocument({ id: doc?.id });
			}}
		>
			Delete Document
		</div>
	);

	const loading = tradeDocumentsLoading && orgDocumentsLoading;

	const dataToMap = activeWallet === 'trade_documents' ? tradeDocuments : organizationDocuments;

	const contentToShow = () => {
		if (loading) {
			return [...Array(forModal ? 3 : 2)].map(() => (
				<Loader forModal={forModal} />
			));
		}
		if (!loading && dataToMap?.list?.length === 0) {
			return <EmptyState />;
		}

		return (
			<>
				{(dataToMap?.list || []).map((doc) => (
					<div
						role="button"
						tabIndex="0"
						className={styles.single_doc}
						onClick={() => handleDocClick(doc)}
					>
						{!showWalletDocs && (
							<Popover
								interactive
								placement="bottom"
								theme="light"
								trigger="click"
								content={content(doc)}
							>
								<div className={styles.dots}>
									<IcMOverflowDot />
								</div>
							</Popover>
						)}
						{doc.type === 'pdf' ? (
							<IcMPdf fontSize="32px" />
						) : (
							<IcMImage fontSize="32px" />
						)}
						<div className={styles.main}>
							<div className={styles.heading} style={{ fontSize: '14px' }}>
								{startCase(doc.document_type)}
							</div>
							<div className={styles.gap}>
								<div className={styles.upload_info}>
									{`Uploaded On ${format(
										doc?.updated_at,
										'dd MMM yyyy',
									)}`}
								</div>
							</div>
						</div>
						<div className={styles.button_wrapper}>
							<Button
								className={styles.initial}
								onClick={(e) => handleView(e, doc?.image_url)}
							>
								View
							</Button>
							<Button
								onClick={(e) => handleSave(e, doc?.image_url)}
							>
								Download
							</Button>
						</div>
					</div>
				))}
			</>
		);
	};

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>{contentToShow()}</div>
		</div>
	);
}

export default Wallet;
