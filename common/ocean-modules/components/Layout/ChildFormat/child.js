import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMDelete } from '@cogoport/icons-react';
import { upperCase } from '@cogoport/utils';
import React, { useMemo } from 'react';

import getElementController from '../getController';
import getErrorMessage from '../getErrorMessage';
import getNewControls from '../helpers/getNewControls';
import getTotalFields from '../helpers/getTotalFields';

import styles from './styles.module.css';

const ELEMENTS_INCR_BY = 1;
const INDEX_INCR_BY = 1;
const REMOVE_UPTO_INDEX = 1;

function Child({
	controls = [],
	control = {},
	index = '',
	name = '',
	remove = '',
	showDeleteButton = true,
	noDeleteButtonTill = 0,
	field = {},
	disabled = false,
	error = {},
	formValues = {},
	showElements = {},
}) {
	const { TOTAL_FIELDS } = getTotalFields({ fields: controls, showElements });

	const keysForFields = useMemo(
		() => Array(TOTAL_FIELDS.length).fill(null).map(() => Math.random()),
		[TOTAL_FIELDS.length],
	);

	if (formValues?.documents?.[GLOBAL_CONSTANTS.zeroth_index]?.url?.fileName === ''
	|| formValues?.documents_commercial_invoice?.[GLOBAL_CONSTANTS.zeroth_index]?.url?.fileName === ''
	|| formValues?.documents_packing_list?.[GLOBAL_CONSTANTS.zeroth_index]?.url?.fileName === '') {
		const elements = document.querySelectorAll('.ui_upload_filesuccess_container');

		for (let i = 0; i < elements.length; i += ELEMENTS_INCR_BY) {
			elements[i].style.display = 'none';
		}
	}

	return (
		<div className={styles.fieldarray} key={field.id}>
			<h3 className={styles.heading}>
				{upperCase(name)}
				{' '}
				{index + INDEX_INCR_BY}
			</h3>

			{TOTAL_FIELDS.map((rowFields, i) => (
				<div className={styles.row} key={keysForFields[i]}>
					{rowFields.map((controlItem) => {
						const newControl = getNewControls(controlItem);

						const Element = getElementController(newControl.type);

						const errorOriginal = getErrorMessage({
							error : error?.[controlItem.name],
							rules : controlItem?.rules,
							label : controlItem?.label,
						});

						const show = 'show' in controlItem ? controlItem.show : true;

						const EXTRA_PROPS = {};
						if (controlItem.customProps?.options) {
							EXTRA_PROPS.options = controlItem.customProps.options[index];
						}
						const disable = index < noDeleteButtonTill && controlItem.name === 'code';

						if (!Element || !show) return null;
						return (
							<div
								className={styles.element}
								style={{ width: newControl.flex || '49%' }}
								key={controlItem.name}
							>
								<h4 className={styles.label}>
									{controlItem?.label}
								</h4>
								<Element
									{...newControl}
									{...EXTRA_PROPS}
									style={{ minWidth: '0px' }}
									key={`${name}.${index}.${controlItem.name}`}
									name={`${name}.${index}.${controlItem.name}`}
									index={index}
									control={control}
									size="sm"
									disabled={disabled || disable}
								/>
								<p className={styles.errors}>
									{errorOriginal}
								</p>
							</div>
						);
					})}

				</div>
			))}

			{showDeleteButton && index >= noDeleteButtonTill && !disabled ? (
				<div className={styles.delete_icon}>
					<hr />
					<IcMDelete
						className={styles.icon}
						onClick={() => remove(index, REMOVE_UPTO_INDEX)}
					/>
				</div>
			) : null}
		</div>
	);
}
export default Child;
