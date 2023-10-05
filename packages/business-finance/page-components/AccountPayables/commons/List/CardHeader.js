import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';

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
			{showHeaderCheckbox && renderHeaderCheckbox()}
			{fields.map((field) => (
				<div
					className={`${styles.col} ${field.className || ''}`}
					style={{ '--span': field.span || 1 }}
				>
					{field.label}
					{field.sorting && (
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
					)}
				</div>
			))}
		</header>
	);
}

export default Header;
