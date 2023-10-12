import { Tooltip } from '@cogoport/components';
import { IcMArrowRotateDown, IcMArrowRotateUp, IcMInfo, IcMOverview, IcMProvision } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function Header({
	fields, sort, setSort = () => [], headerStyles, renderHeaderCheckbox = () => '', showHeaderCheckbox = false,
}) {
	const handleOnChangeUp = (item) => {
		const fieldType = item.sorting.name;
		setSort(() => ({
			[fieldType]: sort?.[fieldType] === 'asc' ? 'asc' : 'asc',
		}));
	};
	const handleOnChangeDown = (item) => {
		const fieldType = item.sorting.name;
		setSort(() => ({
			[fieldType]: sort?.[fieldType] === 'desc' ? 'desc' : 'desc',
		}));
	};
	return (
		<header className={styles.header} style={headerStyles}>

			{(fields || []).filter((itm) => !itm?.hideColumn).map((field) => (
				<div
					className={`${styles.col} ${field.className || ''}`}
					style={{
						'--span' : field.span || 1,
						width    : `${((field.span || 1) * (100 / 12))}px`,
					}}
					key={field?.key}
				>
					{(showHeaderCheckbox && field?.func === 'renderCheckbox') ? renderHeaderCheckbox() : null}
					{field.label}
					{field.sorting ? (
						<>
							<div className={styles.center}>
								<IcMArrowRotateUp
									className={
										sort?.[field.sorting.name] === 'asc' && styles.asc
									}
									onClick={() => handleOnChangeUp(field)}
								/>
							</div>
							<div className={styles.centers}>
								<IcMArrowRotateDown
									className={
										sort?.[field.sorting.name] === 'desc' && styles.desc
									}
									onClick={() => handleOnChangeDown(field)}
								/>
							</div>
						</>
					) : null}
					{field.infoIconRequired ? (
						<Tooltip
							placement="top"
							content={(
								<div>
									<div className={styles.div_flex}>
										<IcMProvision
											height={24}
											width={24}
											color="#F68B21"
										/>
										<span className={styles.margin_span}>
											Remarks
										</span>
									</div>
									<div className={styles.div_flex}>
										<IcMOverview width={24} height={24} color="#F68B21" />
										<span className={styles.margin_span}>
											Invoice TimeLine
										</span>
									</div>
								</div>

							)}
						>
							<IcMInfo className={styles.icon_style} />
						</Tooltip>
					)
						: null}
				</div>
			))}
		</header>
	);
}

export default Header;
