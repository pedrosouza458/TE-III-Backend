import { AcceptDistributor } from "../../infra/application/use-cases/distributor/accept-distributor";
import { Message } from "../../responses/response";
import { DistributorRepository } from "../../infra/repository/distributor-repository";
import { UserRepository } from "../../infra/repository/user-repository";

describe("AcceptDistributor use-case", () => {
  let acceptDistributor: AcceptDistributor;
  let mockUserRepository: UserRepository;
  let mockDistributorRepository: DistributorRepository;

  beforeEach(() => {
    mockUserRepository = {
      checkAdmin: jest.fn().mockResolvedValue({
        message: "Authorized",
      statusCode: 200,
      }),
    } as unknown as UserRepository;

    mockDistributorRepository = {
      acceptDistributor: jest.fn().mockResolvedValue({
        message: "Distributor accepted",
        statusCode: 200,
      }),
    } as unknown as DistributorRepository;

    acceptDistributor = new AcceptDistributor(mockUserRepository, mockDistributorRepository);
  });

  it("should accept the distributor if the user is an admin", async () => {
    const adminId = "admin-id";
    const distributorId = "distributor-id";

    const response: Message = await acceptDistributor.execute(adminId, distributorId);

    expect(response).toEqual({
      message: "Distributor accepted",
      statusCode: 200,
    });
  });

  // it("should return an error if the user is not an admin", async () => {
  //   const adminId = "non-admin-id";
  //   const distributorId = "distributor-id";
  //   mockUserRepository.checkAdmin.mockResolvedValue({
  //     message: "User is not an admin",
  //     statusCode: 400,
  //   });

  //   const response: Message = await acceptDistributor.execute(adminId, distributorId);

  //   expect(response).toEqual({
  //     message: "User is not an admin",
  //     statusCode: 400,
  //   });
  // });
});
