const pino = require('pino')();

const clients = ["142.27.6.41","142.27.6.44","142.52.14.3","142.52.19.34","25.103.90.4"];

clients.forEach((client,index) => {
	pino.info(JSON.stringify({
		client: client,
		question: `Question ${index%2?'B':'A'}`,
		answer: index%2?null:'Answer A',
		fallback: index%2>0
	}))
})
