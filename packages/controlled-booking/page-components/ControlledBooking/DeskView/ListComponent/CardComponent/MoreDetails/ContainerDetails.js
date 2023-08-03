import { Tooltip } from '@cogoport/components';
import { IcMDownload } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import docDownloader from '../../../../../../utils/docDownloader';

import styles from './styles.module.css';

function ContainerDetails({ details, index }) {
	return (
		<div className={styles.card_container}>

			<div className={styles.index}>
				{index + 1}
			</div>

			<div className={styles.container_div}>
				Container
				<div style={{ display: 'flex' }}>
					<div className={styles.text}>
						{details?.container_size}
						Ft,
						<div style={{ marginLeft: 4 }}>
							{details?.containers_count}
							{' '}
							Ctr
						</div>
					</div>

					<div className={styles.text}>
						{startCase(details?.container_type)}
						:

						<div style={{ marginLeft: 4 }}>
							{startCase(details?.commodity)}
							{' '}

						</div>
					</div>
					<div className={styles.text}>
						{details?.cargo_weight_per_container}
						Mt
					</div>
				</div>
			</div>
			{details?.container_type === 'refer' ? (
				<div className={styles.commodity}>
					Commodity
					<div style={{ display: 'flex' }}>
						<div className={styles.commodity_text}>
							HS Code:
							<div style={{ marginLeft: 4 }}>
								{details?.hs_code?.hsCode}
								{' '}
							</div>
						</div>

						<div className={styles.commodity_text}>

							<Tooltip content={details?.hs_code?.description}>
								<div className={styles.hs_code_text}>
									{details?.hs_code?.description}
								</div>
							</Tooltip>

						</div>

						{details?.cargo_value ? (
							<div className={styles.commodity_text}>
								Cargo Value:
								{' '}
								<div style={{ fontSize: 14 }}>
									{details?.cargo_value}
									{' '}
									{details?.cargo_value_currency}
								</div>
							</div>
						) : null}

						{details?.commercial_invoice_url ? (
							<div className={styles.commodity_text}>
								<div
									role="presentation"
									style={{
										textDecoration : 'underline',
										cursor         : 'pointer',
										display        : 'flex',
										alignItems     : 'center',

									}}
									onClick={() => docDownloader(details?.commercial_invoice_url)}
								>
									<IcMDownload style={{ marginRight: 4 }} />
									Commercial Invoice
								</div>
							</div>
						) : null}
					</div>

				</div>
			) : null}

		</div>
	);
}

export default ContainerDetails;
