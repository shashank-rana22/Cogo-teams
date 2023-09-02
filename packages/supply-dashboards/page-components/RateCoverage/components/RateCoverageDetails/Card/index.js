import { Button, Placeholder } from '@cogoport/components';
import { IcMDownload, IcMArrowDown, IcMArrowUp } from '@cogoport/icons-react';

import styles from '../styles.module.css';

const CONSTANT_SIX_HUNDERED = 600;
const CONSTANT_TWELVE = 12;
const CONSTANT_MINUS_ONE = -1;
const CONSTANT_ZERO = 0;
const CONSTANT_FOUR = 4;
const CONSTANT_SIX = 6;

function Card({ value = CONSTANT_ZERO, type, setIndex, index, downloadLink = '', loading = false }) {
	const title = ['Critical Port Pairs', 'Expiring Rates',
		'Spot Searches', 'Monitoring Dashboard', 'Cancelled Shipments'];

	return (
		<div className={styles.card}>
			<div className={styles.title}>
				{title[type]}

				<a
					href={downloadLink}
					download="Example-PDF-document"
					target="_blank"
					rel="noreferrer"
				>
					<IcMDownload />
				</a>

			</div>
			<div style={{ borderBottom: '1px dashed #ABB0DE', marginTop: CONSTANT_SIX }} />
			<div style={{
				display        : 'flex',
				justifyContent : 'space-between',
				alignItems     : 'center',
			}}
			>
				{loading ? <Placeholder height={50} width={60} margin="5px" />
					: <div className={styles.value} style={{ color: '#7278AD' }}>{value}</div>}
				{index !== type ? (
					<Button
						themeType="secondary"
						style={{
							fontWeight : CONSTANT_SIX_HUNDERED,
							fontSize   : CONSTANT_TWELVE,
							color      : '#221F20',
						}}
						onClick={() => { setIndex(type); }}
					>
						View All
						{' '}
						<IcMArrowDown style={{ marginLeft: CONSTANT_FOUR, alignItems: 'center' }} />
					</Button>
				) : (
					<Button
						themeType="secondary"
						className={styles.button}
						style={{
							fontWeight : CONSTANT_SIX_HUNDERED,
							fontSize   : CONSTANT_TWELVE,
							color      : '#221F20',
						}}
						onClick={() => { setIndex(CONSTANT_MINUS_ONE); }}
					>
						Hide All
						{' '}
						<IcMArrowUp style={{ marginLeft: CONSTANT_FOUR, alignItems: 'center' }} />
					</Button>
				)}
			</div>

		</div>
	);
}

export default Card;
