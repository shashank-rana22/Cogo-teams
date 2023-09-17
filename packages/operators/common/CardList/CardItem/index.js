import { cl } from '@cogoport/components';
import { useState, useEffect } from 'react';

import CONSTANTS from '../../../constants/constants';

import getValue from './getValue';
import styles from './styles.module.css';

function CardItem({
	fields = [],
	singleitem = {},
	functions = {},
}) {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < CONSTANTS.MOBILE_SCREEN_SIZE) {
				setIsMobile(true);
			} else {
				setIsMobile(false);
			}
		};

		handleResize();
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<section className={styles.list_container}>
			<div
				className={cl`${styles.row} ${
					isMobile ? styles.is_mobile : ''
				}`}
			>
				{(fields || []).map((field) => {
					const itemStyle = field?.styles || {};
					return (
						<div
							className={cl`${styles.col} ${field?.className} ${
								isMobile ? styles.is_mobile : ''
							}`}
							style={{
								'--span': (field?.span || CONSTANTS.DEFAULT_SPAN),
								...itemStyle,
							}}
							key={field?.key}
						>
							{isMobile && (
								<div className={styles.table_label}>{field?.label}</div>
							)}

							<div className={styles.flex}>
								{getValue(
									singleitem,
									field,
									functions,
									'-',
								)}
							</div>

						</div>
					);
				})}
			</div>
		</section>
	);
}

export default CardItem;
