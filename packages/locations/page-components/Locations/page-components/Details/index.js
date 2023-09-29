import { Button } from '@cogoport/components';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useTranslation } from 'next-i18next';

import getDetails from '../../constants/details';

import styles from './styles.module.css';

const excludeFromUpdate = ['country', 'continent', 'trade'];
function Details({ activeCard = {}, setSideBar = () => {} }) {
	const { t } = useTranslation(['locations']);

	const details = getDetails({ t });

	return (
		<div style={{ marginTop: 20 }}>

			<div className={styles.btn_align}>
				<Button>{activeCard.status === 'active' ? 'Deactivate' : 'Activate'}</Button>
				<Button
					onClick={() => setSideBar('update')}
					disabled={excludeFromUpdate.includes(activeCard?.type)}
				>
					Update

				</Button>
				{activeCard.is_icd ? (
					<Button
							// onClick={() => setShowMapping(activeCard)}
						className="small"
						style={{ marginLeft: 16 }}
					>
						Add Main Ports
					</Button>
				) : null}
			</div>
			{(details || []).map((item) => {
				if (activeCard[item.key]) {
					return (
						<div key={item.key} className={styles.active_content}>
							<h4>{item.label}</h4>
							<div className={styles.description}>

								{item.type === 'date' ? formatDate({
									date   : activeCard[item.key],
									format : 'dd MMM yy | hh:mm a',
								}) : activeCard[item.key]}
							</div>
						</div>
					);
				}
				return null;
			})}
		</div>
	);
}

export default Details;
