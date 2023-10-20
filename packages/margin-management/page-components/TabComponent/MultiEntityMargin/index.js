import { Button, Modal, TabPanel, Tabs } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import React, { useRef } from 'react';

import useGetMultiEntityMargin from '../../../hooks/useGetMultiEntityMargin';

import MarginForm from './MarginForm';
import styles from './styles.module.css';

function MultiEntityMargin() {
	const formRef = useRef(null);

	const {
		activeService = '',
		setActiveService = () => {},
		// control = {},
		showModal = false,
		setShowModal = () => {},
		// formValues = {},
		options = [],
		cogoEntitiesList = [],
		// handleSubmit = () => {},
		// onSubmit = () => {},
	} = useGetMultiEntityMargin();

	const LIST = cogoEntitiesList.map((item) => {
		const arr = cogoEntitiesList.map((i) => [item, i]);
		arr.unshift(item);
		return arr;
	});

	const entityNames = (cogoEntitiesList || []).map((i) => i.business_name);

	entityNames.unshift('--');

	LIST.unshift(entityNames);

	const submitSlabDetails = () => formRef?.current?.submitFun();

	return (
		<div>
			<Tabs
				activeTab={activeService}
				themeType="primary"
				onChange={setActiveService}
				style={{ marginTop: 24 }}
			>
				{options.map((option) => (
					<TabPanel key={option.value} name={option.value} title={option.label} />
				))}
			</Tabs>
			<div className={styles.Square}>
				{(LIST || []).map((rowItem, rowIdx) => (
					<div key={rowItem} style={{ display: 'flex', flexDirection: 'row' }}>
						{(rowItem || []).map((colItem, colIdx) => (
							<div
								className={styles.Column}
								key={colItem}
								style={{
									background: rowIdx === 0 || colIdx === 0 ? '#f2f6ff' : '#fff',
								}}
							>
								{rowIdx === 0 && colIdx === 0 ? (
									<div className={styles.TableHead} />
								) : (
									<div>
										{rowIdx === 0 ? (
											<div className={styles.Name}>{rowItem?.[colIdx]}</div>
										) : (
											<div>
												{colIdx === 0 ? (
													<div className={styles.Name}>{colItem.business_name}</div>
												) : (
													<div className={styles.BtnWrapper}>
														{colItem?.[GLOBAL_CONSTANTS.zeroth_index]?.id
															=== colItem?.[1]?.id ? null : (
																<div
																	role="presentation"
																	onClick={() => setShowModal({
																		entities       : colItem,
																		action         : 'view',
																		activeService,
																		setActiveService,
																		serviceOptions : options,
																	})}
																>
																	View
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
					onClose={() => setShowModal([])}
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
