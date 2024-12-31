import { v4 as uuid } from 'uuid';  // Import uuid if it's not already
import { User, UserProps } from '../../../entities/domain/user';
import { UserRepository } from '../../../repository/user-repository';
import { Message } from '../../../../responses/response';

export class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute({ name, password, email, role }: UserProps): Promise<Message> {
    const userId = uuid();  // Generate a unique ID for the user

    const user = User.create({
      name,
      password,
      email,
      role,
      approvedInDistributor: false,
      distributorId: null,
      orders: [],
      approvedOrders: [],
    }, userId);  

    const response = await this.userRepository.createAdmin(user);
    return response;
  }
}
