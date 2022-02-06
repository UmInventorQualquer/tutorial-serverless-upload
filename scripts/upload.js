import {readFileSync,writeFileSync} from 'fs';
import axios from 'axios';

const upload = async () => {

    const url = await axios.get(process.env.APIUPLOAD);
    console.log('url: ', url.data);

    // Read image from disk
    const image = readFileSync('./files/natural-wonders-1400924.jpg');

    // Send form data with axios
    try {
        await axios.put(url.data.url, image, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'image/jpeg',
                'Content-Length': image.length
            },
        });
    } catch (e) {
        console.error(e.response);
    }

    writeFileSync('./downloads/object.json', JSON.stringify({objectName:url.data.fileName}, null, 2));

}

await upload();
