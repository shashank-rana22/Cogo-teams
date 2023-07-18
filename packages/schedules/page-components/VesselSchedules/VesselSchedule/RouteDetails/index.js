import { Button } from '@cogoport/components';
import { differenceInDays } from '@cogoport/utils';

import useUpdateVesselSchedule from '../../hooks/useUpdateVesselSchedule';

import RoutePortForm from './EditForm';
import PortForm from './PortForm';
import RoutePort from './RoutePort';
import styles from './styles.module.css';

const ZERO = 0;
const ONE = 1;
const TEN = 10;
function RouteDetails({
	data, route, finalRoute, setFinalRoute, handleMouseEnter,
	handleMouseLeave, refetch,
}) {
	const {
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
		onSubmitHandler,
	} = useUpdateVesselSchedule({ route, data, finalRoute, setFinalRoute, refetch });
	return (
		<div className={styles.route_details}>
			<div className={styles.heading}>
				<div>
					Total Transit :
					{' '}
					{route
              && differenceInDays(
              	Date.parse(route?.[route.length - ONE]?.eta?.slice(ZERO, TEN)),
              	Date.parse(route?.[ZERO]?.etd?.slice(ZERO, TEN)),
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
							<Button
								size="md"
								className={styles.button_style}
								onClick={onSubmitHandler}
							>
								Save Changes
							</Button>
						</div>

					)
				}

			</div>
			{!edit ? (
				<div className={styles.route_points}>
					{route?.map((port, index) => {
						if (index === route.length - ONE) {
							return (
								<RoutePort
									key={port?.id}
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
								key={port?.id}
								isFirst={index === ZERO}
								port={port}
								diffInDays={differenceInDays(
									Date.parse(route?.[index + ONE]?.etd?.slice(ZERO, TEN)),
									Date.parse(route?.[index]?.etd?.slice(ZERO, TEN)),
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
											isFirst={index === ZERO}
											isLast={index === route.length - ONE}
											port={port}
											diffInDays={ZERO}
											index={index}
											onClickDelete={onClickDelete}
											setSubmit={setSubmit}
										/>
										{add ? (
											<RoutePortForm
												isFirst={index === ZERO}
												isLast={index === route.length - ONE}
												port={port}
												diffInDays={differenceInDays(
													Date.parse(route?.[index + ONE]?.etd?.slice(ZERO, TEN)),
													Date.parse(route?.[index]?.etd?.slice(ZERO, TEN)),
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
										key={port?.id}
										isFirst={index === ZERO}
										isLast={index === route.length - ONE}
										port={port}
										diffInDays={differenceInDays(
											Date.parse(route?.[index + ONE]?.etd?.slice(ZERO, TEN)),
											Date.parse(route?.[index]?.etd?.slice(ZERO, TEN)),
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
