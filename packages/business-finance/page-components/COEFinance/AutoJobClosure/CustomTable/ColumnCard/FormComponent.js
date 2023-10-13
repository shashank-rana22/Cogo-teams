import { cl, Placeholder } from '@cogoport/components';
import { IcMEdit, IcMDelete } from '@cogoport/icons-react';

import showOverflowingNumber from '../../../../commons/showOverflowingNumber';

import styles from './styles.module.css';

const DEFAULT_SPAN = 1;

const HUNDERED_PERCENT = 100;

const TOTAL_SPAN = 12;

function FormComponent({
	fields = [],
	item = {},
	setOpenConfig = () => {},
	openDeleteModal = () => {},
	loading = false,
}) {
	const MAX_LENGTH = 30;
	const rowData = {
		entity: (
			<div className={styles.columnData}>
				{showOverflowingNumber(item?.entity, MAX_LENGTH)}
			</div>
		),

		serviceType: (
			<div className={styles.columnData}>
				{showOverflowingNumber(item?.serviceType, MAX_LENGTH)}
			</div>
		),

		tradeType: (
			<div className={styles.columnData}>
				{showOverflowingNumber(item?.tradeType, MAX_LENGTH)}
			</div>
		),

		selectionCriteriaOp: (
			<div className={styles.columnData}>
				{showOverflowingNumber(item?.selectionCriteriaOp, MAX_LENGTH)}
			</div>
		),

		oprClosureDays: (
			<div className={styles.columnData}>
				{showOverflowingNumber(item?.oprClosureDays, MAX_LENGTH)}
			</div>
		),

		selectionCriteriaFin: (
			<div className={styles.columnData}>
				{showOverflowingNumber(item?.selectionCriteriaFin, MAX_LENGTH)}
			</div>
		),

		finClosureDays: (
			<div className={styles.columnData}>
				{showOverflowingNumber(item?.finClosureDays, MAX_LENGTH)}
			</div>
		),

		editDelete: (
			<>
				<IcMEdit
					className={styles.edit}
					height={18}
					width={18}
					onClick={() => setOpenConfig((prev) => [...prev, item?.id])}
				/>
				<IcMDelete
					className={cl`${styles.button} ${styles.delete} }`}
					height={18}
					width={18}
					onClick={openDeleteModal}
				/>
			</>
		),
	};

	return (
		<div className={styles.flex}>
			{fields?.map((field) => (
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
export default FormComponent;
