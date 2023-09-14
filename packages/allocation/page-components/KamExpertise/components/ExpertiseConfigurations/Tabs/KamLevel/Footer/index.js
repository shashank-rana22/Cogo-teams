import { Button } from '@cogoport/components';
import { IcMArrowNext } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import getControls from '../../../../../configurations/get-add-kam-level-draft-controls';
import useCreateKamLevel from '../../../../../hooks/useCreateKamLevel';
import Card from '../Card';

import styles from './styles.module.css';

const FIRST_INDEX = 1;

const SECOND_INDEX = 2;

function Footer({
	setCreateKam = () => { },
	dataLength = '',
	refetch,
	cardRefetch,
	createKam,
}) {
	const { t } = useTranslation(['allocation']);

	const {
		formProps,
		onCreate,
		createLoading,
	} = useCreateKamLevel({ dataLength, setCreateKam, refetch, cardRefetch, t });

	const controls = getControls({ t });

	const {
		control, formState: { errors }, handleSubmit,
	} = formProps;

	if (!createKam) {
		return (
			<div style={{ marginTop: '10px' }}>
				<Button
					themeType="secondary"
					className={styles.create_button}
					onClick={() => setCreateKam(true)}
				>
					{t('allocation:create_kam_level')}
				</Button>
			</div>
		);
	}

	return (
		<div className={styles.level_card_container}>
			<div className={styles.level_desc}>
				<b>
					{t('allocation:kam')}
					{' '}
					{ dataLength ? dataLength + FIRST_INDEX : FIRST_INDEX}
					<IcMArrowNext className={styles.arrow} />
					{' '}
					{ dataLength ? dataLength + SECOND_INDEX : SECOND_INDEX}
				</b>
			</div>

			<div className={styles.cancel_button}>
				<Button
					disabled={createLoading}
					themeType="secondary"
					onClick={() => setCreateKam(false)}
				>
					{t('allocation:cancel_button')}
				</Button>

				<Button
					loading={createLoading}
					onClick={handleSubmit(onCreate)}
					style={{ marginLeft: 8 }}
				>
					{t('allocation:save_button')}
				</Button>
			</div>

			<Card
				list={controls}
				control={control}
				editMode
				errors={errors}
			/>
		</div>
	);
}

export default Footer;
