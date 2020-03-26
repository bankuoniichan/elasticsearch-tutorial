const pino = require('pino')();

pino.info(JSON.stringify({
	client: '142.27.6.41',
	question: 'Question A',
	answer: 'answer a',
	fallback: false
}));
/*
pino.info(JSON.stringify({
	client: '142.27.6.44',
	question: 'Question B',
	answer: null,
	fallback: true
}));*/
