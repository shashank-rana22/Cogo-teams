import { Button, Modal, TabPanel, Tabs } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowNext } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useRef, useState } from 'react';

import useGetMultiEntityMargin from '../../../hooks/useGetMultiEntityMargin';

import MarginForm from './MarginForm';
import styles from './styles.module.css';

function TableHead() {
	return (
		<div className={styles.TableHeader}>
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
	const formRef = useRef(null);

	const [activeEntities, setActiveEntities] = useState([]);

	const {
		activeService = '',
		setActiveService = () => {},
		// control = {},
		showModal = {},
		setShowModal = () => {},
		// formValues = {},
		options = [],
		cogoEntitiesList = [],
		// handleSubmit = () => {},
		// onSubmit = () => {},
	} = useGetMultiEntityMargin();

	const newCogoEntitiesList = cogoEntitiesList.map((item) => {
		const arr = cogoEntitiesList.map((i) => [item, i]);
		arr.unshift(item);
		return arr;
	});

	const entityNames = (cogoEntitiesList || []).map((i) => i.business_name);

	entityNames.unshift('--');

	newCogoEntitiesList.unshift(entityNames);

	const submitSlabDetails = () => formRef?.current?.submitFun();

	const showHighlighted = (rI, cI, ri, ci) => {
		if ((activeEntities[GLOBAL_CONSTANTS.zeroth_index]?.business_name
			=== cI.business_name
			|| activeEntities[1]?.business_name === rI?.[ci])
			&& (!isEmpty(activeEntities))) {
			return true;
		}
		return false;
	};

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
			<div className={styles.square}>
				{(newCogoEntitiesList || []).map((rowItem, rowIdx) => (
					<div
						key={rowItem[GLOBAL_CONSTANTS.zeroth_index].id}
						style={{ display: 'flex', flexDirection: 'row' }}
					>
						{(rowItem || []).map((colItem, colIdx) => (
							<div
								className={styles.column}
								key={`${colItem[GLOBAL_CONSTANTS.zeroth_index]?.id}_${colItem[1]?.id}`}
								style={{
									backgroundColor:
										showHighlighted(rowItem, colItem, rowIdx, colIdx)
											? '#f37166' : '#fff',
									color:
										showHighlighted(rowItem, colItem, rowIdx, colIdx)
											? '#fff' : '#000',
								}}
								onMouseEnter={() => (rowIdx && colIdx ? setActiveEntities(colItem) : () => { })}
								onMouseLeave={() => setActiveEntities([])}
							>
								{!rowIdx && !colIdx ? (
									<TableHead />
								) : (
									<div>
										{!rowIdx ? (
											<div className={styles.name}>
												{rowItem?.[colIdx]}
											</div>
										) : (
											<div>
												{!colIdx ? (
													<div className={styles.name}>
														{colItem.business_name}
													</div>
												) : (
													<div className={styles.btn_wrapper}>
														{colItem?.[GLOBAL_CONSTANTS.zeroth_index]?.id
																		=== colItem?.[1]?.id ? (
																null
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
																	View/Edit Margins
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
					onClose={() => setShowModal({})}
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
