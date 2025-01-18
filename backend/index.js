const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const authMiddleware = require('./middlewares/auth');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(authMiddleware);

// GraphQL API
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true
}));

app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}/graphql`);
});
