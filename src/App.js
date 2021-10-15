import React, { useState } from 'react'
import { Button, Card, CardContent, Typography } from '@material-ui/core'
import getQuotes from './getQuotes'

import './App.css'

function App() {
	const [quote, setQuote] = useState('')
	const [author, setAuthor] = useState('')

	const handleClick = () => {
		getQuotes().then((data) => {
			setQuote(data.content)
			setAuthor(data.author)
		})
	}

	return (
		<div className="App">
			<Typography variant="h2">Random quote generator</Typography>
			<Card className="card">
				<CardContent>
					<Typography variant="h5">{quote}</Typography>
					<Typography className="margin-top" color="textSecondary">{author}</Typography>
					<hr />
					<Button className="margin-top" color="primary" variant="outlined" onClick={() => handleClick()}>Generate quote</Button>
				</CardContent>
			</Card>
		</div>
	);
}

export default App;
