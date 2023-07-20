import { Button, Select, Input } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import Loader from './commons/Loader';
import EditDetails from './components/EditDetails';
import ViewDetails from './components/ViewDetails';
import useFieldServiceOpsHelper from './hooks/useFieldServiceOpsHelper';
import styles from './styles.module.css';
import { TRUCK_STATE_KEYS, VIEW_TYPES } from './utils/pageMappings';

const ROW_SIZE = 5;
const COLUMN_SIZE = 3;
const TRUCK_LOADING_ROWS = Array.from(Array(ROW_SIZE).keys());
const TRUCK_LOADING_COLUMNS = Array.from(Array(COLUMN_SIZE).keys());

function FieldExecutive(props) {
	const {
		viewType,
		setViewType,
		initFormattedData,
		setInitFormattedData,
		truckNumber,
		setTruckNumber,
		otherFormattedData,
		setOtherFormattedData,
		filterOptions,
		isEdit,
		loading,
		handleUpdate,
		setIsEdit,
		updateDetails,
		truckLoading,
		listLoading,
	} = useFieldServiceOpsHelper(props);

	if (loading || truckLoading || listLoading) {
		return (
			<Loader
				rowArray={TRUCK_LOADING_ROWS}
				columnArray={TRUCK_LOADING_COLUMNS}
			/>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.truck_number}>Truck Number</div>
			<div className={styles.heading}>
				<div className={styles.select}>
					<Select
						value={truckNumber[TRUCK_STATE_KEYS.SELECTED_TRUCK_NUMBER]}
						onChange={(e) => setTruckNumber({
							...truckNumber,
							[TRUCK_STATE_KEYS.SELECTED_TRUCK_NUMBER]: e,
						})}
						options={filterOptions}
						placeholder="Select Truck Number"
						size="md"
					/>
				</div>
				<div>
					<Button
						themeType="secondary"
						size="md"
						onClick={() => {
							if (viewType === VIEW_TYPES.VIEW) {
								setViewType(VIEW_TYPES.EDIT);
							} else {
								setViewType(VIEW_TYPES.VIEW);
							}
						}}
					>
						{viewType === VIEW_TYPES.EDIT ? 'View' : 'Edit'}
						{' '}
						Details
					</Button>
				</div>
			</div>

			{isEdit ? (
				<div className={styles.edit_heading}>
					<div className={styles.select}>
						<Input
							value={truckNumber[TRUCK_STATE_KEYS.NEW_TRUCK_NUMBER]}
							onChange={(val) => setTruckNumber({
								...truckNumber,
								[TRUCK_STATE_KEYS.NEW_TRUCK_NUMBER]: val,
							})}
						/>
					</div>
					<Button
						themeType="secondary"
						size="md"
						onClick={() => setIsEdit(!isEdit)}
						disabled={loading}
						style={{ marginLeft: '10px' }}
					>
						Cancel
					</Button>
					<Button
						themeType="accent"
						size="md"
						onClick={handleUpdate}
						disabled={loading}
						style={{ marginLeft: '10px' }}
					>
						Update
					</Button>
				</div>
			) : (
				<Button
					className={styles.edit_btn}
					size="md"
					themeType="secondary"
					onClick={() => setIsEdit(!isEdit)}
					disabled={isEmpty(
						truckNumber[TRUCK_STATE_KEYS.SELECTED_TRUCK_NUMBER],
					)}
				>
					Edit truck no.
				</Button>
			)}

			{viewType === VIEW_TYPES.VIEW ? (
				<ViewDetails
					{...props}
					truckNumber={truckNumber}
					viewType={viewType}
					setViewType={setViewType}
					formattedData={initFormattedData}
					otherFormattedData={otherFormattedData}
				/>
			) : (
				<EditDetails
					{...props}
					truckNumber={truckNumber}
					viewType={viewType}
					setViewType={setViewType}
					formattedData={initFormattedData}
					setInitFormattedData={setInitFormattedData}
					otherFormattedData={otherFormattedData}
					setOtherFormattedData={setOtherFormattedData}
					updateDetails={updateDetails}
					editLoading={loading}
				/>
			)}
		</div>
	);
}

export default FieldExecutive;
