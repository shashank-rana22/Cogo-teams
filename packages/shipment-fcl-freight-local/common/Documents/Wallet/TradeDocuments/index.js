import { Button } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { IcMPdf, IcMImage } from '@cogoport/icons-react';
import EmptyState from '@cogoport/ocean-modules/common/EmptyState';
import { format, startCase } from '@cogoport/utils';
import React, { useContext } from 'react';

import useListTradeDocuments from '../../../../hooks/useListTradeDocuments';
import Loader from '../Loader';

import styles from './styles.module.css';

function TradeDocuments({
	forModal = false,
	handleSave = () => {},
	handleView = () => {},
	searchDocsVal,
	handleDocClick = () => {},
}) {
	const { shipment_data } = useContext(ShipmentDetailContext);

	const { importer_exporter_id = '', id = '' } = shipment_data;
	const { data, loading } = useListTradeDocuments({
		defaultFilters: {
			q               : searchDocsVal || undefined,
			status          : 'accepted',
			organization_id : importer_exporter_id,
			shipment_id     : id,
		},
	});

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

						{doc.type === 'pdf' ? (
							<IcMPdf style={{ fontSize: '32px', color: '#221F20' }} />
						) : (
							<IcMImage style={{ fontSize: '32px', color: '#221F20' }} />
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
								style={{ color: '#F68B21' }}
								themeType="link"
								onClick={(e) => handleView(e, doc?.image_url)}
							>
								View
							</Button>
							<Button
								style={{ color: '#F68B21' }}
								themeType="link"
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
