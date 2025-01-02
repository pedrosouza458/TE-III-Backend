import { CreateUser } from "../../infra/application/use-cases/user/create-user";
import { UserRepository } from "../../infra/repository/user-repository";
import { UserProps } from "../../infra/entities/domain/user";
import { CreateDistributor } from "../../infra/application/use-cases/distributor/create-distributor";
import { DistributorRepository } from "../../infra/repository/distributor-repository";
import {
  DistributorProps,
} from "../../infra/entities/domain/distributor";

describe("Create distributor use-case", () => {
  let createDistributor: CreateDistributor;
  let mockDistributorRepository: DistributorRepository;

  beforeEach(async () => {
    mockDistributorRepository = {
      createDistributor: jest.fn().mockResolvedValue({
        message: "Distributor created",
        statusCode: 200,
      }),
    } as unknown as DistributorRepository;

    createDistributor = new CreateDistributor(mockDistributorRepository);
  });
  it("should create a distributor and return a success message", async () => {
    const distributorProps: Partial<DistributorProps> = {
      name: "Test distributor",
      address: "sample address",
    };

    // Execute the method
    const response = await createDistributor.execute(distributorProps);

    expect(response).toEqual({
      message: "Distributor created",
      statusCode: 200,
    });
  });
});
