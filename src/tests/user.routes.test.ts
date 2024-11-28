import request from "supertest";
import express from "express";
import userRouter from "../routes/user.routes";
import User from "../models/user";

jest.mock("../models/user"); 

const app = express();
app.use(express.json());
app.use(userRouter);

describe("User Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("post route for creating new user", () => {
    it("should create a new user When no user exists with the same username", async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);
      (User.prototype.save as jest.Mock).mockResolvedValue({});

      const response = await request(app).post("/users/createNewUser").send({
        username: "Rekha",
        password: "1234",
        email: "rekha@example.com",
        mobile: "9876543210",
        address: "Rajanna sircilla",
      });

      expect(response.status).toBe(201);
      expect(response.body).toEqual({ message: "new user created succesfully" });
      expect(User.findOne).toHaveBeenCalledWith({ username: "Rekha" });
      expect(User.prototype.save).toHaveBeenCalled();
    });

    it("should return 409 if the username already exists", async () => {
      (User.findOne as jest.Mock).mockResolvedValue({ username: "Rekha" }); 

      const response = await request(app).post("/users/createNewUser").send({
        username: "Rekha",
        password: "1234",
        email: "rekha@example.com",
        mobile: "9876543210",
        address: "Hyd",
      });

      expect(response.status).toBe(409);
      expect(response.body).toEqual({ message: "User already exists" });
      expect(User.findOne).toHaveBeenCalledWith({ username: "Rekha" });
    });

    it("should return 500 for a server error", async () => {
      (User.findOne as jest.Mock).mockRejectedValue(new Error("Error"));

      const response = await request(app).post("/users/createNewUser").send({
        username: "Rekha",
        password: "1234",
        email: "rekha@example.com",
        mobile: "9876543210",
        address: "Hyd",
      });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        message: "Failed to create a new user",
        error: "Error",
      });
      expect(User.findOne).toHaveBeenCalledWith({ username: "Rekha" });
    });
  });

  describe("getCredentials route", () => {
    it("should return the user if credentials are correct", async () => {
      (User.findOne as jest.Mock).mockResolvedValue({
        username: "Rekha",
        password: "1234",
      }); 

      const response = await request(app).post("/users/getCredentials").send({
        username: "Rekha",
        password: "1234",
      });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        username: "Rekha",
        password: "1234",
      });
      expect(User.findOne).toHaveBeenCalledWith({ username: "Rekha" });
    });

    it("should return 404 if the username does not exist", async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null); 

      const response = await request(app).post("/users/getCredentials").send({
        username: "Rekha",
        password: "1234",
      });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        message: "Username not found. Invalid credentials",
      });
      expect(User.findOne).toHaveBeenCalledWith({ username: "Rekha" });
    });

    it("should return 401 if the password is incorrect", async () => {
      (User.findOne as jest.Mock).mockResolvedValue({
        username: "Rekha",
        password: "4567",
      }); 

      const response = await request(app).post("/users/getCredentials").send({
        username: "Rekha",
        password: "1234", 
      });

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ message: "Incorrect password" });
      expect(User.findOne).toHaveBeenCalledWith({ username: "Rekha" });
    });

    it("should return 500 for a server error", async () => {
        (User.findOne as jest.Mock).mockRejectedValue(new Error("Error"));
  
        const response = await request(app).post("/users/getCredentials").send({
          username: "Rekha",
          password: "1234",
          email: "rekha@example.com",
          mobile: "9876543210",
          address: "Hyd",
        });
  
        expect(response.status).toBe(500);
        expect(response.body).toEqual({
          message: "Failed to retrieve credentials",
          error: "Error",
        });
        expect(User.findOne).toHaveBeenCalledWith({ username: "Rekha" });
      });
  });
});
