import { Pagination, Placeholder } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function ViewSuggestedServices({
	listview = [],
	page = {},
	setPage = () => {},
	loading = false,
	showPopover = false,
	setShowPopover = () => {},
	setShowAddRateModal = () => {},
	setServiceIdPresent = () => {},
}) {
	let content = (
		<div>
			<div
				style={{
					display        : 'flex',
					justifyContent : 'center',
					fontSize       : '14px',
					padding        : '2px',
					fontWeight     : '400',
					color          : 'black',
				}}
			>
				SUGGESTED SERVICE PROVIDERS
			</div>
			<div
				style={{
					display        : 'flex',
					flexDirection  : 'column',
					justifyContent : 'center',
				}}
			>
				{[...Array(6)].map((i) => (
					<div
						key={i}
						style={{
							margin       : '2px 0px 4px 4px',
							padding      : '6px',
							border       : '0.5px solid black',
							borderRadius : '4px',
						}}
					>
						<Placeholder style={{ borderRadius: '4px' }} width="100%" />
					</div>
				))}
				<div />
			</div>
		</div>
	);

	const handleAddRate = (id) => {
		setServiceIdPresent(id);
		setShowPopover(!showPopover);
		setShowAddRateModal(true);
	};

	if ((listview?.list || []).length && !loading) {
		content = (
			<>
				<div className={styles.suggested}>
					SUGGESTED SERVICE PROVIDERS
				</div>
				{listview?.list.map((listItem) => (
					<div key={listItem?.id}>
						<div
							className={styles.item}
							role="presentation"
							onClick={() => {
								handleAddRate(listItem?.id);
							}}
						>
							{listItem?.business_name}
						</div>
					</div>
				))}
			</>
		);
	}

	if (!(listview?.list || []).length && !loading) {
		content = (
			<div>
				<div>
					<div className={styles.no_service}>
						NO SERVICE PROVIDER FOUND
					</div>
					<div className={styles.apply_service}>
						Please apply for service expertise
					</div>
				</div>
				<div className={styles.icon}>
					<IcMSearchlight width="30px" height="30px" />
				</div>
			</div>
		);
	}
	return (
		<div>
			<div className={styles.page}>
				{content}
				{listview?.total_count > 10 && (
					<Pagination
						type="number"
						currentPage={page}
						totalItems={listview?.total_count}
						pageSize={listview?.page_limit}
						onPageChange={setPage}
					/>

				)}
			</div>
		</div>
	);
}

export default ViewSuggestedServices;
