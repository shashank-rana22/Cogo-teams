import { Button, Loader, Modal, TabPanel, Tabs } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowNext } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../../../common/EmptyStateMargins';
import useGetMultiEntityMargin from '../../../hooks/useGetMultiEntityMargin';

import MarginForm from './MarginForm';
import styles from './styles.module.css';

function TableHead() {
	return (
		<div className={styles.table_header}>
			<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
				<IcMArrowNext
					height={20}
					width={20}
					style={{ transform: 'rotate(90deg)' }}
				/>
				{' '}
				from
			</div>
			<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
				To
				{' '}
				<IcMArrowNext height={20} width={20} style={{ marginLeft: '4px' }} />
			</div>
		</div>
	);
}

function MultiEntityMargin() {
	const {
		activeService = '',
		setActiveService = () => {},
		showModal = {},
		setShowModal = () => {},
		options = [],
		submitSlabDetails = () => {},
		showHighlighted = () => {},
		setActiveEntities = () => { },
		cogoEntitiesList = [],
		loadingListCogoEntities = false,
		newCogoEntitiesList = [],
		formRef,
		entityMarginsList = [],
		getButtonLabel = () => { },
		triggerListEntityMargins = () => { },
	} = useGetMultiEntityMargin();

	if (loadingListCogoEntities) {
		return (
			<div className={styles.loader_container}>
				<Loader themeType="primary" />
			</div>
		);
	}

	if (isEmpty(cogoEntitiesList)) {
		return <EmptyState emptyDataText="No Record Found" />;
	}

	return (
		<div>
			<Tabs
				activeTab={activeService}
				themeType="tertiary"
				onChange={setActiveService}
				style={{ marginTop: 12, overflow: 'scroll' }}
			>
				{options.map((option) => (
					<TabPanel key={option.value} name={option.value} title={option.label} />
				))}
			</Tabs>
			<div className={styles.square}>
				{(newCogoEntitiesList || []).map((rowItem, rowIdx) => (
					<div
						key={rowItem[GLOBAL_CONSTANTS.zeroth_index].id}
						className={styles.row_item}
					>
						{(rowItem || []).map((colItem, colIdx) => (
							<div
								className={styles.column}
								key={`${colItem[GLOBAL_CONSTANTS.zeroth_index]?.id}_${colItem[1]?.id}`}
								style={{
									backgroundColor:
										showHighlighted(rowItem, colItem, rowIdx, colIdx)
											? '#fdebe9' : '#fff',
								}}
								onMouseEnter={() => (rowIdx && colIdx ? setActiveEntities(colItem) : () => { })}
								onMouseLeave={() => setActiveEntities([])}
							>
								{!rowIdx && !colIdx ? (
									<TableHead />
								) : (
									<div>
										{!rowIdx ? (<div className={styles.name}>{rowItem?.[colIdx]}</div>)
											: (
												<div>
													{!colIdx ? (
														<div className={styles.column_name}>
															{colItem.business_name}
														</div>
													) : (
														<div className={styles.btn_wrapper}>
															{colItem?.[GLOBAL_CONSTANTS.zeroth_index]?.id
																		=== colItem?.[1]?.id ? (
																			<div className={styles.view_btn}>--</div>
																) : (
																	<div
																		role="presentation"
																		onClick={() => setShowModal({
																			entities       : colItem,
																			action         : 'view',
																			activeService,
																			setActiveService,
																			serviceOptions : options,
																		})}
																		className={styles.view_btn}
																	>
																		{getButtonLabel(entityMarginsList, colItem)}
																	</div>
																)}
														</div>
													)}
												</div>
											)}
									</div>
								)}
							</div>
						))}
					</div>
				))}
			</div>

			{!isEmpty(showModal?.entities) ? (
				<Modal
					size="xl"
					show={!isEmpty(showModal?.entities)}
					onClose={() => {
						triggerListEntityMargins();
						setShowModal({});
					}}
				>
					<Modal.Header title="View/Add Slabs" />
					<Modal.Body style={{ minHeight: '300px' }}>
						<MarginForm showModal={showModal} setShowModal={setShowModal} ref={formRef} />
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={submitSlabDetails}>
							Submit
						</Button>
					</Modal.Footer>
				</Modal>
			) : null}
		</div>
	);
}

export default MultiEntityMargin;
