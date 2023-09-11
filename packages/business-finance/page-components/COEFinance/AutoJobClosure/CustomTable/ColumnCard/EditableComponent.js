import Placeholder, { Button, cl } from '@cogoport/components';
import { SelectController, InputController, useForm } from '@cogoport/forms';
import { useEffect } from 'react';

import useUpdateJobClosure from '../../../hook/useUpdateJobClosure';
import selectionCriteriaOptions from '../../formOptions/selectionCriteriaOptions.json';
import serviceTypeOptions from '../../formOptions/serviceTypeOptions.json';
import TRADE_TYPE_OPTIONS from '../../formOptions/tradeTypeOptions.json';

import styles from './styles.module.css';

const DEFAULT_SPAN = 1;

const HUNDERED_PERCENT = 100;

const TOTAL_SPAN = 12;

function EditableComponent({
	fields = [],
	item = {},
	ENTITY_OPTIONS = [],
	setOpenConfig = () => { },
	setSaveObj = () => { },
	loading = false,
	refetch = {},
}) {
	const {
		id = '',
		entity = '',
		selectionCriteriaOp = '',
		selectionCriteriaFin = '',
		serviceType = '',
		tradeType = '',
		oprClosureDays: level1 = '',
		finClosureDays: level2 = '',
	} = item || {};
	const { control, watch, handleSubmit, setValue } = useForm({
		defaultValues: {
			entity: entity?.toString(),
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

	const { apiTrigger = () => { }, loading: updateLoading = false } = useUpdateJobClosure({
		refetch: () => {
			refetch();
			setOpenConfig((prev) => (prev.filter((columnId) => (![id].includes(columnId)))));
		},

	});

	const onSubmit = (value) => {
		const params = {
			id,
			data: value,
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
					setValue('selectionCriteriaOp', '');
					setValue('selectionCriteriaFin', '');
				}}
				rules={{ required: true }}
			/>
		),

		tradeType: (
			<SelectController
				className={cl`${styles.selectController} ${styles.font12}`}
				control={control}
				name="tradeType"
				Placeholder={tradeType}
				options={TRADE_TYPE_OPTIONS}
				rules={{ required: true }}
			/>
		),

		selectionCriteriaOp: (
			<SelectController
				className={cl`${styles.selectionCriteriaController} ${styles.font12}`}
				control={control}
				name="selectionCriteriaOp"
				options={selectionCriteriaOptions[watch('serviceType')]}
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
				options={selectionCriteriaOptions[watch('serviceType')]}
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
						width    : `${(field.span || DEFAULT_SPAN) * (HUNDERED_PERCENT / TOTAL_SPAN)
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
