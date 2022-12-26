import usei18n, { getFormattedPrice } from '@cogo/i18n';
import { Container, SubContainer } from './styles';
import React from 'react';
const CustomerInformation = ({ data }) => {
	const { customerDetails } = data || {};

	const { numLocale } = usei18n();

	return (customerDetails || []).map((item) => {
		const {
			id,
			customerName,
			customerOutstandingAmount,
			customerOutstandingAmountOnSid,
		} = item || {};

		return (
			<Container key={id}>
				<SubContainer>
					Name - <span style={{ fontWeight: 600 }}>{customerName}</span>
				</SubContainer>

				<SubContainer>
					Total Outstanding -
					<span style={{ fontWeight: 600 }}>
						{getFormattedPrice(numLocale, customerOutstandingAmount, 'INR')}
					</span>
				</SubContainer>

				<SubContainer>
					On Account Payments -
					<span style={{ fontWeight: 600 }}>
						{getFormattedPrice(
							numLocale,
							customerOutstandingAmountOnSid,
							'INR',
						)}
					</span>
				</SubContainer>
			</Container>
		);
	});
};
export default CustomerInformation;
