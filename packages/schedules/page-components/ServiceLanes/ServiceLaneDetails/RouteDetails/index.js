import { Button } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';
import { useState } from 'react';

import WeekCalendar from '../../ServiceLanesList/WeekCalendar';
import WeekFrequency from '../../ServiceLanesList/WeekFrequency';

import PortForm from './PortForm';
import RoutePort from './RoutePort';
import RoutePortForm from './RoutePortForm';
import styles from './styles.module.css';

function RouteDetails({ route, dayOfWeek, finalRoute, setFinalRoute }) {
	const totalTransit = route?.[route?.length - 1]?.eta_day_count - route?.[0]?.etd_day_count;
	const [edit, setEdit] = useState(false);
	const [portEdit, setPortEdit] = useState(false);
	const [form, setForm] = useState(null);
	const [add, setAdd] = useState(null);
	const [deletePort, setDeletePort] = useState(null);
	const tempRoute = Array.isArray(route) ? [...route] : [];

	let modifiedRoute = [];
	const handleClick = (input) => {
		if (input === 'edit') {
			setFinalRoute(route);
		  setEdit(true);
		} else {
		  setEdit(false);
		}
		setPortEdit(false);
		setForm(null);
		setAdd(null);
		setDeletePort(null);
	  };
	const objectToInsert = { display_name: '', location_id: '', order: null, port_code: '' };

	const onClickAdd = (index) => {
		setForm(index);
		modifiedRoute = [...tempRoute?.slice(0, index), objectToInsert, ...tempRoute?.slice(index, tempRoute.length)];
		const order = modifiedRoute.map((obj, i) => ({ ...obj, order: i }));
		setFinalRoute(order);
		setAdd(index);
	};
	const onClickEdit = (index) => {
		setForm(index);
		setAdd(null);
	};
	const onClickDelete = (index) => {
		if (add) {
			setAdd(null);
		} else if (!portEdit) {
			setForm(null);
			setDeletePort((prevDeletePort) => (prevDeletePort ? [...prevDeletePort, index] : [index]));
			modifiedRoute = [...finalRoute.slice(0, index), ...finalRoute.slice(index + 1, finalRoute.length)];
			const order = modifiedRoute.map((obj, i) => ({ ...obj, order: i }));
			setFinalRoute(order);
		}
		setForm(null);
		setPortEdit(false);
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
						if (index === form && !deletePort?.includes(index)) {
							return (
								<>
									<PortForm
										isFirst={index === 0}
										isLast={index === route.length - 1}
										port={port}
										index={index}
										onClickDelete={onClickDelete}
									/>
									{add ? (
										<RoutePortForm
											isFirst={index === 0}
											isLast={index === route.length - 1}
											port={port}
											diffInDays={route?.[index + 1]?.eta_day_count - route?.[index]?.etd_day_count}
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
									isFirst={index === 0}
									isLast={index === route.length - 1}
									port={port}
									diffInDays={route?.[index + 1]?.eta_day_count - route?.[index]?.etd_day_count}
									onClickAdd={onClickAdd}
									index={index}
									onClickEdit={onClickEdit}
									setPortEdit={setPortEdit}
									onClickDelete={onClickDelete}
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
