import mongoose from "mongoose";
import connectDB from "../dbConnection";

jest.mock("mongoose"); 

describe("MongoDB connection", () => {
  const connection = mongoose.connect as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should connect to MongoDB successfully", async () => {
    connection.mockResolvedValueOnce({}); 
   await connectDB();
   expect(connection).toHaveBeenCalledWith(process.env.MONGO_URI);
    console.log = jest.fn(); 
  });

  it("throw an error when connection fails", async () => {
    connection.mockRejectedValueOnce(new Error("Connection failed"));
    await expect(connectDB()).rejects.toThrow("Connection failed");

    expect(connection).toHaveBeenCalledWith(process.env.MONGO_URI);
  });
});
