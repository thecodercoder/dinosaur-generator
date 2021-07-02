if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

/**catch all error handler */
const { errorHandler } = require('./middleware/errorHandler.middleware');
/**dino api routes */
const dinoRouter = require('./api/dino/dino.routes')
app.use('/api/dino', dinoRouter)

// global error handler
app.use(errorHandler);

process
	.on('unhandledRejection', (reason, p) => {
		console.error(reason, 'Unhandled Rejection at Promise', p);
	})
	.on('uncaughtException', (err) => {
		console.error(err, 'Uncaught Exception thrown');
		process.exit(1);
	});

app.listen(PORT, () => {
	console.log(`Example app listening at http://localhost:${PORT}`);
});
