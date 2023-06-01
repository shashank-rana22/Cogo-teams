import { Button, Popover } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { IcMPdf, IcMImage, IcMOverflowDot } from '@cogoport/icons-react';
import EmptyState from '@cogoport/ocean-modules/common/EmptyState';
import { format, startCase } from '@cogoport/utils';
import { useContext } from 'react';

import useListOrganizationDocuments from '../../../../hooks/useListOrganizationDocuments';
import useUpdateOrganizationDocument from '../../../../hooks/useUpdateOrganizationDocument';
import Loader from '../Loader';

import styles from './styles.module.css';

function OrganizationDocuments({
	forModal = false,
	handleSave = () => {},
	handleView = () => {},
	searchDocsVal,
	showWalletDocs,
	handleDocClick = () => {},
}) {
	const { shipment_data } = useContext(ShipmentDetailContext);

	const { importer_exporter_id = '' } = shipment_data;

	const {
		data,
		getList,
		loading,
	} =	useListOrganizationDocuments({
		defaultFilters: {
			status          : 'active',
			organization_id : importer_exporter_id,
			q               : searchDocsVal || undefined,
		},
		defaultParams: {
			page_limit: 1000,
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

export default OrganizationDocuments;
