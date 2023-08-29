import { Button, Input, CreatableSelect } from '@cogoport/components';
import { AsyncSelect } from '@cogoport/forms';
import { isEmpty, startCase } from '@cogoport/utils';
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
		viewType = '',
		setViewType = () => {},
		initFormattedData = {},
		setInitFormattedData = () => {},
		truckNumber = {},
		setTruckNumber = () => {},
		truckType = {},
		setTruckType = () => {},
		otherFormattedData = {},
		setOtherFormattedData = () => {},
		filterOptions = {},
		isEdit = false,
		loading = false,
		handleUpdate = () => {},
		setIsEdit = () => {},
		updateDetails = () => {},
		truckLoading = false,
		listLoading = false,
		fieldExecTabConfig = {},
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
					<div className={styles.dropdown}>
						<CreatableSelect
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
					<div className={styles.dropdown}>
						<AsyncSelect
							asyncKey="list_truck_types"
							labelKey="display_name"
							valueKey="truck_name"
							value={truckType}
							onChange={(val) => (setTruckType(val))}
							renderLabel={(opt) => (
								<div>
									{startCase(opt?.truck_name)}
									{' '}
									-
									{' '}
									{startCase(opt?.display_name)}
								</div>
							)}
						/>
					</div>
				</div>
				{fieldExecTabConfig?.edit_details_visible ? (
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
				) : null}

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
					themeType="accent"
					onClick={() => setIsEdit(!isEdit)}
					disabled={isEmpty(
						truckNumber[TRUCK_STATE_KEYS.SELECTED_TRUCK_NUMBER],
					) || !filterOptions.some(
						(fil) => fil.value === truckNumber[TRUCK_STATE_KEYS.SELECTED_TRUCK_NUMBER],
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
					filterOptions={filterOptions}
					fieldExecTabConfig={fieldExecTabConfig}
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
					fieldExecTabConfig={fieldExecTabConfig}
				/>
			)}
		</div>
	);
}

export default FieldExecutive;
