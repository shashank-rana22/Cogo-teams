/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Popover } from '@cogoport/components';
import { IcMPdf, IcMFilter } from '@cogoport/icons-react';
import { format, startCase, isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import EmptyState from '../../../../common/EmptyState';
import useOmnichannelDocumentsList from '../../../../hooks/useOmnichannelDocumentsList';
import LoadingState from '../UserActivity/LoadingState';

import documentStatus from './DocumentStatus';
import Filters from './Filters';
import styles from './styles.module.css';

function Documents({
	activeMessageCard,
	activeVoiceCard,
	activeTab,
	customerId,
}) {
	const [filterVisible, setFilterVisible] = useState(false);
	const [filters, setFilters] = useState('');
	const { data = {}, loading, documentsList = () => {} } = useOmnichannelDocumentsList({
		activeMessageCard,
		activeVoiceCard,
		activeTab,
		customerId,
		setFilterVisible,
	});

	const TITLE = 'Documents';

	const handleFilters = () => {
		documentsList(filters);
	};

	const handleReset = () => {
		setFilters('');
		documentsList();
	};

	const { list = [] } = data || {};
	console.log('list:', list);

	const handleOpenFile = (val) => {
		window.open(val, '_blank');
	};

	if (loading) {
		return (
			<>
				<div className={styles.title}>{TITLE}</div>
				<LoadingState />
			</>
		);
	}

	if (isEmpty(list)) {
		return (
			<>
				<div className={styles.title}>{TITLE}</div>
				<div className={styles.empty}>
					<EmptyState type="documents" />
				</div>
			</>
		);
	}

	return (
		<>
			<div className={styles.header}>
				<div className={styles.title}>{TITLE}</div>
				<div className={styles.filter_icon}>
					<Popover
						placement="left"
						disabled={loading || isEmpty(list)}
						render={(
							<Filters
								setFilterVisible={setFilterVisible}
								filters={filters}
								setFilters={setFilters}
								handleFilters={handleFilters}
								handleReset={handleReset}
							/>
						)}
						visible={filterVisible}
						onClickOutside={() => setFilterVisible(false)}
					>

						<IcMFilter width={20} height={20} onClick={() => setFilterVisible(!filterVisible)} />
					</Popover>
					{!isEmpty(filters) && <div className={styles.filters_applied} />}
				</div>
			</div>

			<div className={styles.list_container}>
				{ (list || []).map((item) => {
					const {
						created_at = '',
						document_type = '', verification_status = '', document_url = '',

					} = item || {};
					return (

						<>
							<div className={styles.activity_date}>
								<div className={styles.dot} />
								<div className={styles.durations}>
									{format(created_at, 'hh:mm a,')}
									{format(created_at, ' MMM dd')}
								</div>
							</div>
							<div className={styles.main_card}>
								<div className={styles.card}>
									<div className={styles.header}>
										{documentStatus(verification_status)}
									</div>
									<div className={styles.content}>
										Document sent by customer
									</div>
									<div
										className={styles.document}
										onClick={() => handleOpenFile(document_url)}
									>
										<IcMPdf width={18} height={18} fill="#C4DC91" />
										<div className={styles.document_name}>
											{startCase(document_type)}
										</div>

									</div>
								</div>
							</div>
						</>
					);
				})}
			</div>

		</>
	);
}
export default Documents;
