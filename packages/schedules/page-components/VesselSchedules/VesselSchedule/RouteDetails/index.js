import { Button } from '@cogoport/components';
import { differenceInDays } from '@cogoport/utils';

import useUpdateVesselSchedule from '../../hooks/useUpdateVesselSchedule';

import RoutePortForm from './EditForm';
import PortForm from './PortForm';
import RoutePort from './RoutePort';
import styles from './styles.module.css';

function RouteDetails({
	data, route, finalRoute, setFinalRoute, handleMouseEnter,
	handleMouseLeave,
}) {
	const {
		updateVesselSchedule,
		setPortEdit,
		setSubmit,
		edit,
		form,
		add,
		deletePort,
		handleClick,
		onClickAdd,
		onClickEdit,
		onClickDelete,
	} = useUpdateVesselSchedule({ route, data, finalRoute, setFinalRoute });
	return (
		<div className={styles.route_details}>
			<div className={styles.heading}>
				<div>
					Total Transit :
					{' '}
					{route
              && differenceInDays(
              	Date.parse(route?.[route.length - 1]?.eta?.slice(0, 10)),
              	Date.parse(route?.[0]?.etd?.slice(0, 10)),
              )}
					{' '}
					Days
				</div>
				{
					!edit ? (
						<div>
							<Button size="md" onClick={() => handleClick('edit')}>Edit</Button>
						</div>
					) : (
						<div className={styles.save}>
							<Button
								themeType="secondary"
								size="md"
								className={styles.button_style}
								onClick={() => handleClick('cancel')}
							>
								Cancel
							</Button>
							<Button size="md" className={styles.button_style} onClick={updateVesselSchedule}>Save Changes</Button>
						</div>

					)
				}

			</div>
			{!edit ? (
				<div className={styles.route_points}>
					{route?.map((port, index) => {
						if (index === route.length - 1) {
							return (
								<RoutePort
									isLast
									port={port}
									handleMouseEnter={handleMouseEnter}
									handleMouseLeave={handleMouseLeave}
									index={index}
								/>
							);
						}
						return (
							<RoutePort
								isFirst={index === 0}
								port={port}
								diffInDays={differenceInDays(
									Date.parse(route?.[index + 1]?.etd?.slice(0, 10)),
									Date.parse(route?.[index]?.etd?.slice(0, 10)),
								)}
								handleMouseEnter={handleMouseEnter}
								handleMouseLeave={handleMouseLeave}
								index={index}
							/>
						);
					})}
				</div>
			)
				: (
					<div className={styles.route_points}>
						{route?.map((port, index) => {
							if (index === form && !deletePort?.includes(index)) {
								return (
									<>
										<PortForm
											isFirst={index === 0}
											isLast={index === route.length - 1}
											port={port}
											diffInDays={0}
											index={index}
											onClickDelete={onClickDelete}
											setSubmit={setSubmit}
										/>
										{add ? (
											<RoutePortForm
												isFirst={index === 0}
												isLast={index === route.length - 1}
												port={port}
												diffInDays={differenceInDays(
													Date.parse(route?.[index + 1]?.etd?.slice(0, 10)),
													Date.parse(route?.[index]?.etd?.slice(0, 10)),
												)}
												index={index}
												onClickAdd={onClickAdd}
												onClickEdit={onClickEdit}
												setPortEdit={setPortEdit}
												onClickDelete={onClickDelete}
												add={add}
											/>
										) : null}

									</>

								);
							}
							if (!deletePort?.includes(index)) {
								return (
									<RoutePortForm
										isFirst={index === 0}
										isLast={index === route.length - 1}
										port={port}
										diffInDays={differenceInDays(
											Date.parse(route?.[index + 1]?.etd?.slice(0, 10)),
											Date.parse(route?.[index]?.etd?.slice(0, 10)),
										)}
										index={index}
										onClickAdd={onClickAdd}
										onClickEdit={onClickEdit}
										setPortEdit={setPortEdit}
										onClickDelete={onClickDelete}
										add={add}

									/>
								);
							}
						})}
					</div>
				)}

		</div>
	);
}
export default RouteDetails;
