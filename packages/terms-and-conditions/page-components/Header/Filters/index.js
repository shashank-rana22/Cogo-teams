// import FilterContent from '@cogo/business-modules/components/filters';
import { Button, Text, Popover } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import { getFieldController } from '../../../utlis/getFieldController';
import getShowElements from '../../../utlis/getShowElements';
import getOptions from '../../../utlis/service-to-trade-type-mappings';

import styles from './styles.module.css';

function Filters(props) {
	const {
		general: { isMobile = false },
	} = useSelector((state) => state);
	const { filterProps, viewFromDemand, setVisible } = props;
	const {
		fields, applyFilters, reset, controls, watch, control, newField, filters, handleSubmit, getListTermsAndConditionsApi,
	} = filterProps;
	const { service, trade_type } = watch();
	const showElements = getShowElements({ service, trade_type, controls });
	return (
		<div>
			<div className={styles.btn_align}>
				<Button onClick={handleSubmit}>Reset</Button>
				<Button onClick={() => { setVisible(false); getListTermsAndConditionsApi(); }}>Show</Button>
			</div>

			{newField.map((controlItem) => {
				const elementItem = { ...controlItem };
				const { name, label, type } = elementItem || {};
				const Element = getFieldController(type);
				const show =						!(controlItem.name in showElements)
						|| showElements[controlItem.name];
				if (!Element) { return null; }

				// if (name === 'user_id' && isEmpty(watchOrgId)) { return null; }

				return (
					show ? (
						<div
							key={controlItem.name}
							className={styles.field}
						>
							{label && type !== 'checkbox'
							&& (
								<div className={styles.label}>
									<div className={styles.sub_label}>{label}</div>
									{controlItem.name === 'additional_information'
									&& <div className={styles.info_label}>(max 200 characters)</div>}
								</div>
							)}
							<Element
								{...elementItem}
								size="sm"
								key={name}
								control={control}
								id={`${name}_input`}
							/>
							{/* <div className={styles.error}>{errors?.[controlItem.name] && 'Required'}</div> */}
						</div>
					) : null
				);
			})}
		</div>

	);
}

export default Filters;
