import { Button, Select } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';

import useUpdateServiceLane from '../../hooks/useUpdateServiceLane';
import WeekCalendar from '../../ServiceLanesList/WeekCalendar';
import WeekFrequency from '../../ServiceLanesList/WeekFrequency';

import PortForm from './PortForm';
import RoutePort from './RoutePort';
import RoutePortForm from './RoutePortForm';
import styles from './styles.module.css';

const ZERO = 0;
const ONE = 1;

function RouteDetails({ route, dayOfWeek, finalRoute, setFinalRoute, loading, data, refetch }) {
	const {
		totalTransit,
		handleClick,
		onClickAdd,
		onClickEdit,
		onClickDelete,
		onSubmitHandler,
		setSubmit,
		setPortEdit,
		edit,
		deletePort,
		form,
		add,
		frequency,
		setFrequency,
	} = useUpdateServiceLane({ route, finalRoute, setFinalRoute, data, refetch });
	const FREQUENCY_CHOICES = [
		{ label: 'Daily', value: 1 },
		{ label: 'Weekly', value: 7 },
		{ label: 'Monthly', value: 12 },
	];
	return (
		<div className={styles.box}>
			<div className={styles.header}>
				<div>
					<div className={styles.total_transit}>
						Total Transit &emsp;:
						<div className={styles.total_transit_data}>

							{' '}
							{totalTransit}
							{' '}
							Days
						</div>
					</div>
					<div className={styles.frequency}>
						Frequency &emsp;&emsp;:
						{
                            !edit ? (
	<div className={styles.frequency_data}>
		<WeekFrequency
			dayOfWeek={dayOfWeek || '-'}
			startingDay={Number(route?.[ZERO]?.eta_day) - ONE}
		/>
                            &ensp;
		<WeekCalendar
			dayOfWeek={dayOfWeek || '-'}
			startingDay={Number(route?.[ZERO]?.eta_day) - ONE}
		/>
	</div>
                            ) : (
	<Select
		className={styles.frequency_select}
		options={FREQUENCY_CHOICES}
		value={frequency}
		onChange={(value) => { setFrequency(value); }}
	/>
                            )
                        }

					</div>
				</div>
				{
					!edit ? (
						<div className={styles.button}>
							<Button
								type="button"
								themeType="primary"
								size="md"
								onClick={() => handleClick('edit')}
							>
								<IcMEdit />
								{' '}
							&ensp;Edit
							</Button>
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
						if (index === route.length - ONE) { return <RoutePort isLast port={port} key={port?.id} />; }
						return (
							<RoutePort
								isFirst={index === ZERO}
								port={port}
								key={port?.id}
								diffInDays={
													Number(route?.[index + ONE]?.eta_day_count)
													- Number(route?.[index]?.etd_day_count)
												}
								handleClick={handleClick}
								loading={loading}
							/>
						);
					})}
				</div>
			) : (

				<div className={styles.route_points}>
					{route?.map((port, index) => {
						if (index === form && !deletePort?.includes(index)) {
							return (
								<>
									<PortForm
										isFirst={index === 0}
										isLast={index === route.length - 1}
										port={port}
										index={index}
										onClickDelete={onClickDelete}
										setSubmit={setSubmit}
									/>
									{add ? (
										<RoutePortForm
											key={port?.id}
											isFirst={index === 0}
											isLast={index === route.length - 1}
											port={port}
											diffInDays={Number(route?.[index + 1]?.eta_day_count)
												- Number(route?.[index]?.etd_day_count)}
											onClickAdd={onClickAdd}
											onClickEdit={onClickEdit}
											setPortEdit={setPortEdit}
											onClickDelete={onClickDelete}
											index={index}

										/>
									) : null}

								</>

							);
						}
						if (!deletePort?.includes(index)) {
							return (
								<RoutePortForm
									key={port?.id}
									isFirst={index === 0}
									isLast={index === route.length - 1}
									port={port}
									diffInDays={Number(route?.[index + 1]?.eta_day_count)
										- Number(route?.[index]?.etd_day_count)}
									onClickAdd={onClickAdd}
									index={index}
									onClickEdit={onClickEdit}
									setPortEdit={setPortEdit}
									onClickDelete={onClickDelete}
								/>

							);
						}
						return null;
					})}

				</div>

			)}

		</div>
	);
}
export default RouteDetails;
