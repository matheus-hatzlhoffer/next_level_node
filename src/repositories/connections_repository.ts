import { EntityRepository, Repository } from 'typeorm';
import { Connection } from '../entities/connection';

@EntityRepository(Connection)
class ConnectionRepository extends Repository<Connection> {}

export { ConnectionRepository };
