import { Button } from '@cogoport/components';
import { Layout } from '@cogoport/ocean-modules';
import { useRef, useState } from 'react';

import useGetCommodityOptions from '../../../hooks/useGetCommodityOptions';

import EditBookingParams from './EditBookingParams';
import { getCanShipmentRollover } from './helpers/getCanShipmentRollover';
import useHandleSubmit from './helpers/useHandleSubmit';
import useStepExecution from './helpers/useStepExecution';
import styles from './styles.module.css';

function ExecuteStep({
	task = {},
	stepConfig = {},
	onCancel = () => {},
	refetch = () => {},
	currentStep = 0,
	isLastStep = false,
	getApisData = {},
	selectedMail = [],
	serviceIdMapping = [],
	shipment_data = {},
}) {
	const [commodityDetails, setCommodityDetails] = useState({
		commodity    : '',
		subCommodity : '',
		unit         : '',
	});

	const { options, allCommodity } = useGetCommodityOptions();

	const subCommodityOptions = (allCommodity || [])
		.find(
			(item) => item?.commodity
			=== (shipment_data?.commodity_category || commodityDetails?.commodity),
		)
		?.subCommodityClassification?.map((ele) => ({
			label : ele?.subCommodityDisplayName,
			value : ele?.subCommodity,
		}));

	const {
		formProps,
		fields,
		showElements,
	} = useStepExecution({
		task,
		stepConfig,
		getApisData,
		selectedMail,
		setCommodityDetails,
		options,
		subCommodityOptions,
	});
	const { control, formState: { errors }, handleSubmit, watch } = formProps;

	const { editBookingParams } = showElements || {};

	const editParams = useRef(null);

	const isShipmentRolloverable = getCanShipmentRollover(getApisData);

	const { loading: isLoading, setIsLoading, onSubmit } = useHandleSubmit({
		finalConfig: stepConfig,
		task,
		onCancel,
		refetch,
		serviceIdMapping,
		currentStep,
		isLastStep,
		getApisData,
		showElements,
		commodityDetails,
		setCommodityDetails,
	});

	const handleTaskSubmit = async () => {
		if (isShipmentRolloverable && editBookingParams) {
			setIsLoading(true);

			try {
				await editParams.current?.handleSubmit();
				handleSubmit(onSubmit)();
			} finally {
				setIsLoading(false);
			}
		} else {
			handleSubmit(onSubmit)();
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.form}>
				<Layout
					fields={fields}
					control={control}
					errors={errors}
					showElements={showElements}
					formValues={watch()}
					shipment_id={task?.shipment_id}
				/>

				{isShipmentRolloverable && editBookingParams ? (
					<EditBookingParams
						task={task}
						getApisData={getApisData}
						formProps={formProps}
						ref={editParams}
					/>
				) : null}
			</div>

			<div className={styles.button_container}>
				<Button
					themeType="secondary"
					onClick={() => onCancel()}
					disabled={isLoading}
				>
					CANCEL
				</Button>

				<Button themeType="primary" disabled={isLoading} onClick={handleTaskSubmit}>
					{isLastStep ? 'SUBMIT' : 'NEXT'}
				</Button>
			</div>
		</div>
	);
}

export default ExecuteStep;
