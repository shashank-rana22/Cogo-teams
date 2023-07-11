import { Button } from '@cogoport/components';
import { differenceInDays } from '@cogoport/utils';
import { useState } from 'react';
import RoutePortForm from './EditForm';
import PortForm from './PortForm';
import RoutePort from './RoutePort';
import styles from './styles.module.css';

function RouteDetails({ route, new_array_aa, setNew_array_aa }) {
	const [edit, setEdit] = useState(false);
	const [portEdit, setPortEdit] = useState(false);
	const [add, setAdd] = useState(null);
	const [addNew, setAddNew] = useState(null);
	const [deletePort, setDeletePort] = useState(null);
	const modified_array = Array.isArray(route) ? [...route] : [];

	let see = [];
	const handleClick = (input) => {
		if (input === 'edit') {
		  setNew_array_aa(route);
		  setEdit(true);
		} else {
		  setEdit(false);
		}
	  };

	const objectToInsert = { display_name: '', location_id: '', order: null, port_code: '' };

	const onClickAdd = (index) => {
		setAdd(index);
		see = [...modified_array?.slice(0, index), objectToInsert, ...modified_array?.slice(index, modified_array.length)];
		const updated_see = see.map((obj, i) => ({ ...obj, order: i }));
		setNew_array_aa(updated_see);
		setAddNew(index);
	};
	const onClickEdit = (index) => {
		setAdd(index);
		setAddNew(null);
	};
	const onClickDelete = (index) => {
		if (!portEdit) {
			setAdd(null);
			setDeletePort(index);
			see = [...new_array_aa.slice(0, index), ...new_array_aa.slice(index + 1, new_array_aa.length)];
			const updated_see = see.map((obj, i) => ({ ...obj, order: i }));
			setNew_array_aa(updated_see);
		} else {
			setAdd(null);
		}
		setPortEdit(false);
	};

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
							if (index === add) {
								return (
									<>
										<PortForm
											isLast
											port={port}
											setAdd={setAdd}
											deletePort={deletePort}
											setDeletePort={setDeletePort}
											diffInDays={4}
											index={index}
											onClickDelete={onClickDelete}
										/>
										{addNew ? (
											<RoutePortForm
												isFirst={index === 0}
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
												isLast={index === route.length - 1}
											/>
										) : null}

									</>

								);
							}
							return (
								<RoutePortForm
									isFirst={index === 0}

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
									isLast={index === route.length - 1}
								/>
							);
						})}
					</div>
				)}

		</div>
	);
}
export default RouteDetails;
