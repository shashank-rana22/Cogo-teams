import Placeholder, { Button, cl } from '@cogoport/components';
import { SelectController, InputController, useForm } from '@cogoport/forms';
import { useEffect } from 'react';

import useUpdateJobClosure from '../../../hook/useUpdateJobClosure';
import selectionCriteriaOptions from '../../formOptions/selectionCriteriaOptions';
import serviceTypeOptions from '../../formOptions/serviceTypeOptions';

import styles from './styles.module.css';

const DEFAULT_SPAN = 1;

const HUNDERED_PERCENT = 100;

const TOTAL_SPAN = 12;

function EditableComponent({
	fields = [],
	item = {},
	ENTITY_OPTIONS = [],
	setOpenConfig = () => {},
	setSaveObj = () => {},
	loading = false,
	refetch = {},
}) {
	const {
		id = '', entity = '', selectionCriteriaOp = '', selectionCriteriaFin = '',
		serviceType = '', tradeType = '', oprClosureDays: level1 = '', finClosureDays: level2 = '',
	} = item || {};
	const { control, watch, handleSubmit, setValue } = useForm({
		defaultValues: {
			entity: entity.toString(),
			serviceType,
			tradeType,
			selectionCriteriaOp,
			selectionCriteriaFin,
			level1,
			level2,
		},
	});
	const afterEditData = watch();

	const stringifiedData = JSON.stringify(afterEditData);

	const { apiTrigger = () => {}, loading: updateLoading = false } = useUpdateJobClosure({
		refetch,
		setOpenConfig,
		listOfId: [id],
	});

	const onSubmit = (value) => {
		const {
			entity: entityValue = '', selectionCriteriaOp :selectionCriteriaOpValue = '',
			selectionCriteriaFin: selectionCriteriaFinValue = '',
			serviceType:serviceTypeValue = '', tradeType:tradeTypeValue = '',
			level1:level1Value = '', level2:level2Value = '',
		} = value || {};
		const params = {
			id,
			data: {
				entityValue,
				selectionCriteriaOpValue,
				selectionCriteriaFinValue,
				serviceTypeValue,
				tradeTypeValue,
				level1Value,
				level2Value,
			},
		};
		apiTrigger([params]);
	};

	const rowData = {
		entity: (
			<SelectController
				className={cl`${styles.selectController} ${styles.font12}`}
				control={control}
				name="entity"
				options={ENTITY_OPTIONS}
				rules={{ required: true }}
			/>
		),

		serviceType: (
			<SelectController
				className={cl`${styles.selectController} ${styles.font12}`}
				control={control}
				name="serviceType"
				options={serviceTypeOptions}
				onChange={() => {
					setValue('selectionCriteriaOp', ''); setValue('selectionCriteriaFin', '');
				}}
				rules={{ required: true }}
			/>
		),

		tradeType: (
			<SelectController
				className={cl`${styles.selectController} ${styles.font12}`}
				control={control}
				name="tradeType"
				options={[
					{ label: 'IMPORT', value: 'IMPORT' },
					{ label: 'EXPORT', value: 'EXPORT' },
					{ label: 'LOCAL', value: 'LOCAL' },
					{ label: 'DOMESTIC', value: 'DOMESTIC' },
				]}
				rules={{ required: true }}
			/>
		),

		selectionCriteriaOp: (
			<SelectController
				className={cl`${styles.selectionCriteriaController} ${styles.font12}`}
				control={control}
				name="selectionCriteriaOp"
				options={selectionCriteriaOptions(watch('serviceType'))}
				rules={{ required: true }}
			/>
		),

		oprClosureDays: (
			<InputController
				name="level1"
				size="md"
				className={cl`${styles.inputBox} ${styles.font12}`}
				control={control}
			/>
		),

		selectionCriteriaFin: (
			<SelectController
				className={cl`${styles.selectionCriteriaController} ${styles.font12}`}
				control={control}
				name="selectionCriteriaFin"
				options={selectionCriteriaOptions(watch('serviceType'))}
				rules={{ required: true }}
			/>
		),

		finClosureDays: (
			<InputController
				className={cl`${styles.inputBox} ${styles.font12}`}
				name="level2"
				size="md"
				control={control}
			/>
		),

		editDelete: (
			<>
				<Button
					onClick={() => setOpenConfig((prev) => prev.filter((columnId) => columnId !== id))}
					themeType="secondary"
				>
					Cancel
				</Button>
				<Button
					themeType="primary"
					className={styles.button}
					onClick={handleSubmit(onSubmit)}
					disabled={updateLoading}
				>
					Confirm
				</Button>
			</>
		),
	};
	useEffect(() => {
		setSaveObj((prev) => ({
			...prev,
			[id]: JSON.parse(stringifiedData),
		}));
	}, [stringifiedData, id, setSaveObj]);

	return (
		<div className={styles.flex}>
			{(fields || []).map((field) => (
				<div
					className={styles.col}
					key={field.key}
					style={{
						'--span' : field.span || DEFAULT_SPAN,
						width    : `${
							(field.span || DEFAULT_SPAN) * (HUNDERED_PERCENT / TOTAL_SPAN)
						}px`,
					}}
				>
					{loading ? <Placeholder /> : rowData[field.key]}
				</div>
			))}
		</div>
	);
}
export default EditableComponent;
