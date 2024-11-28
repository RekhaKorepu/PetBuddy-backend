import { addPet } from "../Functionalities/RegisterPet"; 
import PetDetails from "../models/userPet";

jest.mock("../models/userPet"); 

describe("addPet functionality", () => {
  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  it("should not add pet if pet already exists", async () => {
    const findOne = jest.spyOn(PetDetails, "findOne").mockResolvedValueOnce({
      username: "Rekha",
      petDetails: [{ petName: "Snoopy" }],
    } as any);

    const result = await addPet("Rekha", { name: "Snoopy" });

    expect(findOne).toHaveBeenCalledWith({
      username: "Rekha",
      "petDetails.petName": "Snoopy",
    });
    expect(result).toBe("Pet is already registered");
  });

  it("should add a new pet to a registered user", async () => {
    const findOne = jest
      .spyOn(PetDetails, "findOne")
      .mockResolvedValueOnce(null) 
      .mockResolvedValueOnce({
        username: "Rekha",
        petDetails: [],
        save: jest.fn(),
      } as any); 

    const petInfo = {
      name: "Buddy",
      image: "buddy.jpg",
      breed: "Golden Retriever",
      contact: "123456789",
      age: 3,
      weight: 20,
      height: 50,
      gender: "Male",
      color: "black",
      remarks: "Gone through vaccination",
    };

    const result = await addPet("Rekha", petInfo);

    expect(findOne).toHaveBeenCalledTimes(2);
    expect(result).toBe("New pet added successfully");
  });

  it("should add a new user with pet details if the user does not exist", async () => {
    const findOne = jest.spyOn(PetDetails, "findOne").mockResolvedValue(null);
    const save = jest.fn();
    jest.spyOn(PetDetails.prototype, "save").mockImplementation(save);

    const petInfo = {
      name: "Buddy",
      image: "buddy.jpg",
      breed: "Golden Retriever",
      contact: "123456789",
      age: 3,
      weight: 20,
      height: 50,
      gender: "Male",
      color: "Golden",
      remarks: "Gone through vaccination",
    };

    const result = await addPet("Isha", petInfo);

    expect(findOne).toHaveBeenCalledWith({
      username: "Isha",
      "petDetails.petName": "Buddy",
    });
    expect(save).toHaveBeenCalled();
    expect(result).toBe("New pet added successfully");
  });

  it("should throw an error in case of any error", async () => {
    jest.spyOn(PetDetails, "findOne").mockRejectedValue(new Error("Error"));
    await expect(addPet("Unknown", {})).rejects.toThrow("Failed to add pet.");
  });
});
