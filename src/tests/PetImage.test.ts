import request from 'supertest';
import express from 'express';
import petImageRouter from '../routes/petImage.routes';
import PetDetails from '../models/userPet';

jest.mock('../models/userPet');

const app = express();
app.use(express.json());
app.use(petImageRouter);

describe('Pet Image Routes', () => {
  describe('put route for adding pet image', () => {
    it('should add an image to a pet and return 201 status', async () => {
      const petdetails = {
        username: 'Rekha',
        petDetails: [
          {
            petName: 'Buddy',
            image: ['image1.jpg'],
          },
        ],
        save: jest.fn().mockResolvedValueOnce(true),
      };
      (PetDetails.findOne as jest.Mock).mockResolvedValueOnce(petdetails);

      const response = await request(app)
        .put('/pets/addPetImage')
        .send({
          username: 'Rekha',
          petname: 'Buddy',
          imageUrl: 'image2.jpg',
        });

      expect(PetDetails.findOne).toHaveBeenCalledWith({ username: 'Rekha' });
      expect(petdetails.petDetails[0].image).toContain('image2.jpg');
      expect(response.status).toBe(201);
      expect(response.body).toMatchObject({
        message: 'Pet image added successfully',
        petImages: ['image1.jpg', 'image2.jpg'],
      });
    });

    it('should return 404 if user is not found', async () => {
      (PetDetails.findOne as jest.Mock).mockResolvedValueOnce(null);

      const response = await request(app)
        .put('/pets/addPetImage')
        .send({
          username: 'Rekha',
          petname: 'Buddy',
          imageUrl: 'newImage.jpg',
        });

      expect(PetDetails.findOne).toHaveBeenCalledWith({ username: 'Rekha' });
      expect(response.status).toBe(404);
      expect(response.body).toMatchObject({ message: 'User not found' });
    });

    it('should return 500 if an error occurs', async () => {
      (PetDetails.findOne as jest.Mock).mockRejectedValueOnce(new Error('Database error'));

      const response = await request(app)
        .put('/pets/addPetImage')
        .send({
          username: 'Rekha',
          petname: 'Buddy',
          imageUrl: 'newImage.jpg',
        });

      expect(response.status).toBe(500);
      expect(response.body).toMatchObject({
        message: 'Failed to add pet image',
        error: expect.anything(),
      });
    });
  });

  describe('route for retrieving pet images', () => {
    it('should retrieve pet images and return 200', async () => {
      const mockPetDetails = {
        username: 'Rekha',
        petDetails: [
          {
            petName: 'Buddy',
            image: ['image1.jpg'],
          },
        ],
      };

      (PetDetails.findOne as jest.Mock).mockResolvedValueOnce(mockPetDetails);

      const response = await request(app)
        .post('/pets/getPetImages')
        .send({
          username: 'Rekha',
          petname: 'Buddy',
        });

      expect(PetDetails.findOne).toHaveBeenCalledWith({ username: 'Rekha' });
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        data: ['image1.jpg'],
      });
    });

    it('should return 404 if user is not found', async () => {
      (PetDetails.findOne as jest.Mock).mockResolvedValueOnce(null);

      const response = await request(app)
        .post('/pets/getPetImages')
        .send({
          username: 'Rekha',
          petname: 'Buddy',
        });

      expect(PetDetails.findOne).toHaveBeenCalledWith({ username: 'Rekha' });
      expect(response.status).toBe(404);
      expect(response.body).toMatchObject({ message: 'User not found' });
    });

    it('should return 500 if an error occurs', async () => {
      (PetDetails.findOne as jest.Mock).mockRejectedValueOnce(new Error('Failed to get details'));

      const response = await request(app)
        .post('/pets/getPetImages')
        .send({
          username: 'Rekha',
          petname: 'Buddy',
        });

      expect(response.status).toBe(500);
      expect(response.body).toMatchObject({
        message: 'Failed to retrieve pet images',
      });
    });
  });
});
