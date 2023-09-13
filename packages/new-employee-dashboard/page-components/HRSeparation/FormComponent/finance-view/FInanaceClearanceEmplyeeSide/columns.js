import { Checkbox } from '@cogoport/components';
import { InputController } from '@cogoport/forms';
import React from 'react';

import styles from './styles.module.css';

const fnfColumns = ({
	control = {},
	errors = {},
	totalRecoverableAmountFun = () => {},
}) => ([
	{
		Header   : 'PARTICULAR',
		accessor : (item) => (
			<section>
				{/* <InputController
				control={control}
				className={styles.input_table}
			/> */}
				<InputController
					control={control}
					placeholder="Type Amount here"
					className={styles.name_input}
					name={`${item.particular}RecoverableAmount`}
					size="md"
					type="number"
					onChange={totalRecoverableAmountFun}
					rules={{ required: { value: true, message: '*This Field is required' } }}
				/>
				{errors?.item?.particular && (
					<div className={styles.error}>*Required</div>
				)}
			</section>
		),
	},
	{
		Header   : 'CATEGORY',
		accessor : 'category',
	},
	{
		Header   : 'RECOVERABLE AMOUNT',
		accessor : (item) => (
			<section>
				{/* <InputController
					control={control}
					className={styles.input_table}
				/> */}
				<InputController
					control={control}
					placeholder="Type Amount here"
					className={styles.name_input}
					name={`${item.particular}RecoverableAmount`}
					size="md"
					type="number"
					onChange={totalRecoverableAmountFun}
					rules={{ required: { value: true, message: '*This Field is required' } }}
				/>
				{errors?.item?.particular && (
					<div className={styles.error}>*Required</div>
				)}
			</section>
		),
	},
	// {
	// 	Header   : 'APPLICABILITY',
	// 	accessor : (item) => (
	// 		<section className={styles.checkbox_yes}>
	// 			<CheckboxController
	// 				className={styles.Checkbox}
	// 				control={control}
	// 				onChange={totalRecoverableAmountFun}
	// 				name={`${item?.particular}applicability`}
	// 				rules={{ required: { value: true, message: '*required' } }}
	// 			/>
	// 			<div>YES</div>
	// 			{errors?.item?.particular && (
	// 				<div className={styles.error}>*Required</div>
	// 			)}
	// 		</section>
	// 	),
	// },

]);

export const outstandingColumns = [
	{
		Header   : 'CLEAR',
		accessor : () => (
			<section className={styles.checkbox_yes}>
				<Checkbox />
				<div>Cleared</div>
			</section>
		),
	},
	{ Header: 'Legal Business Name ', accessor: 'legalbusinessname' },
	{ Header: 'DUES', accessor: 'dues' },
	{ Header: '1-30 (Days)', accessor: '1-30' },
	{ Header: '31-45 (Days)', accessor: '31-45' },
	{ Header: '46-60 (Days)', accessor: '46-60' },
	{ Header: '61-90 (Days)', accessor: '61-90' },
	{ Header: '91-180 (Days)', accessor: '91-180' },
	{ Header: '181-365 (Days)', accessor: '181-365' },
	{ Header: '365+ (Days)', accessor: '365' },
	{ Header: 'Open Invoice (Amount)', accessor: 'openinvoice' },
	{ Header: 'ON ACCOUNT', accessor: 'onaccount' },
	{ Header: 'TOTAL OUTSTANDING', accessor: 'totaloutstanding' },

];

export default fnfColumns;
