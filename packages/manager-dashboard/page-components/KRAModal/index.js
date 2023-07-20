import { Modal } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import Spinner from '../../common/Spinner';
import useEmployeeKraDetails from '../../hooks/useGetKraDetails';

import styles from './styles.module.css';
import Title from './Title';

function KraModal({ show, onHide, employeeId, ratingCycle }) {
	const {
		data = [],
		loading,
	} = useEmployeeKraDetails({ employeeId, ratingCycle });

	const { list, modification_history = [] } = data;

	return (
		<Modal
			show={show}
			placement="top"
			className={styles.modal}
			size="xl"
			onClose={onHide}
			closeOnOuterClick={onHide}
		>
			<div>
				{
					loading ? (
						<div className={styles.spinner_container}>
							<Spinner />
						</div>
					) : (
						<>
							<Modal.Header title={<Title data={data} list={list} />} />

							<Modal.Body className={styles.body}>
								<div className={styles.modal_body_container}>
									{isEmpty(list) ? (
										<div className={styles.kra_empty_section}>
											KRA Details Not Found
										</div>
									) : (
										<div className={styles.left_section}>
											{(list || []).map((item) => (
												<div className={styles.sub_section} key={item.kra_id}>
													<div className={styles.label}>
														KRA Name:
														{' '}
														{item.kra_name}
													</div>

													<div className={styles.label}>
														KRA Achieved:
														{' '}
														{item.achieved_rating}
													</div>

													<div className={styles.label}>
														Weightage:
														{' '}
														{item.weightage}
													</div>
												</div>
											))}
										</div>
									)}

									<div className={styles.right_section}>
										<div className={styles.overall_rating}>
											<div className={styles.rating}>
												<div className={styles.average_overall_rating}>
													Average Overall Rating:
													{' '}
													{data?.average_overall_rating}
												</div>
												<div className={styles.rating_obtained}>
													Rating:
													{' '}
													{data?.average_overall_rating}
												</div>
											</div>
											<div className={styles.modification_history}>
												<div className={styles.fw}>Modification History:</div>
												{ !isEmpty(modification_history)
													? modification_history?.map((item) => (
														<div className={styles.modification} key={item.id}>
															<div>
																Modified By:
																{' '}
																{item.manager_name}
																{' from '}
																{item.old_rating}
																{' to '}
																{item.new_rating}
															</div>
															<div>
																Comments:
																{' '}
																{item.comments}
															</div>
															<div>
																Modified On:
																{' '}
																{item.modified_on}
																{formatDate({
																	date: item.updated_at,
																	dateFormat:
																	GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
																	timeFormat:
																	GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
																	formatType: 'dateTime',
																})}
															</div>
														</div>
													))
													: (
														<div className={styles.empty_history}>
															Modification History Not Found
														</div>
													)}
											</div>
										</div>
									</div>
								</div>
							</Modal.Body>
						</>
					)
				}
			</div>
		</Modal>
	);
}

export default KraModal;
