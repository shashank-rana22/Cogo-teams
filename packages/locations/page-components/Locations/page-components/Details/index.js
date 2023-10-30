import { Button } from '@cogoport/components';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { dynamic } from '@cogoport/next';
import { useTranslation } from 'next-i18next';
import { useState, useMemo } from 'react';

import getDetails from '../../constants/details';

import styles from './styles.module.css';

const excludeFromUpdate = ['country', 'continent', 'trade'];

const AddMainPorts = dynamic(() => import('../AddMainPorts'), { ssr: false });

function Details({ activeCard = {}, setSideBar = () => {}, loading = false, apiTrigger = () => {} }) {
	const { t } = useTranslation(['locations']);

	const [showMapping, setShowMapping] = useState(false);

	const details = useMemo(() => getDetails({ t }), [t]);

	return (
		<div style={{ marginTop: 20 }}>
			<div className={styles.btn_align}>
				<Button
					onClick={() => apiTrigger({
						values: {
							status: activeCard?.status === 'active' ? 'Deactivate' : 'Activate',
						},
						id: activeCard?.id,
					})}
					disabled={loading}
				>
					{activeCard?.status === 'active' ? 'Deactivate' : 'Activate'}
				</Button>

				<Button
					onClick={() => setSideBar('update')}
					disabled={excludeFromUpdate.includes(activeCard?.type)}
				>
					Update

				</Button>

				{activeCard?.is_icd ? (
					<Button
						onClick={() => setShowMapping(activeCard)}
						className="small"
						style={{ marginLeft: 16 }}
					>
						Add Main Ports
					</Button>
				) : null}
			</div>

			<div className={styles.details_container}>
				{(details || []).map((item) => {
					if (activeCard[item?.key]) {
						return (
							<div key={item.key} className={styles.active_content}>
								<h4>{item.label}</h4>
								<div className={styles.description}>

									{item?.type === 'date' ? formatDate({
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

			{showMapping ? (
				<AddMainPorts
					show={!!showMapping}
					onClose={() => setShowMapping(null)}
					location={showMapping}
				/>
			) : null}
		</div>
	);
}

export default Details;
