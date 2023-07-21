import { Button, Modal, RatingComponent, Textarea, Loader } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import StyledTable from '../../../common/StyledTable';

import getColumns from './getKraColumns';
import styles from './styles.module.css';
import useEmployeeKraDetails from './useEmployeeKraDetails';
import useUpdateEmployeeFinalRating from './useUpdateEmployeeFinalRating';

const ROUND_OFF_DIGIT = 100;
const DEFAULT_OVERALL_RATING = 0;
const TABLE_EMPTY_TEXT = 'No data to show';

function KraModal({ show, setShow, selectCycle, fetchRatingReviewDetails }) {
	const {
		data = [],
		loading,
		employeeKraDetails,
	} = useEmployeeKraDetails({ show, selectCycle });

	const { list = [], modification_history = [] } = data;
	const columns = getColumns({ data, selectCycle, employeeKraDetails });

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
						Kra Rating of
						{' '}
						<span style={{ fontWeight: 'bold', paddingLeft: '5px' }}>
							{data?.employee_details?.employee_name}
						</span>
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
									<div className={styles.employee_details}>

										<div className={styles.squad_name}>
											<div>Squad</div>

											<div style={{ fontWeight: 'bold', fontSize: 'medium', color: 'black' }}>
												{data?.employee_details?.squad_name}
											</div>

										</div>

										<div className={styles.squad_name}>
											<div>Tribe</div>

											<div style={{ fontWeight: 'bold', fontSize: 'medium', color: 'black' }}>
												{data?.employee_details?.tribe_name}
											</div>

										</div>

										<div className={styles.squad_name}>
											<div>Total Kra</div>

											<div style={{ fontWeight: 'bold', fontSize: 'medium', color: 'black' }}>
												{(list || [])?.length}
											</div>

										</div>

									</div>
									<div style={{ paddingTop: '10px' }}>
										<StyledTable
											columns={columns}
											data={data?.list || []}
											emptyText={TABLE_EMPTY_TEXT}
											loading={loading}
										/>
									</div>

								</div>

								<div className={styles.right_section}>
									<div className={styles.overall_rating}>
										<div className={styles.rating}>
											<div className={styles.average_overall_rating}>
												Average Overall Rating:
												{' '}
												<span className={styles.average_overall_rating_value}>
													{ Math.round((data?.average_overall_rating
													|| DEFAULT_OVERALL_RATING)
												* ROUND_OFF_DIGIT) / ROUND_OFF_DIGIT}
												</span>

											</div>

											<div className={styles.rating_obtained}>
												Rating:
												{' '}
												<span className={styles.average_overall_rating_value}>
													{ Math.round((data?.final_rating
												|| DEFAULT_OVERALL_RATING)
												* ROUND_OFF_DIGIT) / ROUND_OFF_DIGIT}
												</span>
											</div>
										</div>

										<div className={styles.modification_history}>
											<div style={{ textDecoration: 'underline' }}>Modification History:</div>

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
															{formatDate({
																date       : item?.updated_at,
																dateFormat : GLOBAL_CONSTANTS.formats
																	.date['dd MMM yyyy'],
																formatType: 'date',
															})}
														</div>

													</div>
												))
												: (
													<div>
														{' '}
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
										<div>
											{' '}
											<div style={{ paddingBottom: '5px' }}>
												Comment/Feedback:
											</div>
											<Textarea
												style={{ height: '50px' }}
												value={comments}
												onChange={(e) => setCommemts(e)}
												className={styles.text_area}
												rows={6}
												placeholder="Please input your feedback about the employee"
											/>
										</div>
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
