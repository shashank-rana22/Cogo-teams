import { Button } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';
import { useState } from 'react';

import WeekCalendar from '../../ServiceLanesList/WeekCalendar';
import WeekFrequency from '../../ServiceLanesList/WeekFrequency';

import PortForm from './PortForm';
import RoutePort from './RoutePort';
import RoutePortForm from './RoutePortForm';
import styles from './styles.module.css';

function RouteDetails({ route, dayOfWeek }) {
	const totalTransit = route?.[route?.length - 1]?.eta_day_count - route?.[0]?.etd_day_count;
	const [edit, setEdit] = useState(false);
	const [add, setAdd] = useState(null);
	const [addNew, setAddNew] = useState(null);
	const handleClick = (input) => {
		if (input === 'edit') {
		  setEdit(true);
		} else {
		  setEdit(false);
		}
	};
	const onClickAdd = (index) => {
		setAdd(index);
		setAddNew(index);
	};
	const onClickEdit = (index) => {
		setAdd(index);
		setAddNew(null);
	};
	const onClickDelete = () => {
		setAdd(null);
		setAddNew(null);
	};
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
			dayOfWeek={dayOfWeek || 10}
			startingDay={route?.[0]?.eta_day - 1}
		/>
                            &ensp;
		<WeekCalendar
			dayOfWeek={dayOfWeek || 10}
			startingDay={route?.[0]?.eta_day - 1}
		/>
	</div>
                            ) : null
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
							<Button themeType="secondary" size="md" className={styles.button_style} onClick={() => handleClick('save')}>Cancel</Button>
							<Button size="md" className={styles.button_style} onClick={() => handleClick('save')}>Save Changes</Button>
						</div>

					)
				}
			</div>
			{!edit ? (
				<div className={styles.route_points}>
					{route?.map((port, index) => {
                	if (index === route.length - 1) { return <RoutePort isLast port={port} />; }
                	return (
	<RoutePort
		isFirst={index === 0}
		port={port}
		diffInDays={
													route?.[index + 1]?.eta_day_count
													- route?.[index]?.etd_day_count
												}
		handleClick={handleClick}
	/>
);
					})}
				</div>
			) : (

				<div className={styles.route_points}>
					{route?.map((port, index) => {
						if (index === add) {
							return (
								<>
									<PortForm
										isLast={index === route.length - 1}
										port={port}
										isFirst={index === 0}
										onClickAdd={onClickAdd}
										index={index}
										onClickDelete={onClickDelete}
									/>
									{addNew ? (
										<RoutePortForm
											isFirst={index === 0}
											port={port}
											diffInDays={route?.[index + 1]?.eta_day_count - route?.[index]?.etd_day_count}
											onClickAdd={onClickAdd}
											add={add}
											index={index}
											onClickEdit={onClickEdit}
										/>
									) : null}

								</>

							);
						}
                	if (index === route.length - 1) { return <RoutePortForm isLast port={port} onClickAdd={onClickAdd} index={index} onClickEdit={onClickEdit} />; }
                	return (
	<RoutePortForm
		isFirst={index === 0}
		port={port}
		diffInDays={route?.[index + 1]?.eta_day_count - route?.[index]?.etd_day_count}
		onClickAdd={onClickAdd}
		add={add}
		index={index}
		onClickEdit={onClickEdit}
	/>

);
					})}

				</div>

			)}

		</div>
	);
}
export default RouteDetails;
