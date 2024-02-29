import amqplib from 'amqplib';
import axios from 'axios';

const ex = "upchiapas.as";

async function receiveNotification() {
    try {
        const conn = await amqplib.connect("amqps://qakfowzk:IsMiLJTYKEnM3R-VbC0NNqTHxzkABCCa@shrimp.rmq.cloudamqp.com/qakfowzk");
        const ch = await conn.createChannel();
        await ch.assertExchange(ex, 'direct', { durable: true });
        const q = await ch.assertQueue('', { exclusive: true });
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
        await ch.bindQueue(q.queue, ex, '');
        ch.consume(q.queue, (msg) => {
            if (msg !== null) {
                try {
                    const { id, marca } = JSON.parse(msg.content.toString());

                    const data= axios.post('https://api2-34ql.onrender.com/vehiculo',{id,marca})
                    console.log(" [x] Received ID:", id);
                    console.log(" [x] Received Marca:", marca);
                } catch (error) {
                    console.error("Error parsing JSON:", error);
                }
            }
        }, { noAck: true });
        
    } catch (error) {
        console.error("Error:", error);
    }
}

export { receiveNotification };
