import { EmptyState } from '@cogoport/air-modules';
import { Button } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMPdf, IcMImage } from '@cogoport/icons-react';
import { startCase, isEmpty } from '@cogoport/utils';
import React, { useEffect, useContext } from 'react';

import useListTradeDocuments from '../../../../hooks/useListTradeDocuments';
import Loader from '../Loader';

import styles from './styles.module.css';

const LOADER_COUNT = 3;

function TradeDocuments({
	handleSave = () => {},
	handleView = () => {},
	searchDocsVal,
}) {
	const { shipment_data = {} } = useContext(ShipmentDetailContext);

	const { importer_exporter_id = '' } = shipment_data;

	const { query = '', debounceQuery } = useDebounceQuery();

	const { data, loading } = useListTradeDocuments({
		defaultFilters: {
			q               : query || undefined,
			status          : 'accepted',
			organization_id : importer_exporter_id,
		},
	});

	useEffect(() => {
		debounceQuery(searchDocsVal);
	}, [debounceQuery, searchDocsVal]);

	const contentToShow = () => {
		if (loading) {
			return Array.from(Array(LOADER_COUNT).keys()).map((key) => (
				<Loader key={key} />
			));
		}
		if (!loading && isEmpty(data?.list)) {
			return <EmptyState />;
		}

		return (data?.list || []).map((doc) => (
			<div
				role="button"
				tabIndex={0}
				className={styles.single_doc}
				key={doc?.id}
			>

				{doc.type === 'pdf' ? (
					<IcMPdf className={styles.doc_icon} />
				) : (
					<IcMImage className={styles.doc_icon} />
				)}

				<div className={styles.main}>
					<div className={styles.heading}>
						{startCase(doc.document_type)}
					</div>

					<div className={styles.upload_info}>
						{`Uploaded On ${formatDate({
							date       : doc?.updated_at,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							formatType : 'date',
						})}`}
					</div>
				</div>

				<div className={styles.button_wrapper}>
					<Button
						themeType="link"
						onClick={(e) => handleView(e, doc?.image_url)}
					>
						View
					</Button>

					<Button
						themeType="link"
						onClick={(e) => handleSave(e, doc?.image_url)}
					>
						Download
					</Button>
				</div>
			</div>
		));
	};

	return (
		<div className={styles.wrapper}>{contentToShow()}</div>
	);
}

export default TradeDocuments;
