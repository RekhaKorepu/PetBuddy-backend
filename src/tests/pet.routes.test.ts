import request from "supertest";
import express from "express";
import petRouter from "../routes/pet.routes";
import { addPet } from "../Functionalities/RegisterPet";
import PetDetails from "../models/userPet";

jest.mock("../Functionalities/RegisterPet");
jest.mock("../models/userPet");

const app = express();
app.use(express.json());
app.use(petRouter);

describe("Pet Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("post route pets/addNewPet", () => {
    it("should add a new pet successfully", async () => {
      (addPet as jest.Mock).mockResolvedValue("New pet added successfully"); 

      const response = await request(app).post("/pets/addNewPet").send({
        username: "Rekha",
        petInfo: {
          name: "Buddy",
          breed: "Golden Retriever",
          age: 2,
          weight: 20,
          height: 60,
          gender: "Male",
          color: "Golden",
          remarks: "Healthy and energetic",
          contact: "9876543210",
          image: "buddy.jpg",
        },
      });

      expect(response.status).toBe(201);
      expect(response.body).toEqual({ message: "Pet added succesfully" });
      expect(addPet).toHaveBeenCalledWith("Rekha", {
        name: "Buddy",
        breed: "Golden Retriever",
        age: 2,
        weight: 20,
        height: 60,
        gender: "Male",
        color: "Golden",
        remarks: "Healthy and energetic",
        contact: "9876543210",
        image: "buddy.jpg",
      });
    });

    it("should return 409 if the pet is already registered", async () => {
      (addPet as jest.Mock).mockResolvedValue("Pet is already registered"); 

      const response = await request(app).post("/pets/addNewPet").send({
        username: "Rekha",
        petInfo: {
          name: "Buddy",
          breed: "Golden Retriever",
          age: 2,
          weight: 20,
          height: 60,
          gender: "Male",
          color: "Golden",
          remarks: "Healthy and energetic",
          contact: "9876543210",
          image: "buddy.jpg",
        },
      });

      expect(response.status).toBe(409);
      expect(response.body).toEqual({ message: "Pet is already registered" });
      expect(addPet).toHaveBeenCalledWith("Rekha", expect.any(Object));
    });

    it("should return 500 for server errors", async () => {
      (addPet as jest.Mock).mockRejectedValue(new Error("Failed to add pet")); 

      const response = await request(app).post("/pets/addNewPet").send({
        username: "Rekha",
        petInfo: {
          name: "Buddy",
          breed: "Golden Retriever",
          age: 2,
          weight: 20,
          height: 60,
          gender: "Male",
          color: "Golden",
          remarks: "Healthy and energetic",
          contact: "9876543210",
          image: "buddy.jpg",
        },
      });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: "Error while adding a new pet" });
      expect(addPet).toHaveBeenCalledWith("Rekha", expect.any(Object));
    });
  });

  describe("post route /pets/getPetDetails", () => {
    it("should retrieve pet details successfully", async () => {
      const pets = [
        {
          image: ["buddy.jpg"],
          petName: "Buddy",
          breed: "Golden Retriever",
          emergencyContact: "9876543210",
          age: 2,
          weight: 20,
          height: 60,
          gender: "Male",
          color: "Golden",
          remarks: "Healthy and energetic",
        },
      ];
      (PetDetails.findOne as jest.Mock).mockResolvedValue({ petDetails: pets }); 

      const response = await request(app).post("/pets/getPetDetails").send({
        username: "Rekha",
      });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        data: pets,
        message: "pets data retrieved successfully",
      });
      expect(PetDetails.findOne).toHaveBeenCalledWith({ username: "Rekha" });
    });

    it("should return 500 for server errors", async () => {
      (PetDetails.findOne as jest.Mock).mockRejectedValue(new Error("Failed to get pet details")); 

      const response = await request(app).post("/pets/getPetDetails").send({
        username: "Rekha",
      });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: "Error while retrieving the pet details" });
      expect(PetDetails.findOne).toHaveBeenCalledWith({ username: "Rekha" });
    });
  });
});
