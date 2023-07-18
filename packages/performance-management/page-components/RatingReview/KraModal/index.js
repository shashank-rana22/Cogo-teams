import { Button, Modal, RatingComponent, Textarea, Loader } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import InputEmployeeManualTarget from './InputEmployeeManualTarget';
import styles from './styles.module.css';
import useEmployeeKraDetails from './useEmployeeKraDetails';
import useUpdateEmployeeFinalRating from './useUpdateEmployeeFinalRating';

const ROUNF_OFF_DIGIT = 100;
const DEFAULT_OVERALL_RATING = 0;

function KraModal({ show, setShow, selectCycle, fetchRatingReviewDetails }) {
	const {
		data = [],
		loading,
		employeeKraDetails,
	} = useEmployeeKraDetails({ show, selectCycle });

	const { list = [], modification_history = [] } = data;

	const {
		loading: SubmitLoading,
		updateEmployeeFinalRating,
		starRating, setStarRating, comments, setCommemts,
	} = useUpdateEmployeeFinalRating({ data, selectCycle, setShow, fetchRatingReviewDetails });

	return (
		<Modal show={show} placement="top" className={styles.modal} size="xl" onClose={() => setShow(false)}>
			<Modal.Header title={(
				<div className={styles.container}>

					<div className={styles.employee_name}>
						Employee Name:
						{' '}
						<span style={{ fontWeight: 'bold' }}>{data?.employee_details?.employee_name}</span>
					</div>

					<div className={styles.squad}>
						<div className={styles.squad_name}>
							Squad:
							{' '}
							<span style={{ fontWeight: 'bold' }}>{data?.employee_details?.squad_name}</span>
						</div>

						<div className={styles.tribe_name}>
							Tribe:
							{' '}
							<span style={{ fontWeight: 'bold' }}>{data?.employee_details?.tribe_name}</span>
						</div>

						<div className={styles.total_kra}>
							Total Kra:
							{' '}
							<span style={{ fontWeight: 'bold' }}>{(list || [])?.length}</span>
						</div>
					</div>
				</div>
			)}
			/>

			<Modal.Body className={styles.body}>
				{
					loading ? (
						<div style={{ height: '58vh' }} className={styles.loader}>
							<Loader style={{ height: '60px', width: '60px' }} />

						</div>
					)

						: (
							<div className={styles.modal_body_container}>
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
												{item.rating_manual ? (
													<InputEmployeeManualTarget
														item={item}
														data={data}
														selectCycle={selectCycle}
														employeeKraDetails={employeeKraDetails}
													/>
												)
													: item.achieved_rating}
											</div>

											<div className={styles.label}>
												Weightage:
												{' '}
												{item.weightage}
											</div>
										</div>
									))}

								</div>
								<div className={styles.right_section}>
									<div className={styles.overall_rating}>
										<div className={styles.rating}>
											<div className={styles.average_overall_rating}>
												Average Overall Rating:
												{' '}

												{ Math.round((data?.average_overall_rating || DEFAULT_OVERALL_RATING)
												* ROUNF_OFF_DIGIT) / ROUNF_OFF_DIGIT}
											</div>

											<div className={styles.rating_obtained}>
												Rating:
												{' '}
												{ data?.final_rating}
											</div>

										</div>

										<div className={styles.modification_history}>
											<div>Modification History:</div>

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
														</div>

													</div>
												))
												: (
													<div>
														Data Not Found
													</div>
												)}

										</div>
									</div>
									<div className={styles.remarks}>
										<div className={styles.comments}>
											<div className={styles.revised_rating}>Revised Rating:</div>

											<div className={styles.rating_assigned}>
												<RatingComponent
													type="star"
													totalStars={5}
													value={starRating}
													onChange={setStarRating}
												/>
											</div>
										</div>

										<Textarea
											value={comments}
											onChange={(e) => setCommemts(e)}
											className={styles.text_area}
											rows={6}
											placeholder="Please input your feedback about the employee"
										/>
									</div>
								</div>
							</div>
						)
				}

			</Modal.Body>

			<Modal.Footer>
				<div className={styles.actions}>
					<div className={styles.cancel}>
						<Button
							themeType="secondary"
							onClick={() => setShow(false)}
						>
							Cancel
						</Button>
					</div>

					<Button
						themeType="accent"
						loading={SubmitLoading}
						onClick={updateEmployeeFinalRating}
					>
						Submit
					</Button>
				</div>
			</Modal.Footer>

		</Modal>
	);
}

export default KraModal;
