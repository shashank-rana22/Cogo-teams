import { Button } from '@cogoport/components';
import { IcMArrowNext } from '@cogoport/icons-react';

import Controls from '../../../../../configurations/get-add-kam-level-draft-controls';
import useCreateKamLevel from '../../../../../hooks/useCreateKamLevel';
import Card from '../Card';

import styles from './styles.module.css';

function Footer({
	setCreateKam = () => { },
	dataLength = '',
	refetch,
	cardRefetch,
	createKam,
}) {
	const {
		formProps,
		onCreate,
		createLoading,
	} = useCreateKamLevel({ dataLength, setCreateKam, refetch, cardRefetch });

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
					Create Kam Level
				</Button>
			</div>
		);
	}

	return (
		<div className={styles.level_card_container}>
			<div className={styles.level_desc}>
				<b>
					KAM
					{' '}
					{ dataLength ? dataLength + 1 : 1}
					<IcMArrowNext className={styles.arrow} />
					{' '}
					{ dataLength ? dataLength + 2 : 2}
				</b>
			</div>

			<div className={styles.cancel_button}>
				<Button
					disabled={createLoading}
					themeType="secondary"
					onClick={() => setCreateKam(false)}
				>
					Cancel
				</Button>

				<Button
					loading={createLoading}
					onClick={handleSubmit(onCreate)}
					style={{ marginLeft: 8 }}
				>
					Save
				</Button>
			</div>

			<Card
				list={Controls}
				control={control}
				editMode
				errors={errors}
			/>
		</div>
	);
}

export default Footer;
