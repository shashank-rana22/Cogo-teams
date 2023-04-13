import { Button, Popover } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { IcMPdf, IcMImage, IcMOverflowDot } from '@cogoport/icons-react';
import { format, startCase } from '@cogoport/utils';
import React, { useContext } from 'react';

import EmptyState from '../../../../common/EmptyState';
import useListTradeDocuments from '../../../../hooks/useListTradeDocuments';
import useUpdateOrganizationDocument from '../../../../hooks/useUpdateOrganizationDocument';
import Loader from '../Loader';

import styles from './styles.module.css';

function TradeDocuments({ forModal = false, handleSave = () => {}, handleView = () => {} }) {
	const { shipment_data } = useContext(ShipmentDetailContext);

	const { id = '', importer_exporter_id = '' } = shipment_data;
	const { data, getList, loading } = useListTradeDocuments({
		defaultFilters: {
			status          : ['accepted'],
			organization_id : importer_exporter_id,
			shipment_id     : id || undefined,
		},
	});

	const { deleteDocument } = useUpdateOrganizationDocument({
		refetch       : getList,
		defaultParams : {
			status: 'inactive',
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
						className={styles.single_doc}
					>

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
