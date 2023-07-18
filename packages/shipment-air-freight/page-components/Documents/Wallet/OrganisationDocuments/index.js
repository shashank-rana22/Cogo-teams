import { EmptyState } from '@cogoport/air-modules';
import { Pagination, Button, Popover } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMPdf, IcMImage, IcMOverflowDot } from '@cogoport/icons-react';
import { startCase, isEmpty } from '@cogoport/utils';
import React, { useState, useEffect, useContext } from 'react';

import useListOrganizationDocuments from '../../../../hooks/useListOrganizationDocuments';
import useUpdateOrganizationDocument from '../../../../hooks/useUpdateOrganizationDocument';
import Loader from '../Loader';

import styles from './styles.module.css';

const LOADER_COUNT = 3;
const DEFAULT_TAB_INDEX = 0;
const INITIAL_PAGE = 1;
const TOTAL_COUNT_FOR_PAGINATION = 0;
const SIZE_FOR_SHIPMENT_PAGE = 10;
const FIRST_PAGE_LIMIT = 20;

function OrganizationDocuments({
	handleSave = () => {},
	handleView = () => {},
	searchDocsVal,
	showWalletDocs,
}) {
	const [page, setPage] = useState(INITIAL_PAGE);

	const { shipment_data } = useContext(ShipmentDetailContext);

	const { importer_exporter_id = '' } = shipment_data;

	const { query = '', debounceQuery } = useDebounceQuery();

	const {
		data,
		getList,
		loading,
	} =	useListOrganizationDocuments({
		defaultFilters: {
			status          : 'active',
			organization_id : importer_exporter_id,
			q               : query || undefined,
		},
		defaultParams: {
			page,
			page_limit: 20,
		},
	});

	const { total_count, page:currPage, list } = data || {};

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

	useEffect(() => {
		debounceQuery(searchDocsVal);
	}, [debounceQuery, searchDocsVal]);

	const contentToShow = () => {
		if (loading) {
			return Array.from(Array(LOADER_COUNT).keys()).map((key) => (
				<Loader key={key} />
			));
		}
		if (!loading && isEmpty(list)) {
			return <EmptyState />;
		}
		return (
			<>
				{(list || []).map((doc) => (
					<div
						key={doc?.id}
						role="button"
						tabIndex={DEFAULT_TAB_INDEX}
						className={styles.single_doc}
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
				))}
			</>
		);
	};

	return (
		<div className={styles.org_doc}>
			<div className={styles.wrapper}>
				{contentToShow()}
			</div>
			{total_count > FIRST_PAGE_LIMIT && (
				<Pagination
					type="number"
					totalItems={total_count || TOTAL_COUNT_FOR_PAGINATION}
					currentPage={currPage || INITIAL_PAGE}
					pageSize={SIZE_FOR_SHIPMENT_PAGE}
					onPageChange={(pageVal) => setPage(pageVal)}
					style={{ marginLeft: 'auto' }}
				/>
			)}
		</div>
	);
}

export default OrganizationDocuments;
