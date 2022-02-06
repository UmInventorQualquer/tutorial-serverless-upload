import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import {fromIni} from "@aws-sdk/credential-provider-ini";
import {readFileSync,writeFileSync} from 'fs';

const stream2buffer = async (stream) => {
    return new Promise((resolve, reject) => {
        const _buf = [];
        stream.on("data", (chunk) => _buf.push(chunk));
        stream.on("end", () => resolve(Buffer.concat(_buf)));
        stream.on("error", (err) => reject(err));
    });
}

const api = async () => {

    const object = await getConfig('./downloads/object.json');

    // Loading Credentials from ~/.aws/credentials
    const config = {
        region: 'us-east-1',
        credentials: fromIni({profile: 'tutorials3'})
    };

    // Preparing Object conte to submit
    const downloadData = {
        Bucket: process.env.UPLOAD_BUCKET,
        Key: object.objectName
    };

    const s3Client = new S3Client(config);
    const response = await s3Client.send(new GetObjectCommand(downloadData));

    writeFileSync('downloads/' + object.objectName, await stream2buffer(response.Body));

}

const getConfig = async(file) => {
    const content = await readFileSync(file);
    return JSON.parse(content);
}

await api();
