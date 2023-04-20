import { Button, Popover } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { IcMPdf, IcMImage, IcMOverflowDot } from '@cogoport/icons-react';
import EmptyState from '@cogoport/ocean-modules/common/EmptyState';
import { format, startCase } from '@cogoport/utils';
import React, { useContext } from 'react';

import useListTradeDocuments from '../../../../hooks/useListTradeDocuments';
import useUpdateOrganizationDocument from '../../../../hooks/useUpdateOrganizationDocument';
import Loader from '../Loader';

import styles from './styles.module.css';

function TradeDocuments({
	forModal = false,
	handleSave = () => {},
	handleView = () => {},
	searchTasksVal,
	showWalletDocs,
	handleDocClick,
}) {
	const { shipment_data } = useContext(ShipmentDetailContext);

	const { importer_exporter_id = '' } = shipment_data;
	const { data, getList, loading } = useListTradeDocuments({
		defaultFilters: {
			q               : searchTasksVal || undefined,
			status          : 'accepted',
			organization_id : importer_exporter_id,
		},
	});

	const { deleteDocument } = useUpdateOrganizationDocument({
		refetch       : getList,
		defaultParams : {
			status: 'pending',
		},
	});

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

	const contentToShow = () => {
		if (loading) {
			return [...Array(forModal ? 3 : 2)].map(() => (
				<Loader forModal={forModal} />
			));
		}
		if (!loading && data?.list?.length === 0) {
			return <EmptyState />;
		}

		return (
			<>
				{(data?.list || []).map((doc) => (
					<div
						role="button"
						tabIndex={0}
						className={styles.single_doc}
						onClick={() => handleDocClick(doc)}
					>
						{!showWalletDocs && (
							<div className={styles.dots}>
								<Popover
									interactive
									placement="bottom-end"
									content={content(doc)}
								>
									<IcMOverflowDot />
								</Popover>
							</div>
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
							<div className={styles.upload_info}>
								{`Uploaded On ${format(
									doc?.updated_at,
									'dd MMM yyyy',
								)}`}
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
		<div className={styles.wrapper}>{contentToShow()}</div>
	);
}

export default TradeDocuments;
