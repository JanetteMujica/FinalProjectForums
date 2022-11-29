import React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CircularProgress } from '@mui/material';

const CreateTheme = () => {
	/* const [reloadState, setReloadState] = useState(false); */
	const [startNewThemeState, setStartNewTheme] = useState('');
	const [disableButton, setDisableButton] = useState(true);
	const [colorStyling, setColorStyling] = useState('grey');

	useEffect(() => {
		console.log(disableButton);
	}, [disableButton]);

	/*   useEffect(() => {
    fetch("/api/me/home-feed")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTweetsById(data);
      })
      .catch((err) => {
        console.log("err", err);
        setError(true);
      });
  }, [reloadState]); */

	const handleSubmit = (e) => {
		e.preventDefault();

		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ status: startNewThemeState }),
		};
		fetch('/newtheme/', requestOptions)
			.then((response) => response.json())
			.then((data) => {
				/* setReloadState(!reloadState); */
				setStartNewTheme('');
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleChange = (e) => {
		setStartNewTheme(e.target.value);
		const textLengthremainder = 280 - e.target.value.length;

		if (textLengthremainder <= 0) {
			setColorStyling('red');
			setDisableButton(true);
		} else if (textLengthremainder <= 55) {
			setColorStyling('yellow');
			setDisableButton(false);
		} else {
			setColorStyling('grey');
			setDisableButton(false);
		}
	};

	return (
		<Form
			onSubmit={(e) => {
				handleSubmit(e);
			}}
		>
			<textarea
				placeholder='Créez une nouvelle conversation. Posez une question.'
				value={startNewThemeState}
				onChange={(e) => {
					handleChange(e);
				}}
			></textarea>

			<ButtonWrapper>
				<TextLimit style={{ color: colorStyling }}>
					{280 - startNewThemeState.length}
				</TextLimit>

				<Button type='submit' disabled={disableButton}>
					CRÉER
				</Button>
			</ButtonWrapper>
		</Form>
	);
};

export default CreateTheme;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
	border-radius: 15px;
	padding: 1em;
	width: 344px;
	margin-bottom: 60px;

	textarea {
		margin-bottom: 30px;
		height: 100px;
	}
`;

const Button = styled.button`
	width: 100px;
	border: none;
	background-color: var(--red);
	color: #fffaea;
	border-radius: 15px;
	padding-top: 10px;
	padding-bottom: 10px;
	font-weight: bolder;
	font-size: 0.8em;

	&:hover {
		color: ${(props) => (props.disabled ? 'white' : '#4C00FF')};
		background-color: ${(props) =>
			props.disabled ? 'var(--darkgrey)' : 'var(--red)'};
		border-radius: 15px;
		cursor: ${(p) => (p.disabled ? 'not-allowed' : 'pointer')};
	}

	button:disabled {
		background-color: grey;
		cursor: no-drop;
	}
`;

const ButtonWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
	gap: 30px;
`;

const TextLimit = styled.p``;
