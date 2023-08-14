import { Radio, cl, Button } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React, { useState, useRef, useEffect } from 'react';

import { CUSTOM_TYPES } from '../../utils/pageMappings';

import styles from './styles.module.css';

function Accordion({
	header = {},
	keyOptions = [],
	checkRadio = {},
	setCheckRadio = () => {},
	visible = '',
	docItem = {},
}) {
	const [active, setActive] = useState(false);
	const documentOptions = keyOptions.filter(
		(item) => item.customType === CUSTOM_TYPES.DOCUMENT && docItem.key !== item.key,
	);

	const accBody = useRef();

	useEffect(() => {
		if (visible === false) {
			setActive(false);
		}
	}, [visible]);

	return (
		<div className={styles.container}>
			<Button
				className={cl`${styles.accordion_header} ${active ? `${styles.active}` : ''}`}
				onClick={() => setActive(!active)}
			>
				<div className={styles.accordion_title}>{startCase(header)}</div>
				<div className={styles.other}>{active ? '-' : '+'}</div>
			</Button>

			<div
				className={styles.accordion_body}
				ref={accBody}
				style={
					active ? { height: accBody.current.scrollHeight } : { height: '0px' }
				}
			>
				<div className={styles.accordion_inner_body}>
					{documentOptions.map((item) => (
						<Button
							key={item.key}
							className={styles.single_item}
							onClick={() => setCheckRadio(item?.key)}
						>
							<Radio
								defaultChecked={false}
								checked={checkRadio === item.key}
								value={item.key}
								onChange={(e) => {
									e.stopPropagation();
									setCheckRadio(e.target.value);
								}}
							/>
							<div className={styles.single_item_label}>{item?.label}</div>
						</Button>
					))}
				</div>
			</div>
		</div>
	);
}

export default Accordion;
