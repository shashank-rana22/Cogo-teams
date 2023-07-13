import { Button } from '@cogoport/components';
import { differenceInDays } from '@cogoport/utils';
import { useState } from 'react';

import getPayload from '../../helpers/update_payload';

import RoutePortForm from './EditForm';
import PortForm from './PortForm';
import RoutePort from './RoutePort';
import styles from './styles.module.css';

function RouteDetails({ data, route, finalRoute, setFinalRoute }) {
	const [edit, setEdit] = useState(false);
	const [portEdit, setPortEdit] = useState(false);
	const [form, setForm] = useState(null);
	const [add, setAdd] = useState(null);
	const [deletePort, setDeletePort] = useState(null);
	const tempRoute = Array.isArray(route) ? [...route] : [];
	const [submit, setSubmit] = useState(null);

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

	const onClickAdd = (index) => {
		setForm(index);
		modifiedRoute = [...tempRoute?.slice(0, index), { ...submit }, ...tempRoute?.slice(index, tempRoute.length)];
		const order = modifiedRoute.map((obj, i) => ({ ...obj, order: i }));
		setFinalRoute(order);
		setAdd(index);
	};
	const onClickEdit = (index) => {
		setForm(index);
		setAdd(null);
	};
	const onClickDelete = (index) => {
		if (add !== null) {
			const updatedFinalRoute = [...finalRoute];
			if (index >= 0 && index < updatedFinalRoute.length) {
				updatedFinalRoute.splice(index, 1);
			}
			setFinalRoute(updatedFinalRoute);
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
		setSubmit(null);
	};
	const payload = getPayload({ finalRoute, data });
	console.log(payload);
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
							<Button themeType="secondary" size="md" className={styles.button_style} onClick={() => handleClick('save')}>Cancel</Button>
							<Button size="md" className={styles.button_style} onClick={() => handleClick('save')}>Save Changes</Button>
						</div>

					)
				}

			</div>
			{!edit ? (
				<div className={styles.route_points}>
					{route?.map((port, index) => {
						if (index === route.length - 1) return <RoutePort isLast port={port} />;
						return (
							<RoutePort
								isFirst={index === 0}
								port={port}
								diffInDays={differenceInDays(
									Date.parse(route?.[index + 1]?.etd?.slice(0, 10)),
									Date.parse(route?.[index]?.etd?.slice(0, 10)),
								)}
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
