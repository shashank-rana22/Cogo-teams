import { Button } from '@cogoport/components';
import { format } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import getDetails from '../../constants/details';

import styles from './styles.module.css';

const excludeFromUpdate = ['country', 'continent', 'trade'];
function Details({ activeCard = {}, setSideBar = () => {} }) {
	const { t } = useTranslation(['locations']);

	const formatDate = (date) => format(date, 'dd MMM yy | hh:mm a');

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
								{item.type === 'date' ? formatDate(activeCard[item.key]) : activeCard[item.key]}
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
