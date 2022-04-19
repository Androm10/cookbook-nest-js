import { Injectable } from '@nestjs/common';
import * as amqplib from 'amqplib';
import { Broker, BrokerOptions } from 'src/interfaces/arguments/broker-options';

@Injectable()
export class RabbitBroker implements Broker {
	private channel: amqplib.Channel;

	constructor(private options: BrokerOptions) {}

	async init() {
		const connection = await amqplib.connect(this.options.url);
		this.channel = await connection.createChannel();
	}

	async sendMessage(queue: string, message: any) {
		await this.channel.assertQueue(queue, {
			durable: this.options.durable ?? false,
		});
		this.channel.sendToQueue(
			queue,
			Buffer.from(JSON.stringify(message)),
			{},
		);
	}
}
