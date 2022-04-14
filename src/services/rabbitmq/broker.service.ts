import { Injectable } from "@nestjs/common";
import * as amqplib from "amqplib";

interface IBrokerOptions {
    url: string,
    durable?: boolean,
}


@Injectable()
export class RabbitBroker {
	private channel: amqplib.Channel;

    constructor(private options: IBrokerOptions) { }

    async init() {
        const connection = await amqplib.connect(this.options.url);
        this.channel = await connection.createChannel();
    }

    async sendMessage(queue: string, message: any) {
        await this.channel.assertQueue(queue, {
            durable : this.options.durable ?? false,
        });
        this.channel.sendToQueue(queue, Buffer.from(message), {});
    }

}
