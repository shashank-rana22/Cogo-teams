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

function FormDataTwo({
	fields = [],
	item = {},
	ENTITY_OPTIONS = [],
	setOpenConfig = () => {},
	setSaveObj = () => {},
	loading = false,
	refetch = {},
}) {
	const { control, watch, handleSubmit, setValue } = useForm({
		defaultValues: {
			entity               : item.entity?.toString(),
			serviceType          : item.serviceType,
			tradeType            : item.tradeType,
			selectionCriteriaOp  : item.selectionCriteriaOp,
			selectionCriteriaFin : item.selectionCriteriaFin,
			level1               : item.oprClosureDays,
			level2               : item.finClosureDays,
		},
	});
	const afterEditData = watch();

	const stringifiedData = JSON.stringify(afterEditData);

	const { apiTrigger, loading: updateLoading } = useUpdateJobClosure({
		refetch,
		setOpenConfig,
		listOfId: [item.id],
	});

	const onSubmit = (value) => {
		const params = {
			id   : item?.id,
			data : {
				entity               : value.entity,
				selectionCriteriaOp  : value.selectionCriteriaOp,
				selectionCriteriaFin : value.selectionCriteriaFin,
				serviceType          : value.serviceType,
				tradeType            : value.tradeType,
				level1               : value.level1,
				level2               : value.level2,
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
				placeholder={item?.entity}
				rules={{ required: true }}
			/>
		),

		serviceType: (
			<SelectController
				className={cl`${styles.selectController} ${styles.font12}`}
				control={control}
				name="serviceType"
				options={serviceTypeOptions}
				placeholder={item?.serviceType}
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
				placeholder={item?.tradeType}
				rules={{ required: true }}
			/>
		),

		selectionCriteriaOp: (
			<SelectController
				className={cl`${styles.selectionCriteriaController} ${styles.font12}`}
				control={control}
				name="selectionCriteriaOp"
				options={selectionCriteriaOptions(watch('serviceType'))}
				placeholder="Select selection criteria"
				rules={{ required: true }}
			/>
		),

		oprClosureDays: (
			<InputController
				name="level1"
				size="md"
				placeholder={item?.oprClosureDays}
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
				placeholder="Select selection criteria"
				rules={{ required: true }}
			/>
		),

		finClosureDays: (
			<InputController
				className={cl`${styles.inputBox} ${styles.font12}`}
				name="level2"
				size="md"
				placeholder={item?.finClosureDays}
				control={control}
			/>
		),

		editDelete: (
			<>
				<Button
					onClick={() => setOpenConfig((prev) => prev.filter((columnId) => columnId !== item?.id))}
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
			[item.id]: JSON.parse(stringifiedData),
		}));
	}, [stringifiedData, item.id, setSaveObj]);

	return (
		<div className={styles.flex}>
			{fields.map((field) => (
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
export default FormDataTwo;
