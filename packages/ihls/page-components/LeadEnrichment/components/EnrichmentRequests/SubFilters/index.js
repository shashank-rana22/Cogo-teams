import { Button } from '@cogoport/components';
import React from 'react';

import { getFieldController } from '../../../../../commons/Form/getFieldController';
import enrichment_request_filters from '../../../configurations/get-enrichment-request-filters';

import styles from './styles.module.css';

function SubFilters({
	control = [], handleSubmit = () => {},
	handleClick = () => {}, onClickCancel = () => {},
	loading = false,
	// watch = () => {},
}) {
	// const enriched = watch('enrichment_status');
	return (
		<div className={styles.container}>
			<div className={styles.container_body}>
				{enrichment_request_filters.map((item) => {
					// if (enriched && enriched === 'false' && item.name === 'is_verified') {
					// 	return null;
					// }
					const ele = { ...item };
					const { name, displayName, placeholder, type, width, options } = item;
					const Element = getFieldController(type);
					return (
						<div key={name} className={styles.field_container}>
							<span className={styles.label}>{displayName}</span>
							<Element
								{...ele}
								prefix={null}
								placeholder={placeholder}
								options={options}
								isClearable
								style={{ width }}
								control={control}
								key={name}
								size="sm"
							/>
						</div>
					);
				})}
			</div>
			<div className={styles.buttonDiv}>
				<Button onClick={onClickCancel} size="md" themeType="secondary">Cancel</Button>
				<Button
					disabled={loading}
					onClick={handleSubmit(handleClick)}
					size="md"
					themeType="secondary"
				>
					Apply

				</Button>
			</div>
		</div>
	);
}

export default SubFilters;
