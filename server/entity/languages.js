const dbContext = require("../dbcontext");
const Table = require("unloop-database-dynamo")(dbContext.db, dbContext.docClient);

const key = "name";
exports.key = key;

exports.schema = {
    TableName: "Languages",
    BillingMode: "PROVISIONED",
    KeySchema: [
        { AttributeName: key, KeyType: "HASH" }
    ],
    AttributeDefinitions: [
        { AttributeName: key, AttributeType: "S" }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
    }
};

exports.initialData = [
    {
        name: "Java",
        count: 0
    },
    {
        name: "HTML",
        count: 0
    },
    {
        name: "Javascript",
        count: 0
    }

];

exports.table = new Table(this);
