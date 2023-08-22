import { Modal } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import React from 'react';

import Spinner from '../../common/Spinner';
import useEmployeeKraDetails from '../../hooks/useGetKraDetails';

import styles from './styles.module.css';
import Title from './Title';

function KraModal({ show = false, onHide = () => {}, employeeId = '', ratingCycle = '' }) {
	const { t } = useTranslation(['managerDashboard']);

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
											{t('managerDashboard:kra_details_not_found')}
										</div>
									) : (
										<div className={styles.left_section}>
											{(list || []).map((item) => (
												<div className={styles.sub_section} key={item.kra_id}>
													<div className={styles.label}>
														{t('managerDashboard:kra_name')}
														{' '}
														{item.kra_name}
													</div>

													<div className={styles.label}>
														{t('managerDashboard:kra_achieved')}
														{' '}
														{item.achieved_rating}
													</div>

													<div className={styles.label}>
														{t('managerDashboard:weightage')}
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
													{t('managerDashboard:avg_overall_rating')}
													{' '}
													{data?.average_overall_rating}
												</div>
												<div className={styles.rating_obtained}>
													{t('managerDashboard:rating')}
													{' '}
													{data?.average_overall_rating}
												</div>
											</div>
											<div className={styles.modification_history}>
												<div className={styles.fw}>
													{t('managerDashboard:modification_history')}
												</div>
												{ !isEmpty(modification_history)
													? modification_history?.map((item) => (
														<div className={styles.modification} key={item.id}>
															<div>
																{t('managerDashboard:modified_by')}
																{' '}
																{item.manager_name}
																{' '}
																{t('managerDashboard:from_label')}
																{' '}
																{item.old_rating}
																{' '}
																{t('managerDashboard:to_label')}
																{' '}
																{item.new_rating}
															</div>
															<div>
																{t('managerDashboard:comments')}
																{' '}
																{item.comments}
															</div>
															<div>
																{t('managerDashboard:modified_on')}
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
															{t('managerDashboard:modification_history_not_found')}
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
