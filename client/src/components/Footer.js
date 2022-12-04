import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import Couche from '../assets/couche.png';
import { Link } from 'react-router-dom';
import Attribution from '../assets/attribution.png';
import CreativeCommon from '../assets/common.png';
import NonCommercial from '../assets/noCommercialUse.png';
import { device } from '../components/MediaQueries';

const Footer = () => {
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');

	const emailValidation = () => {
		const regEx = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
		if (regEx.test(email)) {
			setMessage('Merci =)');
		} else if (!regEx.test(email)) {
			setMessage(
				'Invalide. Les courriels ont le format suivant: usager@domaine.com'
			);
		} else if (email !== '') {
			setMessage(
				'Invalide. Les courriels ont le format suivant: usager@domaine.com'
			);
		} else {
			setMessage('');
		}
	};
	// reload state
	const handleSubmit = (e) => {
		e.preventDefault();

		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email,
			}),
		};

		fetch('/emailListLaunch', requestOptions)
			.then((response) => response.json())
			.then((data) => {
				setEmail('');
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleChange = (e) => {
		setEmail(e.target.value);
	};

	return (
		<>
			<FormWrapper>
				<Form
					onSubmit={(e) => {
						handleSubmit(e);
					}}
				>
					<input
						type='email'
						placeholder='Courriel'
						value={email}
						onChange={(e) => {
							handleChange(e);
						}}
					/>

					<ButtonWrapper>
						<Button type='submit' onClick={emailValidation}>
							REJOIGNEZ
						</Button>
					</ButtonWrapper>
					<Message>{message}</Message>
				</Form>
			</FormWrapper>

			<WrapperBlue>
				<Wrapper>
					<FirstSection>
						<SectionDate>
							<Date>Lancement en juin 2023</Date>
							<Rejoignez>
								Rejoignez la liste de diffusion pour vous tenir au courant du
								programme:
							</Rejoignez>

							<Reussir>
								Réussir le démarrage d'une communauté de pratique
							</Reussir>
						</SectionDate>
					</FirstSection>
					<SecondSection>
						<img src={Couche} alt='' />
					</SecondSection>
				</Wrapper>
			</WrapperBlue>
			<GreenSectionWrapper>
				<GreenSection>
					<LicenseSection>
						<LicenseLogo
							href='https://creativecommons.org/licenses/by-nc/4.0/deed.fr'
							target='_blank'
						>
							<img src={CreativeCommon} alt='cc' />
							<img src={Attribution} alt='attribution' />
							<img src={NonCommercial} alt='nc' />
						</LicenseLogo>

						<p>
							<Bold>license: </Bold>
							<a
								href='https://creativecommons.org/licenses/by-nc/4.0/deed.fr'
								target='_blank'
								rel='noreferrer'
							>
								CC BY-NC 4.0
							</a>
						</p>

						<p>
							<Bold>attribution: </Bold>
							<Link to='/programme'>
								Réussir le démarrage d'une communauté de pratique
							</Link>
						</p>

						<p>
							<Bold>par: </Bold>
							<Link to='/equipe'> l'équipe d'Ailleurs conseil</Link>
						</p>
					</LicenseSection>
				</GreenSection>
			</GreenSectionWrapper>
		</>
	);
};

export default Footer;

/* const FormEmail = styled.div`
	position: absolute;
	bottom: 0;
	left: 200px;
	z-index: 4000;
`; */
const WrapperBlue = styled.div`
	position: relative;
	height: 420px;
	background-color: #4083bb;
	z-index: -1000;
	@media ${device.laptop} {
		height: 440px;
	}
`;

const Wrapper = styled.section`
	position: relative;
	height: 420px;
	background-color: #4083bb;
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;

	img {
		position: absolute;
		z-index: 0;
		bottom: -30px;
		right: 0;
	}

	@media ${device.laptop} {
		max-width: 1100px;
		margin-left: 175px;
	}
`;

const FirstSection = styled.section``;
const SecondSection = styled.section`
	@media ${device.laptop} {
		img {
			width: 600px;
		}
	}
`;

const SectionDate = styled.section`
	color: #fffaea;
	padding-left: 16px;
	padding-right: 16px;
	padding-top: 57.6px;
	padding-bottom: 2em;
	font-weight: 700;
`;

const Date = styled.div`
	font-size: 1.8em;
	z-index: 1000;
	position: absolute;
	top: 73.6px;
	left: 16px;
`;

const Rejoignez = styled.div`
	max-width: 300px;
	margin-top: 1em;
	z-index: 1000;
	position: absolute;
	top: 105.6px;
	left: 16px;

	@media ${device.laptop} {
		top: 125.6px;
		max-width: 400px;
	}
`;

const Reussir = styled.div`
	max-width: 300px;
	margin-top: 1em;
	font-style: italic;
	font-size: 1em;
	z-index: 1000;
	position: absolute;
	top: 177.6px;
	left: 16px;
	color: #fada80;

	@media ${device.laptop} {
		top: 197.6px;
	}
`;

const FormWrapper = styled.div`
	position: relative;
	z-index: 3000;
	bottom: 0;
	@media ${device.laptop} {
		z-index: 3000;
		bottom: -343px;
		left: 193px;
	}
`;

const Form = styled.form`
	display: flex;
	flex-direction: row;
	gap: 1em;

	input {
		width: 250px;
		z-index: 1000;
		border: none;
		outline: none;
		transition: 0.5s;
		padding-left: 1em;
		font-size: 1em;
		&:focus {
			border: 3px solid var(--red);
		}
	}

	@media ${device.laptop} {
		z-index: 3000;
	}
`;

const Button = styled.button`
	border: none;
	background-color: var(--red);
	color: #fffaea;
	border-radius: 1em;
	padding: 0.8em 1.6em 0.8em;
	font-weight: 700;
	font-size: 0.8em;
	z-index: 1000;

	&:hover {
		background-color: var(--green);

		color: ${(props) => (props.disabled ? '#FFFAEA' : '#FFFAEA')};
		background-color: ${(props) =>
			props.disabled ? 'var(--darkgrey)' : 'var(--green);'};
		border-radius: 15px;
		cursor: ${(p) => (p.disabled ? 'not-allowed' : 'pointer')};
	}
`;

const ButtonWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
	gap: 30px;
`;

const Message = styled.div`
	position: absolute;
	width: 400px;
	left: 0px;
	bottom: -70px;
	color: #fffaea;
	font-weight: 700;
`;

const GreenSectionWrapper = styled.div`
	background-color: #53b675;
	@media ${device.laptop} {
	}
`;

const GreenSection = styled.div`
	background-color: #53b675;
	padding-left: 16px;
	padding-right: 16px;
	padding-top: 2em;
	padding-bottom: 2em;
	z-index: 1000;
	position: relative;
	bottom: 0;
	right: 0;
	@media ${device.laptop} {
		max-width: 1024px;
		margin-left: 175px;
	}
`;

const LicenseSection = styled.div`
	font-size: 0.8em;
	img {
		width: 1.8em;
	}
`;

const LicenseLogo = styled.a`
	display: flex;
	flex-direction: row;
	gap: 0.6em;
	margin-bottom: 0.6em;
`;

const Bold = styled.span`
	font-weight: 700;
`;
