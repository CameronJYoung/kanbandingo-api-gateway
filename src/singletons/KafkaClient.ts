import { KafkaClientFactory } from '@cameronjyoung/microservice-util-library';

const KafkaClient = KafkaClientFactory.getKafkaClient('api-gateway', [process.env.KAFKA_BROKER as string], 'kanbandingo-app');

export default KafkaClient;