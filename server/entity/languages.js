const dbContext = require("../dbcontext");
const Table = require("unloop-database-dynamo")(dbContext.db, dbContext.docClient);

const key = "key";
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
        key: "JAVA",
        name: "Java",
        count: 0
    },
    {
        key: "HTML",
        name: "HTML",
        count: 0
    },
    {
        key: "JAVASCRIPT",
        name: "Javascript",
        count: 0
    }

];

exports.table = new Table(this);
